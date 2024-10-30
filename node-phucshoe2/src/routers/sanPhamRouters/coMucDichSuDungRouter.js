const express = require("express");
const router = express.Router();

const {
  getMUC_DICH_SU_DUNG_SAN_PHAM,
  createMUC_DICH_SU_DUNG_SAN_PHAM,
  updateMUC_DICH_SU_DUNG_SAN_PHAM,
  deleteMUC_DICH_SU_DUNG_SAN_PHAM,
} = require("../../controllers/sanPhamController/coMucDichSuDungController");
router.get("/muc-dich-su-dung-san-pham", getMUC_DICH_SU_DUNG_SAN_PHAM);
router.post("/muc-dich-su-dung-san-pham", createMUC_DICH_SU_DUNG_SAN_PHAM);
router.put("/muc-dich-su-dung-san-pham/:id", updateMUC_DICH_SU_DUNG_SAN_PHAM);
router.delete(
  "/muc-dich-su-dung-san-pham/:id",
  deleteMUC_DICH_SU_DUNG_SAN_PHAM
);

module.exports = router;
