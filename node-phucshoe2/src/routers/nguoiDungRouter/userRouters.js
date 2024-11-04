const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  loginUserGoogle,
  verifyAdmin,
  logoutUser,
  infoUserById,
  updateUserById_Admin,
  getAllUser_Admin,
} = require("../../controllers/nguoiDungController/userController");
const { checkUserJWT } = require("../../middleware/JWTaction");
const upload = require("../../config/multerConfig");

router.get("/user", getAllUser_Admin);
router.post("/user-info", infoUserById);
router.post("/logout", logoutUser);
router.post("/login/google", loginUserGoogle);
router.post("/verify-admin", verifyAdmin);
router.post("/register");

router.put("/user/update", updateUserById_Admin);
module.exports = router;
