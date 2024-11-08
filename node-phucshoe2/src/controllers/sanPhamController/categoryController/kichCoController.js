const express = require("express");
const router = express.Router();
const connection = require("../../../config/database");

// Lấy danh sách kích cỡ
const getKICH_CO = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `KICH_CO`");
    return res.status(200).json({
      EM: "Xem thông tin kích cỡ thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting kich co:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};
const getKICH_CO_Use = async (req, res) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `KICH_CO` where TRANG_THAI_KICH_CO = 1"
    );
    return res.status(200).json({
      EM: "Xem thông tin kích cỡ thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting kich co:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo kích cỡ mới
const createKICH_CO = async (req, res) => {
  try {
    const { kichCo } = req.body;
    const createdKichCo = new Date(); // Lấy ngày hiện tại
    const [results] = await connection.execute(
      "INSERT INTO KICH_CO (KICH_CO, CREATED_KICH_CO, UPDATE_KICH_CO, TRANG_THAI_KICH_CO) VALUES (?, ?, ?, ?)",
      [kichCo, createdKichCo, createdKichCo, 1]
    );
    return res.status(200).json({
      EM: "Thêm kích cỡ thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error creating kich co:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thêm kích cỡ",
      EC: 0,
      DT: [],
    });
  }
};

// Cập nhật kích cỡ
const updateKICH_CO = async (req, res) => {
  const { id } = req.params;
  const { kichCo } = req.body;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM KICH_CO WHERE ID_KICH_CO = ?",
      [id]
    );

    if (results.length > 0) {
      const updateKichCo = new Date(); // Lấy ngày hiện tại
      await connection.execute(
        "UPDATE KICH_CO SET KICH_CO = ?, UPDATE_KICH_CO = ? WHERE ID_KICH_CO = ?",
        [kichCo, updateKichCo, id]
      );
      return res.status(200).json({
        EM: "Cập nhật kích cỡ thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(200).json({
        EM: "Không tìm thấy kích cỡ",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error updating kich co:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật kích cỡ",
      EC: 0,
      DT: [],
    });
  }
};

// Xóa kích cỡ
const deleteKICH_CO = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM KICH_CO WHERE ID_KICH_CO = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute("DELETE FROM KICH_CO WHERE ID_KICH_CO = ?", [
        id,
      ]);
      return res.status(200).json({
        EM: "Xóa kích cỡ thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(500).json({
        EM: "Không tìm thấy kích cỡ để xóa",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error deleting kich co:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa kích cỡ",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getKICH_CO,
  createKICH_CO,
  updateKICH_CO,
  deleteKICH_CO,
  getKICH_CO_Use,
};
