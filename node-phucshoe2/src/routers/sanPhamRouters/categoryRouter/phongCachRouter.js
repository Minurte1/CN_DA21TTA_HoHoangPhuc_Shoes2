const express = require("express");
const router = express.Router();
const {
  getPHONG_CACH,
  createPHONG_CACH,
  updatePHONG_CACH,
  deletePHONG_CACH,
} = require("../../../controllers/sanPhamController/categoryController/phongCachController");
router.get("/phong-cach", getPHONG_CACH);
router.post("/phong-cach", createPHONG_CACH);
router.put("/phong-cach/:id", updatePHONG_CACH);
router.delete("/phong-cach/:id", deletePHONG_CACH);

module.exports = router;
