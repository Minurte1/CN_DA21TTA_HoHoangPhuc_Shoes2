const express = require("express");
const router = express.Router();

const {
  getCAROUSEL_PRODUCTS,
  getCAROUSEL_PRODUCT_BY_ID,
  createCAROUSEL_PRODUCT,
  updateCAROUSEL_PRODUCT,
  deleteCAROUSEL_PRODUCT,
} = require("../../controllers/sanPhamController/carouselProducts");
const uploads = require("../../config/multerConfig");
// Định nghĩa các route
router.get("/", getCAROUSEL_PRODUCTS);
router.post("/", uploads.single("images"), createCAROUSEL_PRODUCT);
router.put("/:id", uploads.single("images"), updateCAROUSEL_PRODUCT);
router.delete("/:id", deleteCAROUSEL_PRODUCT);

module.exports = router;
