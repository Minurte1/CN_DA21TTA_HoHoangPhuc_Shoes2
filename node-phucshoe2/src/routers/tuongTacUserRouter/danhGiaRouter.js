const express = require("express");
const router = express.Router();
const {
  getDanhGiaAdmin,
} = require("../../controllers/tuongTacUserController/danhGiaController");
// 1. Lấy danh sách đánh giá ở phía admin
router.get("/", getDanhGiaAdmin);

module.exports = router;
