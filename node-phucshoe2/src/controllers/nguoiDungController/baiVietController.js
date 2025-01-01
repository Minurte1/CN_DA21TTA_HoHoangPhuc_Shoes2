const connection = require("../../config/database"); // Đảm bảo `connection` được import từ tệp kết nối cơ sở dữ liệu của bạn
const fs = require("fs");
const path = require("path");

const getBaiViet = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `ID_BAI_VIET`");
    res
      .status(200)
      .json({ EM: "Lấy danh sách bài viết thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};
const getBaiVietUse = async (req, res) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `ID_BAI_VIET` WHERE TRANG_THAI_BAIVIET = 'Đang hoạt động'"
    );
    res
      .status(200)
      .json({ EM: "Lấy bài viết theo ID thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};
const getBaiVietUseById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `ID_BAI_VIET` WHERE TRANG_THAI_BAIVIET = 'Đang hoạt động' AND ID_BAI_VIET = ? ",
      [id]
    );
    res
      .status(200)
      .json({ EM: "Lấy danh sách bài viết thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

const createBaiViet = async (req, res) => {
  const {
    ID_NGUOI_DUNG,
    TIEU_DE,

    NOI_DUNG_BAIVIET,
    NOI_DUNG_TIEU_DE,
  } = req.body;
  console.log("req.body", req.body);
  const HINH_ANH_BAIVIET = req.file ? path.basename(req.file.path) : null;
  const TRANG_THAI_BAIVIET = "Đang hoạt động";
  try {
    const [results] = await connection.execute(
      "INSERT INTO `ID_BAI_VIET` (ID_NGUOI_DUNG, TIEU_DE, NGAY_TAO_BLOG, NGAY_CAP_NHAT_BAIVIET, NOI_DUNG_BAIVIET, TRANG_THAI_BAIVIET,HINH_ANH_BAIVIET,NOI_DUNG_TIEU_DE) VALUES (?, ?, NOW(), NOW(), ?, ?,?,?)",
      [
        ID_NGUOI_DUNG,
        TIEU_DE,
        NOI_DUNG_BAIVIET,
        TRANG_THAI_BAIVIET,
        HINH_ANH_BAIVIET,
        NOI_DUNG_TIEU_DE,
      ]
    );
    res
      .status(201)
      .json({ EM: "Thêm bài viết thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

const updateBaiViet = async (req, res) => {
  const { id } = req.params;
  const {
    TIEU_DE,
    NGAY_CAP_NHAT_BAIVIET,
    NOI_DUNG_BAIVIET,
    TRANG_THAI_BAIVIET,
    HINH_ANH_BAIVIET,
  } = req.body;
  console.log("req.body", req.body);
  console.log("req.params", req.params);
  try {
    const [results] = await connection.execute(
      "UPDATE `ID_BAI_VIET` SET TIEU_DE = ?, NGAY_CAP_NHAT_BAIVIET = ?, NOI_DUNG_BAIVIET = ?, TRANG_THAI_BAIVIET = ?, HINH_ANH_BAIVIET = ? WHERE ID_BAI_VIET = ?",
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
};

const deleteBaiViet = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "DELETE FROM `ID_BAI_VIET` WHERE ID_BAI_VIET = ?",
      [id]
    );
    res.status(200).json({ EM: "Xóa bài viết thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

module.exports = {
  getBaiViet,
  createBaiViet,
  updateBaiViet,
  deleteBaiViet,
  getBaiVietUseById,
  getBaiVietUse,
};
