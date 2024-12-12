const express = require("express");
const router = express.Router();
const {
  getBaiViet,
  createBaiViet,
  updateBaiViet,
  deleteBaiViet,
} = require("../../controllers/nguoiDungController/baiVietController");

router.get("/", getBaiViet);

router.post("/", createBaiViet);

router.put("/:id", updateBaiViet);

router.delete("/:id", deleteBaiViet);

module.exports = router;
