const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");
const {
  getMAU_SAC_SAN_PHAM,
  createMAU_SAC_SAN_PHAM,
  updateMAU_SAC_SAN_PHAM,
  deleteMAU_SAC_SAN_PHAM,
} = require("../../controllers/sanPhamController/coMauSacController.js");
// Định nghĩa các route
router.get("/mau-sac-san-pham", getMAU_SAC_SAN_PHAM);
router.post("/mau-sac-san-pham", createMAU_SAC_SAN_PHAM);
router.put("/mau-sac-san-pham/:id", updateMAU_SAC_SAN_PHAM);
router.delete("/mau-sac-san-pham/:id", deleteMAU_SAC_SAN_PHAM);

module.exports = router;
