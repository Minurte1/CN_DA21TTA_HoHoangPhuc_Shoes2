// Import connection đến cơ sở dữ liệu
const connection = require("../../config/database");

// Thống kê số lượng sản phẩm theo danh mục
const getProductStatisticsByCategory = async (req, res) => {
  try {
    const query = `
      SELECT 
        ldm.TEN_DANH_MUC AS categoryName,
        COUNT(sp.ID_SAN_PHAM) AS productCount
      FROM 
        LOAI_DANH_MUC ldm
      LEFT JOIN 
        SAN_PHAM sp 
      ON 
        ldm.ID_DANH_MUC = sp.ID_DANH_MUC
      GROUP BY 
        ldm.ID_DANH_MUC, ldm.TEN_DANH_MUC
    `;

    // Thực hiện truy vấn
    const [results] = await connection.execute(query);

    // Trả về kết quả
    return res.status(200).json({
      EM: "Thống kê sản phẩm theo danh mục thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting product statistics:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

// 2. Thống kê doanh thu theo từng tháng
const getRevenueByMonth = async (req, res) => {
  try {
    const query = `
        SELECT 
          DATE_FORMAT(dh.NGAY_TAO_DONHANG, '%Y-%m') AS monthYear,
          SUM(dh.TONG_TIEN) AS totalRevenue
        FROM 
          DON_HANG dh
        WHERE 
          dh.TRANG_THAI_DON_HANG = 'Giao dịch thành công' -- Chỉ tính các đơn hàng đã hoàn thành
        GROUP BY 
          DATE_FORMAT(dh.NGAY_TAO_DONHANG, '%Y-%m')
        ORDER BY 
          monthYear ASC;
      `;

    // Thực hiện truy vấn
    const [results] = await connection.execute(query);

    // Trả về kết quả
    return res.status(200).json({
      EM: "Thống kê doanh thu theo tháng thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting revenue by month:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê doanh thu",
      EC: 0,
      DT: [],
    });
  }
};

//2. Thống kê doanh thu theo từng ngày
const getRevenueByDay = async (req, res) => {
  try {
    const query = `
        SELECT 
          DATE(dh.NGAY_TAO_DONHANG) AS date,
          SUM(dh.TONG_TIEN) AS totalRevenue
        FROM 
          DON_HANG dh
        WHERE 
          dh.TRANG_THAI_DON_HANG = 'Giao dịch thành công'
        GROUP BY 
          DATE(dh.NGAY_TAO_DONHANG)
        ORDER BY 
          date ASC;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê doanh thu theo ngày thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting revenue by day:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê doanh thu",
      EC: 0,
      DT: [],
    });
  }
};

//2. Thống kê doanh thu theo từng năm
const getRevenueByYear = async (req, res) => {
  try {
    const query = `
        SELECT 
          YEAR(dh.NGAY_TAO_DONHANG) AS year,
          SUM(dh.TONG_TIEN) AS totalRevenue
        FROM 
          DON_HANG dh
        WHERE 
          dh.TRANG_THAI_DON_HANG = 'Giao dịch thành công'
        GROUP BY 
          YEAR(dh.NGAY_TAO_DONHANG)
        ORDER BY 
          year ASC;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê doanh thu theo năm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting revenue by year:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê doanh thu",
      EC: 0,
      DT: [],
    });
  }
};

//3. Thống kê sản phẩm yêu thích nhất
const getMostLikedProducts = async (req, res) => {
  try {
    const query = `
        SELECT 
          sp.TEN_SAN_PHAM AS productName,
          COUNT(yt.ID_YEU_THICH) AS likeCount
        FROM 
          YEU_THICH yt
        JOIN 
          SAN_PHAM sp ON yt.ID_SAN_PHAM = sp.ID_SAN_PHAM
        GROUP BY 
          sp.TEN_SAN_PHAM
        ORDER BY 
          likeCount DESC
        LIMIT 10;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê sản phẩm yêu thích nhất thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting most liked products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê sản phẩm yêu thích",
      EC: 0,
      DT: [],
    });
  }
};

//4. Thống kê số lượng sản phẩm theo thương hiệu
const getProductsByBrand = async (req, res) => {
  try {
    const query = `
        SELECT 
          th.TEN_THUONG_HIEU AS brandName,
          COUNT(sp.ID_SAN_PHAM) AS productCount
        FROM 
          SAN_PHAM sp
        JOIN 
          THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
        GROUP BY 
          th.TEN_THUONG_HIEU
        ORDER BY 
          productCount DESC;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê số lượng sản phẩm theo thương hiệu thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting products by brand:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê sản phẩm theo thương hiệu",
      EC: 0,
      DT: [],
    });
  }
};

