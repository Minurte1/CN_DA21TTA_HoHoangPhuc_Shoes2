from flask import Flask, request, jsonify
import pandas as pd
import mysql.connector
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
import json
from pyvi import ViTokenizer

app = Flask(__name__)
CORS(app)

# Kết nối cơ sở dữ liệu
def connect_database():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="123456",
        database="PhucShoe2",
        port=3308,
        charset='utf8mb4'
    )
    return db

# Lấy dữ liệu chi tiết của sản phẩm từ ID_SAN_PHAM
def fetch_product_details(db, product_id):
    query = """
    SELECT 
        sp.ID_SAN_PHAM, sp.ID_THUONG_HIEU, sp.ID_DANH_MUC, sp.GIOI_TINH_ID, sp.CHAT_LIEU_ID_, 
        sp.TEN_SAN_PHAM,  sp.MO_TA_SAN_PHAM, sp.HINH_ANH_SANPHAM, sp.TRANG_THAI_SANPHAM, 
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, sp.SO_LUONG_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC,
        cl.TEN_CHAT_LIEU_,
        th.TEN_THUONG_HIEU
    FROM SAN_PHAM sp
    LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
    LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
    LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
    LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
    WHERE sp.ID_SAN_PHAM = %s
    """
    cursor = db.cursor()
    cursor.execute(query, (product_id,))
    result = cursor.fetchone()
    if result:
        # Kiểm tra số lượng cột trong result và sửa lại danh sách cột cho phù hợp
        columns = [
            "ID_SAN_PHAM",  "ID_THUONG_HIEU", "ID_DANH_MUC", "GIOI_TINH_ID", 
            "CHAT_LIEU_ID_", "TEN_SAN_PHAM",  "MO_TA_SAN_PHAM", "HINH_ANH_SANPHAM", 
            "TRANG_THAI_SANPHAM", "NGAY_TAO_SANPHAM", "NGAY_CAP_NHAT_SANPHAM", "SO_LUONG_SANPHAM",
            "TEN_GIOI_TINH", "TEN_DANH_MUC", "TEN_CHAT_LIEU_", "TEN_THUONG_HIEU"
        ]
        # Đảm bảo rằng số cột trong result phù hợp với số cột trong 'columns'
        if len(result) == len(columns):
            return pd.DataFrame([result], columns=columns)
        else:
            return pd.DataFrame()  # Trả về DataFrame rỗng nếu số cột không khớp
    return pd.DataFrame()

# Lấy tất cả sản phẩm để xây dựng ma trận similarity
def fetch_all_products(db):
    query = """
    SELECT 
        sp.ID_SAN_PHAM,  sp.TEN_SAN_PHAM, sp.MO_TA_SAN_PHAM, 
        dm.TEN_DANH_MUC, cl.TEN_CHAT_LIEU_, th.TEN_THUONG_HIEU, gt.TEN_GIOI_TINH
    FROM SAN_PHAM sp
    LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
    LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
    LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
    LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
    """
    cursor = db.cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    # Kiểm tra số lượng cột trong dữ liệu trả về và sửa lại danh sách cột cho phù hợp
    columns = ["ID_SAN_PHAM", "TEN_SAN_PHAM", "MO_TA_SAN_PHAM", "TEN_DANH_MUC", "TEN_CHAT_LIEU_", "TEN_THUONG_HIEU", "TEN_GIOI_TINH"]
    
    if len(results[0]) == len(columns):
        return pd.DataFrame(results, columns=columns)
    else:
        return pd.DataFrame()  # Trả về DataFrame rỗng nếu số cột không khớp

# Xây dựng ma trận similarity dựa trên TF-IDF
def build_similarity_matrix(products):
 
  
 # Kết hợp tất cả thuộc tính liên quan
    products['combined_features'] = (
        products['TEN_SAN_PHAM'].fillna("") + " " +
        products['MO_TA_SAN_PHAM'].fillna("") + " " +
        products['TEN_DANH_MUC'].fillna("") + " " +
        products['TEN_CHAT_LIEU_'].fillna("") + " " +
        products['TEN_THUONG_HIEU'].fillna("") + " " +
        products['TEN_GIOI_TINH'].fillna("")
       
)


    
    # Tạo ma trận TF-IDF
    tfidf = TfidfVectorizer(stop_words=None)
    tfidf_matrix = tfidf.fit_transform(products['combined_features'])
    
    # Tính độ tương đồng cosine
    return cosine_similarity(tfidf_matrix, tfidf_matrix)

