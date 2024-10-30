const express = require("express");
const router = express.Router();

const {
  getSAN_PHAM,
  createSAN_PHAM,
  updateSAN_PHAM,
  deleteSAN_PHAM,
} = require("../../controllers/sanPhamController/SanPhamController");
// Định nghĩa các route
router.get("/san-pham", getSAN_PHAM);
router.post("/san-pham", createSAN_PHAM);
router.put("/san-pham/:id", updateSAN_PHAM);
router.delete("/san-pham/:id", deleteSAN_PHAM);

module.exports = router;