//5. Thống kê số lượng đơn hàng theo trạng thái
const getOrdersByStatus = async (req, res) => {
  try {
    const query = `
        SELECT 
          TRANG_THAI_DON_HANG AS orderStatus,
          COUNT(ID_ODER) AS orderCount
        FROM 
          DON_HANG
        GROUP BY 
          TRANG_THAI_DON_HANG
        ORDER BY 
          orderCount DESC;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê số lượng đơn hàng theo trạng thái thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting orders by status:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê đơn hàng theo trạng thái",
      EC: 0,
      DT: [],
    });
  }
};
//6. Thống kê doanh thu theo phương thức thanh toán
const getRevenueByPaymentMethod = async (req, res) => {
  try {
    const query = `
        SELECT 
          tt.PHUONG_THUC_THANH_TOAN AS paymentMethod,
          SUM(dh.TONG_TIEN) AS totalRevenue
        FROM 
          DON_HANG dh
        JOIN 
          THANH_TOAN tt ON dh.ID_THANH_TOAN = tt.ID_THANH_TOAN
        GROUP BY 
          tt.PHUONG_THUC_THANH_TOAN
        ORDER BY 
          totalRevenue DESC;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê doanh thu theo phương thức thanh toán thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting revenue by payment method:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê doanh thu",
      EC: 0,
      DT: [],
    });
  }
};

//7. Thống kê người dùng theo vai trò
const getUsersByRole = async (req, res) => {
  try {
    const query = `
        SELECT 
          VAI_TRO AS role,
          COUNT(ID_NGUOI_DUNG) AS userCount
        FROM 
          NGUOI_DUNG
        GROUP BY 
          VAI_TRO
        ORDER BY 
          userCount DESC;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê người dùng theo vai trò thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting users by role:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê người dùng",
      EC: 0,
      DT: [],
    });
  }
};
// 8. Thống kê sản phẩm theo màu sắc
const getProductsByColor = async (req, res) => {
  try {
    const query = `
        SELECT 
          ms.TEN_MAU_SAC AS colorName,
          COUNT(sp.ID_SAN_PHAM) AS productCount
        FROM 
          SAN_PHAM sp
        JOIN 
          MAU_SAC_SAN_PHAM mssp ON sp.ID_SAN_PHAM = mssp.ID_SAN_PHAM
        JOIN 
          MAU_SAC ms ON mssp.ID_MAU_SAC = ms.ID_MAU_SAC
        GROUP BY 
          ms.TEN_MAU_SAC
        ORDER BY 
          productCount DESC;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê sản phẩm theo màu sắc thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting products by color:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê sản phẩm theo màu sắc",
      EC: 0,
      DT: [],
    });
  }
};

