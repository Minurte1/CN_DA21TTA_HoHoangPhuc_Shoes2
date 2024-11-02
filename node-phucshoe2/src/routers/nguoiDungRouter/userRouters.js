const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  CreateUser,
  getAllUser,
  loginUser,
  logoutUser,
  getInfoUser,
  CapnhatUser,
  CapnhatAvatarUser,
  XoaUser,
  loginAdmin,
  registerAdmin,
  CapnhatPasswordUser,
  muahangUser,
  CapnhatAdmin,
  countUsers,
  loginUserGoogle,
} = require("../../controllers/apiUserController");
const { checkUserJWT } = require("../../middleware/JWTaction");
const upload = require("../../config/multerConfig");
router.post("/register", CreateUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/login/google", loginUserGoogle);

//----------------------------------------------------------------------------------------------------------------
//admin routers login and register
router.post("/loginAdmin", loginAdmin);
router.post("/registerAdmin", registerAdmin);
router.put("/admin/info/update/password/", checkUserJWT, CapnhatAdmin); //update mật khẩu cho admin
//----------------------------------------------------------------------------------------------------------------
//user routes READ POST PUT DELETE information
router.get("/user", checkUserJWT, getAllUser); // get list of users
router.get("/user/info/:username", checkUserJWT, getInfoUser); //get info 1 user
router.put("/user/info/update/:username", checkUserJWT, CapnhatUser);
router.put(
  "/user/info/update/avatar/:username",
  checkUserJWT,
  upload.single("image"),
  CapnhatAvatarUser
); //mua hàng dành cho user

router.put(
  "/user/info/update/password/:username",
  checkUserJWT,
  CapnhatPasswordUser
); //update 1 user (cho người dùng)
router.delete("/user/info/delete/:username", checkUserJWT, XoaUser); //xóa user (cho admin)
router.get("/countuser", countUsers); //Tính số lượng tài khoản đã tạo cho ADMIN
router.post("/productt", muahangUser);

module.exports = router;
