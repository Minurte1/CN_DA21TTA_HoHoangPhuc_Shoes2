const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");
const {
  getCO_KICH_CO,
  createCO_KICH_CO,
  updateCO_KICH_CO,
  deleteCO_KICH_CO,
} = require("../../controllers/sanPhamController/coKichCoController.js");

// Định nghĩa các route
router.get("/co-kich-co", getCO_KICH_CO);
router.post("/co-kich-co", createCO_KICH_CO);
router.put("/co-kich-co/:id", updateCO_KICH_CO);
router.delete("/co-kich-co/:id", deleteCO_KICH_CO);

module.exports = router;
