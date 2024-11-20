const express = require("express");
const router = express.Router();
const {
  getDON_HANG,
  createDON_HANG,
  updateDON_HANG,
  deleteDON_HANG,
  updateTrangThaiDonHang,
} = require("../../controllers/thanhToanController/donHangController");
// Định nghĩa các route
router.get("/don-hang", getDON_HANG);
router.post("/", createDON_HANG);
router.post("/hoan-tat", updateTrangThaiDonHang);
router.put("/don-hang/:id", updateDON_HANG);
router.delete("/don-hang/:id", deleteDON_HANG);

module.exports = router;
