const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
var appRoot = require("app-root-path");
const { getAllProduct } = require("../controllers/ApiController");
const upload = require("../config/multerConfig");

const {
  CapnhatHang,
  XoaHang,
  DanhSachHang,
  TaoHang,
  DanhSachkichco,
  Capnhatkichco,
  Taokichco,
  XoaKichco,
  DanhSachloai,
  Taoloai,
  Capnhatloai,
  XoaLoai,
  DanhSachsanpham,
  DanhSachthongkesanphamvoiHang,
  DanhSachthongkesanphamvoiLoai,
  DanhSachthongkesanphamvoiThang,
  DanhSachthongkesanphamvoiNam,
  DanhSachsanphamwithPaginate,
  DanhSachthongkesanpham,
  Taosanpham,
  Capnhatsanpham,
  Xoasanpham,
} = require("../controllers/ProductApiController");

const { checkUserJWT } = require("../middleware/JWTaction");

//----------------------------------------------------------------------------------------------------------------
//user routes login and register
router.get("/protected", checkUserJWT, (req, res) => {
  res.json({ message: "Protected data", user: req.user }); // Sử dụng thông tin người dùng từ req.user
});

//----------------------------------------------------------------------------------------------------------------
//api HANG
router.get("/hang", DanhSachHang);
router.post("/hang/create", TaoHang);
router.put("/hang/info/update/:mahang", CapnhatHang);
router.delete("/hang/info/delete", XoaHang); //chưa làm được =))))

//----------------------------------------------------------------------------------------------------------------
//api KICHCO
router.get("/kichco", DanhSachkichco);
router.post("/kichco/create", Taokichco);
router.put("/kichco/info/update/:magiatri", Capnhatkichco);
router.delete("/kichco/info/delete", XoaKichco); // chưa làm được =))))

//----------------------------------------------------------------------------------------------------------------
//api MALOAI
router.get("/loai", DanhSachloai); // get list of users
router.post("/loai/create", Taoloai); //get info 1 user
router.put("/loai/info/update/:maloai", Capnhatloai);
router.delete("/loai/info/delete", XoaLoai);

//api sản phẩm
router.get("/productall", DanhSachsanpham); // get list of users
router.get("/productall/hang", DanhSachthongkesanphamvoiHang); //thống kê đơn hàng HANG các thư cho ADMIN
router.get("/productall/loai", DanhSachthongkesanphamvoiLoai); //thống kê đơn hàng LOAI các thư cho ADMIN
router.get("/productall/nam", DanhSachthongkesanphamvoiNam); //thống kê đơn hàng theo năm các thư cho ADMIN
router.post("/productall/thang", DanhSachthongkesanphamvoiThang); //thống kê đơn hàng THEO THÁNG các thư cho ADMIN
router.get("/productallPaginate", DanhSachsanphamwithPaginate);

router.get("/productThongke", DanhSachthongkesanpham); //thống kê đơn hàng các thư cho ADMIN
router.post("/product/create", upload.single("image"), Taosanpham); //get info 1 user
router.put(
  "/product/info/update/:masanpham",
  upload.single("image"),
  Capnhatsanpham
);
router.delete("/product/info/delete/:masanpham", Xoasanpham);

//api đơn hàng

module.exports = router; // Di chuyển dòng này về cuối tệp của bạn
