const express = require("express");
const router = express.Router();
const connection = require("../db"); // Đảm bảo `connection` được import từ tệp kết nối cơ sở dữ liệu của bạn

// 1. Lấy danh sách bình luận
router.get("/binhluan", async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `BINH_LUAN`");
    res
      .status(200)
      .json({ EM: "Lấy danh sách bình luận thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
});

// 2. Thêm mới bình luận
router.post("/binhluan", async (req, res) => {
  const {
    ID_SAN_PHAM,
    ID_NGUOI_DUNG,
    DANH_GIA,
    NGAY_TAO_BAI_VIET,
    NOI_DUNG_CMT,
  } = req.body;
  try {
    const [results] = await connection.execute(
      "INSERT INTO `BINH_LUAN` (ID_SAN_PHAM, ID_NGUOI_DUNG, DANH_GIA, NGAY_TAO_BAI_VIET, NOI_DUNG_CMT) VALUES (?, ?, ?, ?, ?)",
      [ID_SAN_PHAM, ID_NGUOI_DUNG, DANH_GIA, NGAY_TAO_BAI_VIET, NOI_DUNG_CMT]
    );
    res
      .status(201)
      .json({ EM: "Thêm bình luận thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
});

// 3. Cập nhật bình luận
router.put("/binhluan/:id", async (req, res) => {
  const { id } = req.params;
  const { DANH_GIA, NOI_DUNG_CMT, NGAY_TAO_BAI_VIET } = req.body;
  try {
    const [results] = await connection.execute(
      "UPDATE `BINH_LUAN` SET DANH_GIA = ?, NOI_DUNG_CMT = ?, NGAY_TAO_BAI_VIET = ? WHERE ID_BINH_LUAN = ?",
      [DANH_GIA, NOI_DUNG_CMT, NGAY_TAO_BAI_VIET, id]
    );
    res
      .status(200)
      .json({ EM: "Cập nhật bình luận thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
});

// 4. Xóa bình luận
router.delete("/binhluan/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "DELETE FROM `BINH_LUAN` WHERE ID_BINH_LUAN = ?",
      [id]
    );
    res
      .status(200)
      .json({ EM: "Xóa bình luận thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
});

module.exports = router;
