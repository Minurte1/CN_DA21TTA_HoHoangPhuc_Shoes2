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

  getFavoriteProductsByUser,
  getSAN_PHAM_Use_ById,
  getSAN_PHAM_Use_Nam,
  getSAN_PHAM_Search,

  getSAN_PHAM_ChiTiet_ById,
  updateSAN_PHAM_ChiTiet_ById,
  getProductsUnder20,
} = require("../../controllers/sanPhamController/SanPhamController");
const uploads = require("../../config/multerConfig");
// Định nghĩa các route
router.post("/use/nu", getSAN_PHAM_Use_Nu);
router.get("/use/tre-em", getSAN_PHAM_Use_TreEm);
router.post("/use/nam", getSAN_PHAM_Use_Nam);
router.get("/use/last2products", getLatest2Products);
router.get("/", getSAN_PHAM);
router.post("/use/", getSAN_PHAM_Use);

router.post("/use/5best-selling", getTop5BestSellingProducts);
router.post("/use/5best-expensive", getTopExpensiveProducts);
router.post("/use/5best-favorite", get5TopFavoriteProducts);

router.get("/use/wishlist-user/:id", getFavoriteProductsByUser);
router.post("/", uploads.single("images"), createSAN_PHAM);
router.put("/:id", uploads.single("images"), updateSAN_PHAM);
router.delete("/:id", deleteSAN_PHAM);
router.get("/use/:id", getSAN_PHAM_Use_ById);
router.get("/search", getSAN_PHAM_Search);

router.get("/chi-tiet/:id", getSAN_PHAM_ChiTiet_ById);
router.put("/chi-tiet/:id", updateSAN_PHAM_ChiTiet_ById);
//admin

router.get("/products-under-20", getProductsUnder20);

module.exports = router;
