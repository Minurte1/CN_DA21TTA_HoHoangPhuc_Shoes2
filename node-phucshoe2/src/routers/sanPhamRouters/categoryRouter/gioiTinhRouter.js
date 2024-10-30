const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");
const {
  getGIOI_TINH,
  createGIOI_TINH,
  updateGIOI_TINH,
  deleteGIOI_TINH,
} = require("../../../controllers/sanPhamController/categoryController/gioiTinhController.js");

router.get("/gioi-tinh", getGIOI_TINH);
router.post("/gioi-tinh", createGIOI_TINH);
router.put("/gioi-tinh/:id", updateGIOI_TINH);
router.delete("/gioi-tinh/:id", deleteGIOI_TINH);

module.exports = router;
