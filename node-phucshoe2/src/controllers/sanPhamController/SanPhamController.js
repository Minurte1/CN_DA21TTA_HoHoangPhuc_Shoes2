const connection = require("../../config/database.js");
const path = require("path");

// Lấy danh sách sản phẩm
const getSAN_PHAM = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `SAN_PHAM`");
    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo sản phẩm mới
const createSAN_PHAM = async (req, res) => {
  try {
    const {
      idThuongHieu,
      idDanhMuc,
      gioiTinhId,
      chatLieuId,
      tenSanPham,
      gia,
      moTaSanPham,
      trangThaiSanPham,
      soLuongSanPham,
    } = req.body;

    const ngayTaoSanPham = new Date();

    // Get the image file path (if an image was uploaded)
    const hinhAnhSanPham = req.file ? path.basename(req.file.path) : null;

    const [results] = await connection.execute(
      "INSERT INTO SAN_PHAM (ID_THUONG_HIEU, ID_DANH_MUC, GIOI_TINH_ID, CHAT_LIEU_ID_, TEN_SAN_PHAM, GIA, MO_TA_SAN_PHAM, HINH_ANH_SANPHAM, TRANG_THAI_SANPHAM, NGAY_TAO_SANPHAM, NGAY_CAP_NHAT_SANPHAM, SO_LUONG_SANPHAM) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        idThuongHieu,
        idDanhMuc,
        gioiTinhId,
        chatLieuId,
        tenSanPham,
        gia,
        moTaSanPham,
        hinhAnhSanPham, // Store the path to the image
        trangThaiSanPham,
        ngayTaoSanPham,
        ngayTaoSanPham,
        soLuongSanPham,
      ]
    );

    return res.status(201).json({
      EM: "Thêm sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error creating san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thêm sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

// Cập nhật sản phẩm

const updateSAN_PHAM = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await connection.execute(
      "SELECT * FROM san_pham WHERE ID_SAN_PHAM = ?",
      [id]
    );

    if (results.length > 0) {
      const ngayCapNhatSanPham = new Date();

      // Check if there is an uploaded image, and extract the filename
      const hinhAnhSanPham = req.file
        ? path.basename(req.file.path)
        : req.body.hinhAnhSanPham;

      await connection.execute(
        "UPDATE san_pham SET ID_THUONG_HIEU = ?, ID_DANH_MUC = ?, GIOI_TINH_ID = ?, CHAT_LIEU_ID = ?, TEN_SAN_PHAM = ?, GIA = ?, MO_TA_SAN_PHAM = ?, HINH_ANH_SANPHAM = ?, TRANG_THAI_SANPHAM = ?, NGAY_CAP_NHAT_SANPHAM = ?, SO_LUONG_SANPHAM = ? WHERE ID_SAN_PHAM = ?",
        [
          req.body.idThuongHieu,
          req.body.idDanhMuc,
          req.body.gioiTinhId,
          req.body.chatLieuId,
          req.body.tenSanPham,
          req.body.gia,
          req.body.moTaSanPham,
          hinhAnhSanPham, // Use the new filename if an image was uploaded, otherwise retain the existing one
          req.body.trangThaiSanPham,
          ngayCapNhatSanPham,
          req.body.soLuongSanPham,
          id,
        ]
      );
      return res.status(200).json({
        EM: "Cập nhật sản phẩm thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy sản phẩm",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error updating san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

// Xóa sản phẩm
const deleteSAN_PHAM = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM san_pham WHERE ID_SAN_PHAM = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute("DELETE FROM san_pham WHERE ID_SAN_PHAM = ?", [
        id,
      ]);
      return res.status(200).json({
        EM: "Xóa sản phẩm thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy sản phẩm để xóa",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error deleting san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getSAN_PHAM,
  createSAN_PHAM,
  updateSAN_PHAM,
  deleteSAN_PHAM,
};
