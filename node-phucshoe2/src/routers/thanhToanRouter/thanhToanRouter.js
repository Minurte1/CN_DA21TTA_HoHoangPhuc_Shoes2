const express = require("express");
const router = express.Router();

const {
  getTHANH_TOAN,
  createTHANH_TOAN,
  updateTHANH_TOAN,
  deleteTHANH_TOAN,
  getTHANH_TOAN_Use,
  createPayment,
} = require("../../controllers/thanhToanController/thanhToanController.js");

router.get("/", getTHANH_TOAN);
router.get("/use", getTHANH_TOAN_Use);
router.post("/", createTHANH_TOAN);
router.post("/pay-momo", createPayment);
router.put("/:id", updateTHANH_TOAN);
router.delete("/:id", deleteTHANH_TOAN);

module.exports = router;
