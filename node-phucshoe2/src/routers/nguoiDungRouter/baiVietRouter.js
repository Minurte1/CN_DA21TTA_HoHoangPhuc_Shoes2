const express = require("express");
const router = express.Router();
const connection = require("../db"); // Đảm bảo `connection` được import từ tệp kết nối cơ sở dữ liệu của bạn

// 1. Lấy danh sách bài viết
router.get("/baiviet", async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `BAI_VIET`");
    res
      .status(200)
      .json({ EM: "Lấy danh sách bài viết thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
});

// 2. Thêm mới bài viết
router.post("/baiviet", async (req, res) => {
  const {
    ID_NGUOI_DUNG,
    TIEU_DE,
    NGAY_TAO_BLOG,
    NGAY_CAP_NHAT_BAIVIET,
    NOI_DUNG_BAIVIET,
    TRANG_THAI_BAIVIET,
    HINH_ANH_BAIVIET,
  } = req.body;
  try {
    const [results] = await connection.execute(
      "INSERT INTO `BAI_VIET` (ID_NGUOI_DUNG, TIEU_DE, NGAY_TAO_BLOG, NGAY_CAP_NHAT_BAIVIET, NOI_DUNG_BAIVIET, TRANG_THAI_BAIVIET, HINH_ANH_BAIVIET) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        ID_NGUOI_DUNG,
        TIEU_DE,
        NGAY_TAO_BLOG,
        NGAY_CAP_NHAT_BAIVIET,
        NOI_DUNG_BAIVIET,
        TRANG_THAI_BAIVIET,
        HINH_ANH_BAIVIET,
      ]
    );
    res
      .status(201)
      .json({ EM: "Thêm bài viết thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
});

// 3. Cập nhật bài viết
router.put("/baiviet/:id", async (req, res) => {
  const { id } = req.params;
  const {
    TIEU_DE,
    NGAY_CAP_NHAT_BAIVIET,
    NOI_DUNG_BAIVIET,
    TRANG_THAI_BAIVIET,
    HINH_ANH_BAIVIET,
  } = req.body;
  try {
    const [results] = await connection.execute(
      "UPDATE `BAI_VIET` SET TIEU_DE = ?, NGAY_CAP_NHAT_BAIVIET = ?, NOI_DUNG_BAIVIET = ?, TRANG_THAI_BAIVIET = ?, HINH_ANH_BAIVIET = ? WHERE ID_BAI_VIET = ?",
      [
        TIEU_DE,
        NGAY_CAP_NHAT_BAIVIET,
        NOI_DUNG_BAIVIET,
        TRANG_THAI_BAIVIET,
        HINH_ANH_BAIVIET,
        id,
      ]
    );
    res
      .status(200)
      .json({ EM: "Cập nhật bài viết thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
});

// 4. Xóa bài viết
router.delete("/baiviet/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "DELETE FROM `BAI_VIET` WHERE ID_BAI_VIET = ?",
      [id]
    );
    res.status(200).json({ EM: "Xóa bài viết thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
});

module.exports = router;
