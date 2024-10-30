const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");
const {
  getTHANH_TOAN,
  createTHANH_TOAN,
  updateTHANH_TOAN,
  deleteTHANH_TOAN,
} = require("../../controllers/thanhToanController/thanhToanController.js");

router.get("/thanh-toan", getTHANH_TOAN);
router.post("/thanh-toan", createTHANH_TOAN);
router.put("/thanh-toan/:id", updateTHANH_TOAN);
router.delete("/thanh-toan/:id", deleteTHANH_TOAN);

module.exports = router;
