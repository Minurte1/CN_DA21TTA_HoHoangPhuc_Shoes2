const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");

// Lấy danh sách kích cỡ
const getCO_KICH_CO = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `co_kich_co`");
    return res.status(200).json({
      EM: "Xem thông tin kích cỡ thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting co kich co:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo kích cỡ mới
const createCO_KICH_CO = async (req, res) => {
  const { idSanPham, idKichCo } = req.body;
  try {
    const [results] = await connection.execute(
      "INSERT INTO co_kich_co (ID_SAN_PHAM, ID_KICH_CO) VALUES (?, ?)",
      [idSanPham, idKichCo]
    );
    return {
      EM: "Thêm kích cỡ thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating co kich co:", error);
    throw error;
  }
};

// Cập nhật kích cỡ
const updateCO_KICH_CO = async (req, res) => {
  const { id } = req.params;
  const { idSanPham, idKichCo } = req.body;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM co_kich_co WHERE ID_CO_KICH_CO = ?",
      [idCoKichCo]
    );

    if (results.length > 0) {
      await connection.execute(
        "UPDATE co_kich_co SET ID_SAN_PHAM = ?, ID_KICH_CO = ? WHERE ID_CO_KICH_CO = ?",
        [idSanPham, idKichCo, idCoKichCo]
      );
      return {
        EM: "Cập nhật kích cỡ thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy kích cỡ",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error updating co kich co:", error);
    return {
      EM: "Có lỗi xảy ra khi cập nhật kích cỡ",
      EC: 0,
      DT: [],
    };
  }
};

// Xóa kích cỡ
const deleteCO_KICH_CO = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM co_kich_co WHERE ID_CO_KICH_CO = ?",
      [idCoKichCo]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM co_kich_co WHERE ID_CO_KICH_CO = ?",
        [idCoKichCo]
      );
      return {
        EM: "Xóa kích cỡ thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy kích cỡ để xóa",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting co kich co:", error);
    return {
      EM: "Có lỗi xảy ra khi xóa kích cỡ",
      EC: 0,
      DT: [],
    };
  }
};

module.exports = {
  getCO_KICH_CO,
  createCO_KICH_CO,
  updateCO_KICH_CO,
  deleteCO_KICH_CO,
};
