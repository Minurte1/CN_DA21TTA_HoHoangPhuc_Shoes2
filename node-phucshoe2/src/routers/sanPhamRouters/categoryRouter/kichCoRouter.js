const express = require("express");
const router = express.Router();

const {
  getKICH_CO,
  createKICH_CO,
  updateKICH_CO,
  deleteKICH_CO,
  getKICH_CO_Use,
} = require("../../../controllers/sanPhamController/categoryController/kichCoController");

router.get("/use/", getKICH_CO_Use);
router.get("/", getKICH_CO);
router.post("/", createKICH_CO);
router.put("/:id", updateKICH_CO);
router.delete("/:id", deleteKICH_CO);
module.exports = router;
