const express = require("express");
const router = express.Router();

const {
  getLOAI_DANH_MUC,
  createLOAI_DANH_MUC,
  updateLOAI_DANH_MUC,
  deleteLOAI_DANH_MUC,
} = require("../../../controllers/sanPhamController/categoryController/loaiDanhMucController");

router.get("/", getLOAI_DANH_MUC);
router.post("/", createLOAI_DANH_MUC);
router.put("/:id", updateLOAI_DANH_MUC);
router.delete("/:id", deleteLOAI_DANH_MUC);
module.exports = router;
