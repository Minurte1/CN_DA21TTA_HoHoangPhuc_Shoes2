const express = require("express");
const {
  sendMessage,
  getMessages,
  deleteMessage,
  getMessagesFromUser,
  sendMessageToUser,
} = require("../../controllers/nguoiDungController/tinNhanController");
const router = express.Router();

// Định nghĩa các endpoint
router.post("/send", sendMessage); // Gửi tin nhắn
router.post("/messages", getMessages); // Lấy danh sách tin nhắn
router.delete("/delete/:id", deleteMessage); // Xóa tin nhắn

router.post("/messages-admin", getMessagesFromUser);
router.post("/send-admin", sendMessageToUser);
module.exports = router;
