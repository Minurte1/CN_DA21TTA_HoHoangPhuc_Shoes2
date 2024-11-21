const express = require("express");
const router = express.Router();
const {
  getChiTietHoaDon,
} = require("../../controllers/thanhToanController/chiTietHoaDonController");
// Định nghĩa các route
router.get("/:id", getChiTietHoaDon);

module.exports = router;
