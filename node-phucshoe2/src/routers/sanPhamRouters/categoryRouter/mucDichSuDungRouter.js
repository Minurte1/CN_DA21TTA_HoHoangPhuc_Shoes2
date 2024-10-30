const express = require("express");
const router = express.Router();

const {
  getMUC_DICH_SU_DUNG,
  createMUC_DICH_SU_DUNG,
  updateMUC_DICH_SU_DUNG,
  deleteMUC_DICH_SU_DUNG,
} = require("../../../controllers/sanPhamController/categoryController/mucDichSuDungController");
router.get("/muc-dich-su-dung", getMUC_DICH_SU_DUNG);
router.post("/muc-dich-su-dung", createMUC_DICH_SU_DUNG);
router.put("/muc-dich-su-dung/:id", updateMUC_DICH_SU_DUNG);
router.delete("/muc-dich-su-dung/:id", deleteMUC_DICH_SU_DUNG);

module.exports = router;
