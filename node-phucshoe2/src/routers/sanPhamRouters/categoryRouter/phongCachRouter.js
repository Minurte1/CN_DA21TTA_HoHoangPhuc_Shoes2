const express = require("express");
const router = express.Router();
const {
  getPHONG_CACH,
  createPHONG_CACH,
  updatePHONG_CACH,
  deletePHONG_CACH,
} = require("../../../controllers/sanPhamController/categoryController/phongCachController");
router.get("/", getPHONG_CACH);
router.post("/", createPHONG_CACH);
router.put("/:id", updatePHONG_CACH);
router.delete("/:id", deletePHONG_CACH);

module.exports = router;
