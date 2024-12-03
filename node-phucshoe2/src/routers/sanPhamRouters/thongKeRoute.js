const express = require("express");
const router = express.Router();
const {
  getProductStatisticsByCategory,
  getRevenueByMonth,
  getRevenueByDay,
  getRevenueByYear,
  getMostLikedProducts,

  getProductsByBrand,
  getOrdersByStatus,

  getRevenueByPaymentMethod,
  getUsersByRole,
  getProductsByColor,
  getProductsByMaterial,

  getProductsBySize,
  getMessagesByDate,
  getProductsByStyle,
  getProductsByUsagePurpose,
} = require("../../controllers/sanPhamController/thongKeController");
router.get("/danh-muc", getProductStatisticsByCategory);
router.get("/doanh-thu/ngay", getRevenueByDay);
router.get("/doanh-thu/thang", getRevenueByMonth);
router.get("/doanh-thu/nam", getRevenueByYear);

router.get("/most-liked-products", getMostLikedProducts);
router.get("/products-by-brand", getProductsByBrand);
router.get("/orders-by-status", getOrdersByStatus);

router.get("/revenue-by-payment-method", getRevenueByPaymentMethod);
router.get("/users-by-role", getUsersByRole);
router.get("/products-by-color", getProductsByColor);
router.get("/products-by-material", getProductsByMaterial);

router.get("/products-by-size", getProductsBySize);
router.get("/messages-by-date", getMessagesByDate);
router.get("/products-by-style", getProductsByStyle);
router.get("/products-by-usage-purpose", getProductsByUsagePurpose);

module.exports = router;
