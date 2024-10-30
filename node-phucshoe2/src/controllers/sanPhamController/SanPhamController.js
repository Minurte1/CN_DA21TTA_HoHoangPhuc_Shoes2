const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");

// Lấy danh sách sản phẩm
const getSAN_PHAM = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `san_pham`");
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
const createSAN_PHAM = async (
  idThuongHieu,
  idDanhMuc,
  gioiTinhId,
  chatLieuId,
  tenSanPham,
  gia,
  moTaSanPham,
  hinhAnhSanPham,
  trangThaiSanPham
) => {
  try {
    const ngayTaoSanPham = new Date(); // Lấy ngày hiện tại
    const [results] = await connection.execute(
      "INSERT INTO san_pham (ID_THUONG_HIEU, ID_DANH_MUC, GIOI_TINH_ID, CHAT_LIEU_ID, TEN_SAN_PHAM, GIA, MO_TA_SAN_PHAM, HINH_ANH_SANPHAM, TRANG_THAI_SANPHAM, NGAY_TAO_SANPHAM, NGAY_CAP_NHAT_SANPHAM, SO_LUONG_SANPHAM) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        idThuongHieu,
        idDanhMuc,
        gioiTinhId,
        chatLieuId,
        tenSanPham,
        gia,
        moTaSanPham,
        hinhAnhSanPham,
        trangThaiSanPham,
        ngayTaoSanPham,
        ngayTaoSanPham,
        0,
      ] // Số lượng sản phẩm mặc định là 0
    );
    return {
      EM: "Thêm sản phẩm thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating san pham:", error);
    throw error;
  }
};

// Cập nhật sản phẩm
const updateSAN_PHAM = async (
  idSanPham,
  idThuongHieu,
  idDanhMuc,
  gioiTinhId,
  chatLieuId,
  tenSanPham,
  gia,
  moTaSanPham,
  hinhAnhSanPham,
  trangThaiSanPham
) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM san_pham WHERE ID_SAN_PHAM = ?",
      [idSanPham]
    );

    if (results.length > 0) {
      const ngayCapNhatSanPham = new Date(); // Lấy ngày hiện tại
      await connection.execute(
        "UPDATE san_pham SET ID_THUONG_HIEU = ?, ID_DANH_MUC = ?, GIOI_TINH_ID = ?, CHAT_LIEU_ID = ?, TEN_SAN_PHAM = ?, GIA = ?, MO_TA_SAN_PHAM = ?, HINH_ANH_SANPHAM = ?, TRANG_THAI_SANPHAM = ?, NGAY_CAP_NHAT_SANPHAM = ? WHERE ID_SAN_PHAM = ?",
        [
          idThuongHieu,
          idDanhMuc,
          gioiTinhId,
          chatLieuId,
          tenSanPham,
          gia,
          moTaSanPham,
          hinhAnhSanPham,
          trangThaiSanPham,
          ngayCapNhatSanPham,
          idSanPham,
        ]
      );
      return {
        EM: "Cập nhật sản phẩm thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy sản phẩm",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error updating san pham:", error);
    return {
      EM: "Có lỗi xảy ra khi cập nhật sản phẩm",
      EC: 0,
      DT: [],
    };
  }
};

// Xóa sản phẩm
const deleteSAN_PHAM = async (idSanPham) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM san_pham WHERE ID_SAN_PHAM = ?",
      [idSanPham]
    );

    if (results.length > 0) {
      await connection.execute("DELETE FROM san_pham WHERE ID_SAN_PHAM = ?", [
        idSanPham,
      ]);
      return {
        EM: "Xóa sản phẩm thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy sản phẩm để xóa",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting san pham:", error);
    return {
      EM: "Có lỗi xảy ra khi xóa sản phẩm",
      EC: 0,
      DT: [],
    };
  }
};

// Định nghĩa các route
router.get("/san-pham", getSAN_PHAM);
router.post("/san-pham", async (req, res) => {
  const {
    idThuongHieu,
    idDanhMuc,
    gioiTinhId,
    chatLieuId,
    tenSanPham,
    gia,
    moTaSanPham,
    hinhAnhSanPham,
    trangThaiSanPham,
  } = req.body;
  const result = await createSAN_PHAM(
    idThuongHieu,
    idDanhMuc,
    gioiTinhId,
    chatLieuId,
    tenSanPham,
    gia,
    moTaSanPham,
    hinhAnhSanPham,
    trangThaiSanPham
  );
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.put("/san-pham/:id", async (req, res) => {
  const { id } = req.params;
  const {
    idThuongHieu,
    idDanhMuc,
    gioiTinhId,
    chatLieuId,
    tenSanPham,
    gia,
    moTaSanPham,
    hinhAnhSanPham,
    trangThaiSanPham,
  } = req.body;
  const result = await updateSAN_PHAM(
    id,
    idThuongHieu,
    idDanhMuc,
    gioiTinhId,
    chatLieuId,
    tenSanPham,
    gia,
    moTaSanPham,
    hinhAnhSanPham,
    trangThaiSanPham
  );
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.delete("/san-pham/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deleteSAN_PHAM(id);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});

module.exports = router;
