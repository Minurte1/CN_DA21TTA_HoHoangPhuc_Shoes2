const express = require("express");
const router = express.Router();
const {
  getBaiViet,
  createBaiViet,
  updateBaiViet,
  deleteBaiViet,
  getBaiVietUse,
} = require("../../controllers/nguoiDungController/baiVietController");
const uploads = require("../../config/multerConfig");
router.get("/", getBaiViet);
router.get("/use/", getBaiVietUse);

router.post("/", uploads.single("HINH_ANH_BAIVIET"), createBaiViet);

router.put("/:id", updateBaiViet);

router.delete("/:id", deleteBaiViet);

module.exports = router;
