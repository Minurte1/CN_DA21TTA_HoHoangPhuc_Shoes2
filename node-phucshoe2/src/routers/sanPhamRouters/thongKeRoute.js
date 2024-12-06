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

router.get("/doanh-thu/ngay", getRevenueByDay); //
router.get("/doanh-thu/thang", getRevenueByMonth); //
router.get("/doanh-thu/nam", getRevenueByYear); //

router.get("/most-liked-products", getMostLikedProducts); //3. Thống kê sản phẩm yêu thích nhất
router.get("/products-by-brand", getProductsByBrand); //4. Thống kê số lượng sản phẩm theo thương hiệu
router.get("/orders-by-status", getOrdersByStatus); //5. Thống kê số lượng đơn hàng theo trạng thái

router.get("/revenue-by-payment-method", getRevenueByPaymentMethod); //6. Thống kê doanh thu theo phương thức thanh toán
router.get("/users-by-role", getUsersByRole); //7. Thống kê người dùng theo vai trò
router.get("/products-by-color", getProductsByColor); // 8. Thống kê sản phẩm theo màu sắc
router.get("/products-by-material", getProductsByMaterial); // 9. Thống kê sản phẩm theo chất liệu

router.get("/products-by-size", getProductsBySize); // 10. Thống kê sản phẩm theo kích cỡ

router.get("/products-by-style", getProductsByStyle); // 12. Thống kê sản phẩm theo phong cách
router.get("/products-by-usage-purpose", getProductsByUsagePurpose); // 13. Thống kê sản phẩm theo mục đích sử dụng

router.get("/messages-by-date", getMessagesByDate); // 11. Thống kê tin nhắn theo ngày
module.exports = router;
