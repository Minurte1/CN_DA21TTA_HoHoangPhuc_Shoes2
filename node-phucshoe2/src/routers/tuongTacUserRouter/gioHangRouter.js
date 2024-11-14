const express = require("express");
const router = express.Router();

const {
  getGioHang,
  createGioHang,

  deleteGioHang,
  addSingleProductToCart,
  removeSingleProductFromCart,
  getCartProductsByUser,
} = require("../../controllers/tuongTacUserController/gioHangController");

router.get("/:id_nguoidung", getGioHang);
router.post("/", createGioHang);
router.post("/add-single", addSingleProductToCart);
router.post("/remove-single", removeSingleProductFromCart);
router.delete("/:id", deleteGioHang);
router.get("/use/cart-user/:id", getCartProductsByUser);
module.exports = router;
