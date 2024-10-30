const express = require("express");
const router = express.Router();
const {
  getYEU_THICH,
  createYEU_THICH,
  deleteYEU_THICH,
  getYEU_THICH_By_IdUser,
} = require("../../controllers/tuongTacUserController/yeuThichController");
// Định nghĩa các route
router.get("/yeu-thich", getYEU_THICH);
router.get("/yeu-thich/:id", getYEU_THICH_By_IdUser);
router.post("/yeu-thich", createYEU_THICH);
router.delete("/yeu-thich", deleteYEU_THICH);

module.exports = router;
