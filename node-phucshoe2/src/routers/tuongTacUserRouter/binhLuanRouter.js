const express = require("express");
const router = express.Router();
const {
  getBinhLuan,
  createBinhLuan,
  updateBinhLuan,
  deleteBinhLuan,
} = require("../../controllers/tuongTacUserController/binhLuanController");
// 1. Lấy danh sách bình luận
router.get("/binhluan", getBinhLuan);

// 2. Thêm mới bình luận
router.post("/binhluan", createBinhLuan);

// 3. Cập nhật bình luận
router.put("/binhluan/:id", updateBinhLuan);

// 4. Xóa bình luận
router.delete("/binhluan/:id", deleteBinhLuan);

module.exports = router;
