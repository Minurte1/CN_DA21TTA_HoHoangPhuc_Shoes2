const express = require("express");
const router = express.Router();

const {
  getSAN_PHAM,
  createSAN_PHAM,
  updateSAN_PHAM,
  deleteSAN_PHAM,
} = require("../../controllers/sanPhamController/SanPhamController");
const uploads = require("../../config/multerConfig");
// Định nghĩa các route
router.get("/", getSAN_PHAM);
router.post("/", uploads.single("images"), createSAN_PHAM);
router.put("/:id", uploads.single("images"), updateSAN_PHAM);
router.delete("/:id", deleteSAN_PHAM);

module.exports = router;
