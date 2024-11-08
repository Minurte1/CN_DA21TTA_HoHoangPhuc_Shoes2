const express = require("express");
const router = express.Router();
const {
  getCHAT_LIEU,
  createCHAT_LIEU,
  updateCHAT_LIEU,
  deleteCHAT_LIEU,
  getCHAT_LIEU_Use,
} = require("../../../controllers/sanPhamController/categoryController/chatLieuController");
// Định nghĩa các route
router.get("/", getCHAT_LIEU);
router.get("/use/", getCHAT_LIEU_Use);
router.post("/", createCHAT_LIEU);
router.put("/:id", updateCHAT_LIEU);
router.delete("/:id", deleteCHAT_LIEU);

//http://localhost:3002/chat-lieu/
module.exports = router;
