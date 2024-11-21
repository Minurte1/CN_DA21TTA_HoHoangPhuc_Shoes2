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
router.get("/", getDON_HANG);
router.post("/", createDON_HANG);
router.post("/hoan-tat", updateTrangThaiDonHang);
router.put("/:id", updateDON_HANG);
router.delete("/:id", deleteDON_HANG);

module.exports = router;