# Gợi ý sản phẩm dựa trên ID_SAN_PHAM
def recommend_products(product_id, products, similarity_matrix, top_n=10):
    # Lấy chỉ mục của sản phẩm đầu vào
    # Ép kiểu product_id từ frontend (string) thành int
    product_id = int(product_id)

    # Ép kiểu cột ID_SAN_PHAM trong DataFrame về int nếu cần thiết
    products['ID_SAN_PHAM'] = products['ID_SAN_PHAM'].astype(int)

    # Tìm chỉ mục của sản phẩm theo ID_SAN_PHAM
    idx = products[products['ID_SAN_PHAM'] == product_id].index.tolist()
    
    # Kiểm tra nếu không tìm thấy sản phẩm với ID_SAN_PHAM
    if not idx:
        return {"error": "Không tìm thấy sản phẩm với ID_SAN_PHAM đã cung cấp."}

    idx = idx[0]
    
    # Tính độ tương đồng và sắp xếp
    sim_scores = list(enumerate(similarity_matrix[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Lấy chỉ số của sản phẩm gợi ý (bỏ sản phẩm gốc)
    recommended_indices = [i[0] for i in sim_scores[1:top_n+1]]
    
    # Trả về danh sách sản phẩm gợi ý
    recommended_product_ids = products.iloc[recommended_indices]['ID_SAN_PHAM'].tolist()
    
    return recommended_product_ids
def fetch_products_by_ids(db, product_ids):
    query = """
    SELECT 
        sp.ID_SAN_PHAM, sp.ID_THUONG_HIEU,sp.GIA, sp.ID_DANH_MUC, sp.GIOI_TINH_ID, sp.CHAT_LIEU_ID_, 
        sp.TEN_SAN_PHAM,  sp.MO_TA_SAN_PHAM, sp.HINH_ANH_SANPHAM, sp.TRANG_THAI_SANPHAM, 
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, sp.SO_LUONG_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC,
        cl.TEN_CHAT_LIEU_,
        th.TEN_THUONG_HIEU
    FROM SAN_PHAM sp
    LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
    LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
    LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
    LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
    WHERE sp.ID_SAN_PHAM IN (%s)
    """
    # Chuyển danh sách ID_SAN_PHAM thành chuỗi các ID để chèn vào query
    format_strings = ','.join(['%s'] * len(product_ids))
    query = query % format_strings
    
    cursor = db.cursor()
    cursor.execute(query, tuple(product_ids))
    results = cursor.fetchall()

    # Kiểm tra số lượng cột trong dữ liệu trả về và sửa lại danh sách cột cho phù hợp
    columns = ["ID_SAN_PHAM",  "ID_THUONG_HIEU","GIA", "ID_DANH_MUC", "GIOI_TINH_ID", 
               "CHAT_LIEU_ID_", "TEN_SAN_PHAM",  "MO_TA_SAN_PHAM", "HINH_ANH_SANPHAM", 
               "TRANG_THAI_SANPHAM", "NGAY_TAO_SANPHAM", "NGAY_CAP_NHAT_SANPHAM", "SO_LUONG_SANPHAM",
               "TEN_GIOI_TINH", "TEN_DANH_MUC", "TEN_CHAT_LIEU_", "TEN_THUONG_HIEU"]

    return pd.DataFrame(results, columns=columns)

# Endpoint API để gợi ý sản phẩm
@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        if not data or 'product_id' not in data:
            return jsonify({"error": "Thiếu trường 'product_id'"}), 400
        
        product_id = data['product_id']
        db = connect_database()
        
        # Lấy tất cả dữ liệu của sản phẩm product_id
        product_details = fetch_product_details(db, product_id)
        if product_details.empty:
            return jsonify({"error": "Không tìm thấy sản phẩm với ID_SAN_PHAM đã cung cấp."}), 404
       
        # Lấy dữ liệu của tất cả sản phẩm
        all_products = fetch_all_products(db)
    
        # Xây dựng ma trận similarity
        similarity_matrix = build_similarity_matrix(all_products)
        
        # Lấy gợi ý sản phẩm
        recommended_product_ids = recommend_products(product_id, all_products, similarity_matrix, top_n=10)
        
        # Lấy thông tin chi tiết của các sản phẩm gợi ý
        recommended_product_details = fetch_products_by_ids(db, recommended_product_ids)
        
        return jsonify({
            "input_product": product_details.to_dict(orient="records"),
            "recommendations": recommended_product_details.to_dict(orient="records")
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
