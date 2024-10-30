const express = require("express");
const router = express.Router();

const {
  getDonHangChuaduocGiao,
  getDonHangDaDuocGiao,
  updateTrangthai,
  XoaDonHangHuy,
  updateTrangthaihuydon,
  getDonHangDaHuy,
  getDonHangChuaduocGiaochokhachhang,
  getDonHangDaduocGiaochokhachhang,
  getDonHangDahuyGiaochokhachhang,
} = require("../controllers/ApiDonHangController");

router.get("/donhangchuagiao", checkUserJWT, getDonHangChuaduocGiao); // lấy đơn hàng chưa giao

router.get("/donhangdagiao", getDonHangDaDuocGiao); //lấy đơn hàng đã giao thành công
router.put("/donhang/update/:madonhang", updateTrangthai); //update trạng thái của đơn hang
router.get("/donhangdahuy", getDonHangDaHuy); //lấy đơn hàng đã Hủy
router.put("/donhanghuy/update/:madonhang", updateTrangthaihuydon); // update trạng thái đơn hàng thành ĐÃ HỦY
router.delete("/donhanghuy/info/delete", XoaDonHangHuy); // XÓA CÁC ĐƠN HÀNG ĐÃ HỦY

//api đơn hàng cho user
router.post("/donhangchuagiaokhachhang", getDonHangChuaduocGiaochokhachhang);
router.post("/donhangdagiaokhachhang", getDonHangDaduocGiaochokhachhang);
router.post("/donhangdahuygiaokhachhang", getDonHangDahuyGiaochokhachhang);
module.exports = router; // Di chuyển dòng này về cuối tệp của bạn
