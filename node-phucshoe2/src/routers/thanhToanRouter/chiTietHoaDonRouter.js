const express = require("express");
const router = express.Router();
const {
  getChiTietHoaDon,
  getChiTietHoaDonTheoNguoiDung,
} = require("../../controllers/thanhToanController/chiTietHoaDonController");
// Định nghĩa các route

router.get("/:id", getChiTietHoaDon);
router.get("/giao-dich-thanh-cong/:id", getChiTietHoaDonTheoNguoiDung);

module.exports = router;
