const pool = require("../../config/database"); // Đảm bảo `connection` được import từ tệp kết nối cơ sở dữ liệu của bạn

// 1. Lấy danh sách bình luận
const getProductReviews = async (req, res) => {
  const { id } = req.params; // Lấy ID_SAN_PHAM từ URL
  console.log("id", id);

  try {
    // Truy vấn tất cả đánh giá, bình luận và thông tin người dùng theo ID_SAN_PHAM
    const [results] = await pool.execute(
      `SELECT 
        NGUOI_DUNG.HO_TEN, 
        NGUOI_DUNG.EMAIL, 
        NGUOI_DUNG.AVATAR,
        NGUOI_DUNG.VAI_TRO,
        DON_HANG.NGAY_CAP_NHAT_DONHANG,  
        CHI_TIET_HOA_DON.DANH_GIA, 
        CHI_TIET_HOA_DON.BINH_LUAN
       FROM CHI_TIET_HOA_DON
       JOIN DON_HANG ON CHI_TIET_HOA_DON.ID_DON_HANG = DON_HANG.ID_DON_HANG
       JOIN NGUOI_DUNG ON DON_HANG.ID_NGUOI_DUNG = NGUOI_DUNG.ID_NGUOI_DUNG
       WHERE CHI_TIET_HOA_DON.ID_SAN_PHAM = ? 
       AND (CHI_TIET_HOA_DON.DANH_GIA IS NOT NULL OR CHI_TIET_HOA_DON.BINH_LUAN IS NOT NULL)`,
      [id]
    );

    if (results.length === 0) {
      return res.status(200).json({
        EM: "Không tìm thấy đánh giá hoặc bình luận cho sản phẩm này",
        EC: 1,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Lấy đánh giá và bình luận thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error fetching reviews and comments:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống khi lấy đánh giá và bình luận",
      EC: -1,
    });
  }
};

module.exports = {
  getProductReviews,
};
