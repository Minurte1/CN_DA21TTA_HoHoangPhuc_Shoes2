const express = require("express");
const router = express.Router();
const {
  getYEU_THICH,
  createYEU_THICH,
  deleteYEU_THICH,
  getYEU_THICH_By_IdUser,
} = require("../../controllers/tuongTacUserController/yeuThichController");
// Định nghĩa các route
router.get("", getYEU_THICH);
router.get("/:id", getYEU_THICH_By_IdUser);
router.post("/", createYEU_THICH);
router.delete("/", deleteYEU_THICH);

module.exports = router;
