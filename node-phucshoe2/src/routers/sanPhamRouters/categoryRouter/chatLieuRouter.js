const express = require("express");
const router = express.Router();
const {
  getCHAT_LIEU,
  createCHAT_LIEU,
  updateCHAT_LIEU,
  deleteCHAT_LIEU,
} = require("../../../controllers/sanPhamController/categoryController/chatLieuController");
// Định nghĩa các route
router.get("/chat-lieu", getCHAT_LIEU);
router.post("/chat-lieu", createCHAT_LIEU);
router.put("/chat-lieu/:id", updateCHAT_LIEU);
router.delete("/chat-lieu/:id", deleteCHAT_LIEU);

module.exports = router;
