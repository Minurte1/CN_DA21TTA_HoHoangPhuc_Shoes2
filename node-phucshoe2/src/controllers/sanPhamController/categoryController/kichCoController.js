const express = require("express");
const router = express.Router();
const {
  DanhSachkichco,
  Capnhatkichco,
  Taokichco,
  XoaKichco,
} = require("../../ProductApiController");

//api KICHCO
router.get("/kichco", DanhSachkichco);
router.post("/kichco/create", Taokichco);
router.put("/kichco/info/update/:magiatri", Capnhatkichco);
router.delete("/kichco/info/delete", XoaKichco); // chưa làm được =))))
module.exports = router;
