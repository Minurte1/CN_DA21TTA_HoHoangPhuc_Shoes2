const express = require("express");
const router = express.Router();
const connection = require("../../../config/database");

// Lấy danh sách giới tính
const getGIOI_TINH = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `GIOI_TINH`");
    return res.status(200).json({
      EM: "Xem thông tin giới tính thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting gioi tinh:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo giới tính mới
const createGIOI_TINH = async (req, res) => {
  try {
    const { tenGioiTinh } = req.body;
    const createdGioiTinh = new Date(); // Lấy ngày hiện tại
    const [results] = await connection.execute(
      "INSERT INTO GIOI_TINH (TEN_GIOI_TINH, CREATED_GIOI_TINH, UPDATE_GIOI_TINH, TRANG_THAI_GIOI_TINH) VALUES (?, ?, ?, ?)",
      [tenGioiTinh, createdGioiTinh, createdGioiTinh, 1]
    );
    return res.status(200).json({
      EM: "Thêm giới tính thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error creating gioi tinh:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Cập nhật giới tính
const updateGIOI_TINH = async (req, res) => {
  const { id } = req.params;
  const { tenGioiTinh } = req.body;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM GIOI_TINH WHERE GIOI_TINH_ID = ?",
      [id]
    );

    if (results.length > 0) {
      const updateGioiTinh = new Date(); // Lấy ngày hiện tại
      await connection.execute(
        "UPDATE GIOI_TINH SET TEN_GIOI_TINH = ?, UPDATE_GIOI_TINH = ? WHERE GIOI_TINH_ID = ?",
        [tenGioiTinh, updateGioiTinh, id]
      );
      return res.status(200).json({
        EM: "Cập nhật giới tính thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(200).json({
        EM: "Không tìm thấy giới tính",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error updating gioi tinh:", error);
    return res.status(200).json({
      EM: "Có lỗi xảy ra khi cập nhật giới tính",
      EC: 0,
      DT: [],
    });
  }
};

// Xóa giới tính
const deleteGIOI_TINH = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM GIOI_TINH WHERE GIOI_TINH_ID = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute("DELETE FROM GIOI_TINH WHERE GIOI_TINH_ID = ?", [
        id,
      ]);
      return res.status(200).json({
        EM: "Xóa giới tính thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(500).json({
        EM: "Không tìm thấy giới tính để xóa",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error deleting gioi tinh:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa giới tính",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getGIOI_TINH,
  createGIOI_TINH,
  updateGIOI_TINH,
  deleteGIOI_TINH,
};
