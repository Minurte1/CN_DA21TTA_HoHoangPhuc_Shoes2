const express = require("express");
const router = express.Router();

const {
  getSAN_PHAM,
  createSAN_PHAM,
  updateSAN_PHAM,
  deleteSAN_PHAM,
  getSAN_PHAM_Use,
  getSAN_PHAM_Use_Nu,
  getLatest2Products,
  getSAN_PHAM_Use_TreEm,
  getTop5BestSellingProducts,
  get5TopFavoriteProducts,
  getTopExpensiveProducts,
  getCartProductsByUser,
} = require("../../controllers/sanPhamController/SanPhamController");
const uploads = require("../../config/multerConfig");
// Định nghĩa các route
router.get("/", getSAN_PHAM);
router.get("/use/", getSAN_PHAM_Use);
router.get("/use/nu", getSAN_PHAM_Use_Nu);
router.get("/use/tre-em", getSAN_PHAM_Use_TreEm);
router.get("/use/5best-selling", getTop5BestSellingProducts);
router.get("/use/5best-expensive", getTopExpensiveProducts);
router.get("/use/last2products", getLatest2Products);
router.get("/use/5best-favorite", get5TopFavoriteProducts);
router.get("/use/cart-user/:id", getCartProductsByUser);

router.post("/", uploads.single("images"), createSAN_PHAM);
router.put("/:id", uploads.single("images"), updateSAN_PHAM);
router.delete("/:id", deleteSAN_PHAM);

module.exports = router;
