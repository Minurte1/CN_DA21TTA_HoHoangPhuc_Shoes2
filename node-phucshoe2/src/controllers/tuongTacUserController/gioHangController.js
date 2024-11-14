const connection = require("../../config/database"); // Đảm bảo `connection` được import từ tệp kết nối cơ sở dữ liệu của bạn
const moment = require("moment");

// 1. Lấy danh sách giỏ hàng của người dùng
const getGioHang = async (req, res) => {
  const { id_nguoidung } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `GIO_HANG` WHERE ID_NGUOI_DUNG = ?",
      [id_nguoidung]
    );
    res.status(200).json({ EM: "Lấy giỏ hàng thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

// 2. Thêm sản phẩm vào giỏ hàng
const createGioHang = async (req, res) => {
  const { ID_SAN_PHAM, ID_NGUOI_DUNG, NGAY_CAP_NHAT_GIOHANG } = req.body;
  console.log("req.body", req.body);

  // Định dạng ngày
  const formattedDate = moment(NGAY_CAP_NHAT_GIOHANG).format(
    "YYYY-MM-DD HH:mm:ss"
  );

  try {
    const [results] = await connection.execute(
      "INSERT INTO `GIO_HANG` (ID_SAN_PHAM, ID_NGUOI_DUNG, NGAY_CAP_NHAT_GIOHANG) VALUES (?, ?, ?)",
      [ID_SAN_PHAM, ID_NGUOI_DUNG, formattedDate]
    );
    res
      .status(201)
      .json({ EM: "Thêm vào giỏ hàng thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

// 3. Cập nhật số lượng sản phẩm trong giỏ hàng
const removeSingleProductFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const [results] = await connection.execute(
      "DELETE FROM `GIO_HANG` WHERE ID_NGUOI_DUNG = ? AND ID_SAN_PHAM = ? LIMIT 1",
      [userId, productId]
    );

    if (results.affectedRows > 0) {
      return res.status(200).json({
        EM: "Xóa 1 sản phẩm khỏi giỏ hàng thành công",
        EC: 1,
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy sản phẩm trong giỏ hàng để xóa",
        EC: 0,
      });
    }
  } catch (error) {
    console.error("Error removing product:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống khi xóa sản phẩm",
      EC: -1,
    });
  }
};

const addSingleProductToCart = async (req, res) => {
  const { userId, productId, updateDate } = req.body;

  // Sử dụng moment để chuyển đổi updateDate thành định dạng 'YYYY-MM-DD HH:mm:ss'
  const formattedUpdateDate = moment(updateDate).format("YYYY-MM-DD HH:mm:ss");

  try {
    const [results] = await connection.execute(
      "INSERT INTO `GIO_HANG` (ID_NGUOI_DUNG, ID_SAN_PHAM, NGAY_CAP_NHAT_GIOHANG) VALUES (?, ?, ?)",
      [userId, productId, formattedUpdateDate]
    );

    return res.status(200).json({
      EM: "Thêm sản phẩm vào giỏ hàng thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống khi thêm sản phẩm vào giỏ hàng",
      EC: -1,
    });
  }
};

// 4. Xóa sản phẩm khỏi giỏ hàng
const deleteGioHang = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "DELETE FROM `GIO_HANG` WHERE ID_GIO_HANG = ?",
      [id]
    );
    res.status(200).json({
      EM: "Xóa sản phẩm khỏi giỏ hàng thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};
// Lấy tất cả sản phẩm trong giỏ hàng của 1 người dùng
const getCartProductsByUser = async (req, res) => {
  const userId = req.params.id; // Lấy userId từ tham số URL

  try {
    const [results] = await connection.execute(
      `
      SELECT 
        cth.ID_SAN_PHAM, 
        sp.TEN_SAN_PHAM, 
        sp.GIA, 
        sp.HINH_ANH_SANPHAM, 
        sp.MO_TA_SAN_PHAM,
        sp.TRANG_THAI_SANPHAM, 
        sp.SO_LUONG_SANPHAM, 
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC,
        cl.TEN_CHAT_LIEU_,
        th.TEN_THUONG_HIEU,
    
        COUNT(*) AS TONG_SO_LUONG,  -- Đếm số lượng của sản phẩm
        MAX(cth.NGAY_CAP_NHAT_GIOHANG) AS NGAY_CAP_NHAT_GIOHANG -- Ngày cập nhật mới nhất
      FROM GIO_HANG cth
      JOIN SAN_PHAM sp ON cth.ID_SAN_PHAM = sp.ID_SAN_PHAM
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
      WHERE cth.ID_NGUOI_DUNG = ? AND sp.TRANG_THAI_SANPHAM = 1
      GROUP BY cth.ID_SAN_PHAM -- Gộp theo ID_SAN_PHAM để đếm số lượng
    `,
      [userId]
    );

    if (results.length === 0) {
      return res.status(404).json({
        EM: "Giỏ hàng của người dùng trống hoặc không tồn tại",
        EC: 0,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Lấy thông tin giỏ hàng thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting cart products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy giỏ hàng",
      EC: 0,
      DT: [],
    });
  }
};
module.exports = {
  getGioHang,
  createGioHang,
  addSingleProductToCart,
  removeSingleProductFromCart,
  deleteGioHang,
  getCartProductsByUser,
};
