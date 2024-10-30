const express = require("express");
const router = express.Router();
const connection = require("../db"); // Đảm bảo rằng kết nối cơ sở dữ liệu được import đúng

// 1. Lấy danh sách giỏ hàng của người dùng
router.get("/giohang/:id_nguoidung", async (req, res) => {
  const { id_nguoidung } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `GIO_HANG` WHERE ID_NGUOI_DUNG = ?",
      [id_nguoidung]
    );
    res.status(200).json({ EM: "Lấy giỏ hàng thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
});

// 2. Thêm sản phẩm vào giỏ hàng
router.post("/giohang", async (req, res) => {
  const {
    ID_SAN_PHAM,
    ID_NGUOI_DUNG,
    SO_LUONG_GIOHANG,
    NGAY_CAP_NHAT_GIOHANG,
  } = req.body;
  try {
    const [results] = await connection.execute(
      "INSERT INTO `GIO_HANG` (ID_SAN_PHAM, ID_NGUOI_DUNG, SO_LUONG_GIOHANG, NGAY_CAP_NHAT_GIOHANG) VALUES (?, ?, ?, ?)",
      [ID_SAN_PHAM, ID_NGUOI_DUNG, SO_LUONG_GIOHANG, NGAY_CAP_NHAT_GIOHANG]
    );
    res
      .status(201)
      .json({ EM: "Thêm vào giỏ hàng thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
});

// 3. Cập nhật số lượng sản phẩm trong giỏ hàng
router.put("/giohang/:id", async (req, res) => {
  const { id } = req.params;
  const { SO_LUONG_GIOHANG, NGAY_CAP_NHAT_GIOHANG } = req.body;
  try {
    const [results] = await connection.execute(
      "UPDATE `GIO_HANG` SET SO_LUONG_GIOHANG = ?, NGAY_CAP_NHAT_GIOHANG = ? WHERE ID_GIO_HANG = ?",
      [SO_LUONG_GIOHANG, NGAY_CAP_NHAT_GIOHANG, id]
    );
    res
      .status(200)
      .json({ EM: "Cập nhật giỏ hàng thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
});

// 4. Xóa sản phẩm khỏi giỏ hàng
router.delete("/giohang/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "DELETE FROM `GIO_HANG` WHERE ID_GIO_HANG = ?",
      [id]
    );
    res
      .status(200)
      .json({
        EM: "Xóa sản phẩm khỏi giỏ hàng thành công",
        EC: 1,
        DT: results,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
});

module.exports = router;
