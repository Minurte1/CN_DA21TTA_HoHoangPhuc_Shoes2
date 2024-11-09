const connection = require("../../config/database.js");
const path = require("path");

// Lấy danh sách sản phẩm
const getSAN_PHAM = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT 
        sp.ID_SAN_PHAM, sp.ID_THUONG_HIEU, sp.ID_DANH_MUC, sp.GIOI_TINH_ID, sp.CHAT_LIEU_ID_,
        sp.TEN_SAN_PHAM, sp.GIA, sp.MO_TA_SAN_PHAM, sp.HINH_ANH_SANPHAM, sp.TRANG_THAI_SANPHAM, 
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, sp.SO_LUONG_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC,
        cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU,
        th.TEN_THUONG_HIEU
      FROM SAN_PHAM sp
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
    `);

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
const getSAN_PHAM_Use = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT 
        sp.ID_SAN_PHAM, sp.ID_THUONG_HIEU, sp.ID_DANH_MUC, sp.GIOI_TINH_ID, sp.CHAT_LIEU_ID_,
        sp.TEN_SAN_PHAM, sp.GIA, sp.MO_TA_SAN_PHAM, sp.HINH_ANH_SANPHAM, sp.TRANG_THAI_SANPHAM, 
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, sp.SO_LUONG_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC,
        cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU,
        th.TEN_THUONG_HIEU
      FROM SAN_PHAM sp
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
      WHERE sp.TRANG_THAI_SANPHAM = 1
    `);

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
    const images = req.file ? path.basename(req.file.path) : null;

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
        images, // Store the path to the image
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
      "SELECT * FROM SAN_PHAM WHERE ID_SAN_PHAM = ?",
      [id]
    );

    if (results.length > 0) {
      const ngayCapNhatSanPham = new Date();

      // Check if there is an uploaded image, and extract the filename
      const images = req.file ? path.basename(req.file.path) : req.body.images;

      await connection.execute(
        "UPDATE SAN_PHAM SET ID_THUONG_HIEU = ?, ID_DANH_MUC = ?, GIOI_TINH_ID = ?, CHAT_LIEU_ID_ = ?, TEN_SAN_PHAM = ?, GIA = ?, MO_TA_SAN_PHAM = ?, HINH_ANH_SANPHAM = ?, TRANG_THAI_SANPHAM = ?, NGAY_CAP_NHAT_SANPHAM = ?, SO_LUONG_SANPHAM = ? WHERE ID_SAN_PHAM = ?",
        [
          req.body.idThuongHieu,
          req.body.idDanhMuc,
          req.body.gioiTinhId,
          req.body.chatLieuId,
          req.body.tenSanPham,
          req.body.gia,
          req.body.moTaSanPham,
          images, // Use the new filename if an image was uploaded, otherwise retain the existing one
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
      "SELECT * FROM SAN_PHAM WHERE ID_SAN_PHAM = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute("DELETE FROM SAN_PHAM WHERE ID_SAN_PHAM = ?", [
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
  getSAN_PHAM_Use,
};
