const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");

const {
  getPHONG_CACH_SAN_PHAM,
  createPHONG_CACH_SAN_PHAM,
  updatePHONG_CACH_SAN_PHAM,
  deletePHONG_CACH_SAN_PHAM,
} = require("../../controllers/sanPhamController/coPhongCachController.js");

router.get("/phong-cach-san-pham", getPHONG_CACH_SAN_PHAM);
router.post("/phong-cach-san-pham", createPHONG_CACH_SAN_PHAM);
router.put("/phong-cach-san-pham/:id", updatePHONG_CACH_SAN_PHAM);
router.delete("/phong-cach-san-pham/:id", deletePHONG_CACH_SAN_PHAM);

module.exports = router;
