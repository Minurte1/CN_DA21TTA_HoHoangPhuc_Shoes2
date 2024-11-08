const express = require("express");
const router = express.Router();
const {
  getDanhSachMauSac,
  createDanhSachMauSac,
  updateDanhSachMauSac,
  deleteDanhSachMauSac,
} = require("../../../controllers/sanPhamController/categoryController/mauSacController");
router.get("/", getDanhSachMauSac);

// Thêm mới màu sắc
router.post("/", createDanhSachMauSac);

// Cập nhật màu sắc
router.put("/:id", updateDanhSachMauSac);

// Xóa màu sắc
router.delete("/:id", deleteDanhSachMauSac);
module.exports = router;
