const pool = require("../../config/database"); // Đảm bảo `connection` được import từ tệp kết nối cơ sở dữ liệu của bạn
// 1. Lấy danh sách bình luận với các thông tin thêm từ các bảng khác
const getDanhGiaAdmin = async (req, res) => {
  try {
    // Truy vấn tất cả đánh giá, bình luận và thông tin người dùng theo ID_SAN_PHAM,
    // đồng thời lấy thêm dữ liệu từ các bảng khác
    const [results] = await pool.execute(
      `SELECT 
          sp.ID_SAN_PHAM,
          sp.HINH_ANH_SANPHAM,
          sp.TEN_SAN_PHAM,
          COUNT(cthd.DANH_GIA) AS total_ratings,
          AVG(cthd.DANH_GIA) AS average_rating,
          GROUP_CONCAT(DISTINCT pc.TEN_PHONG_CACH) AS phong_cach,  -- Lấy tên phong cách từ bảng PHONG_CACH
          GROUP_CONCAT(DISTINCT ms.TEN_MAU_SAC) AS mau_sac,        -- Lấy tên màu sắc từ bảng MAU_SAC
          GROUP_CONCAT(DISTINCT md.TEN_MUC_DICH_SU_DUNG) AS muc_dich_su_dung, -- Lấy tên mục đích sử dụng từ bảng MUC_DICH_SU_DUNG
          GROUP_CONCAT(DISTINCT kc.KICH_CO) AS kich_co              -- Lấy tên kích cỡ từ bảng KICH_CO
        FROM 
          CHI_TIET_HOA_DON cthd
        INNER JOIN 
          SAN_PHAM sp ON cthd.ID_SAN_PHAM = sp.ID_SAN_PHAM
        INNER JOIN 
          DON_HANG dh ON cthd.ID_DON_HANG = dh.ID_DON_HANG
        LEFT JOIN 
          PHONG_CACH_SAN_PHAM pcs ON sp.ID_SAN_PHAM = pcs.ID_SAN_PHAM
        LEFT JOIN 
          MAU_SAC_SAN_PHAM mss ON sp.ID_SAN_PHAM = mss.ID_SAN_PHAM
        LEFT JOIN 
          MUC_DICH_SU_DUNG_SAN_PHAM mdsp ON sp.ID_SAN_PHAM = mdsp.ID_SAN_PHAM
        LEFT JOIN 
          CO_KICH_CO ckc ON sp.ID_SAN_PHAM = ckc.ID_SAN_PHAM
        LEFT JOIN 
          PHONG_CACH pc ON pcs.ID_PHUONG_CACH = pc.ID_PHUONG_CACH
        LEFT JOIN 
          MAU_SAC ms ON mss.MAU_SAC_ID = ms.MAU_SAC_ID
        LEFT JOIN 
          MUC_DICH_SU_DUNG md ON mdsp.ID_MUC_DICH_SU_DUNG = md.ID_MUC_DICH_SU_DUNG
        LEFT JOIN 
          KICH_CO kc ON ckc.ID_KICH_CO = kc.ID_KICH_CO
        WHERE 
          dh.TRANG_THAI_DON_HANG = 'Giao dịch thành công'
          AND cthd.DANH_GIA IS NOT NULL
        GROUP BY 
          sp.ID_SAN_PHAM, sp.TEN_SAN_PHAM
        ORDER BY 
          average_rating DESC
        LIMIT 200;
        `
    );

    if (results.length === 0) {
      return res.status(200).json({
        EM: "Không tìm thấy đánh giá sản phẩm",
        EC: 1,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Lấy dữ liệu đánh giá thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error fetching reviews and comments:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống khi lấy đánh giá",
      EC: -1,
    });
  }
};

module.exports = {
  getDanhGiaAdmin,
};
