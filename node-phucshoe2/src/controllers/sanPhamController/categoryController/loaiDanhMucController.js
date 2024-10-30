const express = require("express");
const router = express.Router();
const {
  DanhSachloai,
  Taoloai,
  Capnhatloai,
  XoaLoai,
} = require("../../../controllers/ProductApiController");

//api MALOAI
router.get("/loai", DanhSachloai); // get list of users
router.post("/loai/create", Taoloai); //get info 1 user
router.put("/loai/info/update/:maloai", Capnhatloai);
router.delete("/loai/info/delete", XoaLoai);

module.exports = router;
