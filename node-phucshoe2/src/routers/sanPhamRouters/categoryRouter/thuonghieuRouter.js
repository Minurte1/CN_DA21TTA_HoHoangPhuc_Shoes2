const express = require("express");
const router = express.Router();
const {
  getTHUONG_HIEU,
  createTHUONG_HIEU,
  updateTHUONG_HIEU,
  deleteTHUONG_HIEU,
} = require("../../../controllers/sanPhamController/categoryController/thuonghieuController");
// Định nghĩa các route
router.get("/", getTHUONG_HIEU);
router.post("/", createTHUONG_HIEU);
router.put("/:id", updateTHUONG_HIEU);
router.delete("/:id", deleteTHUONG_HIEU);

module.exports = router;
