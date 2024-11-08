const express = require("express");
const router = express.Router();

const {
  getGIOI_TINH,
  createGIOI_TINH,
  updateGIOI_TINH,
  deleteGIOI_TINH,
  getGIOI_TINH_Use,
} = require("../../../controllers/sanPhamController/categoryController/gioiTinhController.js");

router.get("/", getGIOI_TINH);
router.get("/use/", getGIOI_TINH_Use);
router.post("/", createGIOI_TINH);
router.put("/:id", updateGIOI_TINH);
router.delete("/:id", deleteGIOI_TINH);

module.exports = router;