// 9. Thống kê sản phẩm theo chất liệu
const getProductsByMaterial = async (req, res) => {
  try {
    const query = `
        SELECT 
          cl.TEN_CHAT_LIEU AS materialName,
          COUNT(sp.ID_SAN_PHAM) AS productCount
        FROM 
          SAN_PHAM sp
        JOIN 
          CHAT_LIEU cl ON sp.ID_CHAT_LIEU = cl.ID_CHAT_LIEU
        GROUP BY 
          cl.TEN_CHAT_LIEU
        ORDER BY 
          productCount DESC;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê sản phẩm theo chất liệu thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting products by material:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê sản phẩm theo chất liệu",
      EC: 0,
      DT: [],
    });
  }
};

const getProductsBySize = async (req, res) => {
  try {
    const query = `
        SELECT 
          kc.KICH_CO AS size,
          COUNT(sp.ID_SAN_PHAM) AS productCount
        FROM 
          SAN_PHAM sp
        JOIN 
          CO_KICH_CO ckc ON sp.ID_SAN_PHAM = ckc.ID_SAN_PHAM
        JOIN 
          KICH_CO kc ON ckc.ID_KICH_CO = kc.ID_KICH_CO
        GROUP BY 
          kc.KICH_CO
        ORDER BY 
          productCount DESC;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê sản phẩm theo kích cỡ thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting products by size:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê sản phẩm theo kích cỡ",
      EC: 0,
      DT: [],
    });
  }
};
const getMessagesByDate = async (req, res) => {
  try {
    const query = `
        SELECT 
          DATE(NGAY_TAO_TIN_NHAN) AS date,
          COUNT(ID_TIN_NHAN) AS messageCount
        FROM 
          TIN_NHAN
        GROUP BY 
          DATE(NGAY_TAO_TIN_NHAN)
        ORDER BY 
          date ASC;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê lượng tin nhắn theo ngày thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting messages by date:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê tin nhắn",
      EC: 0,
      DT: [],
    });
  }
};
const getProductsByStyle = async (req, res) => {
  try {
    const query = `
        SELECT 
          pc.TEN_PHONG_CACH AS styleName,
          COUNT(sp.ID_SAN_PHAM) AS productCount
        FROM 
          SAN_PHAM sp
        JOIN 
          PHONG_CACH_SAN_PHAM pcsp ON sp.ID_SAN_PHAM = pcsp.ID_SAN_PHAM
        JOIN 
          PHONG_CACH pc ON pcsp.ID_PHONG_CACH = pc.ID_PHONG_CACH
        GROUP BY 
          pc.TEN_PHONG_CACH
        ORDER BY 
          productCount DESC;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê sản phẩm theo phong cách thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting products by style:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê sản phẩm theo phong cách",
      EC: 0,
      DT: [],
    });
  }
};
const getProductsByUsagePurpose = async (req, res) => {
  try {
    const query = `
        SELECT 
          md.TEN_MUC_DICH_SU_DUNG AS purposeName,
          COUNT(sp.ID_SAN_PHAM) AS productCount
        FROM 
          SAN_PHAM sp
        JOIN 
          MUC_DICH_SU_DUNG_SAN_PHAM mdsp ON sp.ID_SAN_PHAM = mdsp.ID_SAN_PHAM
        JOIN 
          MUC_DICH_SU_DUNG md ON mdsp.ID_MUC_DICH_SU_DUNG = md.ID_MUC_DICH_SU_DUNG
        GROUP BY 
          md.TEN_MUC_DICH_SU_DUNG
        ORDER BY 
          productCount DESC;
      `;

    const [results] = await connection.execute(query);

    return res.status(200).json({
      EM: "Thống kê mục đích sử dụng sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting products by usage purpose:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thống kê mục đích sử dụng sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getProductStatisticsByCategory,
  getRevenueByMonth,
  getRevenueByDay,
  getRevenueByYear,
  getMostLikedProducts,
  getProductsByBrand,
  getOrdersByStatus,
  getRevenueByPaymentMethod,
  getUsersByRole,
  getProductsByColor,
  getProductsByMaterial,
  getProductsBySize,
  getMessagesByDate,
  getProductsByStyle,
  getProductsByUsagePurpose,
};
