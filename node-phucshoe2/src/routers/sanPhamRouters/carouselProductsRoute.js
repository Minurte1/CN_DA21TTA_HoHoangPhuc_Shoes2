const express = require("express");
const router = express.Router();

const {
  getCAROUSEL_PRODUCTS,
  getCAROUSEL_PRODUCT_BY_ID,
  createCAROUSEL_PRODUCT,
  updateCAROUSEL_PRODUCT,
  deleteCAROUSEL_PRODUCT,
  getCAROUSEL_7PRODUCTS,
} = require("../../controllers/sanPhamController/carouselProductsController");
const uploads = require("../../config/multerConfig");
// Định nghĩa các route
router.get("/", getCAROUSEL_PRODUCTS);
router.get("/use", getCAROUSEL_7PRODUCTS);
router.post("/", uploads.array("images", 2), createCAROUSEL_PRODUCT);
router.put("/:id", uploads.array("images", 2), updateCAROUSEL_PRODUCT);

router.delete("/:id", deleteCAROUSEL_PRODUCT);

module.exports = router;
