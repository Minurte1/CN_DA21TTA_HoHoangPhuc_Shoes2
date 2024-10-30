const express = require("express");
const router = express.Router();
const {
  getDanhSachMauSac,
  createDanhSachMauSac,
  updateDanhSachMauSac,
  deleteDanhSachMauSac,
} = require("../../../controllers/sanPhamController/categoryController/mauSacController");
router.get("/sanpham_mausac", getDanhSachMauSac);

// Thêm mới màu sắc
router.post("/sanpham_mausac", createDanhSachMauSac);

// Cập nhật màu sắc
router.put("/sanpham_mausac/:id", updateDanhSachMauSac);

// Xóa màu sắc
router.delete("/sanpham_mausac/:id", deleteDanhSachMauSac);
module.exports = router;
