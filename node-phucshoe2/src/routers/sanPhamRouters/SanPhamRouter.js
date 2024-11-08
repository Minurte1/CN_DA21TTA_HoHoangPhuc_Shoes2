const express = require("express");
const router = express.Router();

const {
  getSAN_PHAM,
  createSAN_PHAM,
  updateSAN_PHAM,
  deleteSAN_PHAM,
} = require("../../controllers/sanPhamController/SanPhamController");
// Định nghĩa các route
router.get("/", getSAN_PHAM);
router.post("/", createSAN_PHAM);
router.put("/:id", updateSAN_PHAM);
router.delete("/:id", deleteSAN_PHAM);

module.exports = router;
