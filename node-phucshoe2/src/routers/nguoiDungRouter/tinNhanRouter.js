const express = require("express");
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../../controllers/nguoiDungController/tinNhanController");
const router = express.Router();

// Định nghĩa các endpoint
router.post("/send", sendMessage); // Gửi tin nhắn
router.get("/messages", getMessages); // Lấy danh sách tin nhắn
router.delete("/delete/:id", deleteMessage); // Xóa tin nhắn

module.exports = router;
