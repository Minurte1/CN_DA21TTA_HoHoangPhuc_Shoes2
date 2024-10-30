const express = require("express");
const router = express.Router();
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

module.exports = router;
