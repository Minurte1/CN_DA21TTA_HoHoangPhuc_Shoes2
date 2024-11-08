const express = require("express");
const router = express.Router();

const {
  getMUC_DICH_SU_DUNG,
  createMUC_DICH_SU_DUNG,
  updateMUC_DICH_SU_DUNG,
  deleteMUC_DICH_SU_DUNG,
} = require("../../../controllers/sanPhamController/categoryController/mucDichSuDungController");
router.get("/", getMUC_DICH_SU_DUNG);
router.post("/", createMUC_DICH_SU_DUNG);
router.put("/:id", updateMUC_DICH_SU_DUNG);
router.delete("/:id", deleteMUC_DICH_SU_DUNG);

module.exports = router;
