const express = require("express");
const router = express.Router();
const {
  getBaiViet,
  createBaiViet,
  updateBaiViet,
  deleteBaiViet,
} = require("../../controllers/nguoiDungController/baiVietController");

router.get("/baiviet", getBaiViet);

router.post("/baiviet", createBaiViet);

router.put("/baiviet/:id", updateBaiViet);

router.delete("/baiviet/:id", deleteBaiViet);

module.exports = router;
