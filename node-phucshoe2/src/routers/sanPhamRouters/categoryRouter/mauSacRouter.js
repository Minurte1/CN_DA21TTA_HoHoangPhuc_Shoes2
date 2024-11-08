const express = require("express");
const router = express.Router();
const {
  getDanhSachMauSac,
  createDanhSachMauSac,
  updateDanhSachMauSac,
  deleteDanhSachMauSac,
  getDanhSachMauSac_Use,
} = require("../../../controllers/sanPhamController/categoryController/mauSacController");

router.get("/use/", getDanhSachMauSac);
router.get("/", getDanhSachMauSac_Use);
router.post("/", createDanhSachMauSac);
router.put("/:id", updateDanhSachMauSac);
router.delete("/:id", deleteDanhSachMauSac);
module.exports = router;
