const express = require("express");
const router = express.Router();
const {
  getTHUONG_HIEU,
  createTHUONG_HIEU,
  updateTHUONG_HIEU,
  deleteTHUONG_HIEU,
} = require("../../../controllers/sanPhamController/categoryController/thuonghieuController");
// Định nghĩa các route
router.get("/thuong-hieu", getTHUONG_HIEU);
router.post("/thuong-hieu", createTHUONG_HIEU);
router.put("/thuong-hieu/:id", updateTHUONG_HIEU);
router.delete("/thuong-hieu/:id", deleteTHUONG_HIEU);

module.exports = router;
