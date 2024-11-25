const express = require("express");
const router = express.Router();
const {
  getProductReviews,
} = require("../../controllers/tuongTacUserController/binhLuanController");
// 1. Lấy danh sách bình luận
router.get("/:id", getProductReviews);

module.exports = router;
