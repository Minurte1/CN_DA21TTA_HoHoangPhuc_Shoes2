const express = require("express");
const router = express.Router();

const {
  getTHANH_TOAN,
  createTHANH_TOAN,
  updateTHANH_TOAN,
  deleteTHANH_TOAN,
} = require("../../controllers/thanhToanController/thanhToanController.js");

router.get("/", getTHANH_TOAN);
router.post("/", createTHANH_TOAN);
router.put("/:id", updateTHANH_TOAN);
router.delete("/:id", deleteTHANH_TOAN);

module.exports = router;
