const express = require("express");
const router = express.Router();
const connection = require("../db"); // Đảm bảo rằng kết nối cơ sở dữ liệu được import đúng
const {
  getGioHang,
  createGioHang,
  updateGioHang,
  deleteGioHang,
} = require("../../controllers/tuongTacUserController/gioHangController");
// 1. Lấy danh sách giỏ hàng của người dùng
router.get("/giohang/:id_nguoidung", getGioHang);

// 2. Thêm sản phẩm vào giỏ hàng
router.post("/giohang", createGioHang);

// 3. Cập nhật số lượng sản phẩm trong giỏ hàng
router.put("/giohang/:id", updateGioHang);

// 4. Xóa sản phẩm khỏi giỏ hàng
router.delete("/giohang/:id", deleteGioHang);

module.exports = router;
