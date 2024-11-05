const express = require("express");
const router = express.Router();
const connection = require("../../../config/database");
const {
  getAllChatLieu,
} = require("../../../services/sanPhamServices/categorySanPhamServices/chatLieuServices");

// Lấy danh sách chất liệu
const getCHAT_LIEU = async (req, res) => {
  try {
    // Sắp xếp theo UPDATE_CHAT_LIEU, mới nhất lên đầu
    const [results] = await connection.execute(
      "SELECT * FROM `CHAT_LIEU` ORDER BY `UPDATE_CHAT_LIEU` DESC"
    );
    return res.status(200).json({
      EM: "Xem thông tin chất liệu thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting chat lieu:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo chất liệu mới

const createCHAT_LIEU = async (req, res) => {
  const { tenChatLieu, moTaChatLieu, trangThaiChatLieu } = req.body;
  console.log("createCHAT_LIEU", req.body);
  try {
    const createdChatLieu = new Date(); // Lấy ngày hiện tại
    await connection.execute(
      "INSERT INTO CHAT_LIEU (TEN_CHAT_LIEU_, CREATED_TEN_CHAT_LIEU_, UPDATE_CHAT_LIEU, TRANG_THAI_CHAT_LIEU,MO_TA_CHAT_LIEU) VALUES (?, ?, ?, ?)",
      [
        tenChatLieu,
        createdChatLieu,
        createdChatLieu,
        trangThaiChatLieu,
        moTaChatLieu,
      ] // TRANG_THAI_CHAT_LIEU mặc định là 1 (hoạt động)
    );

    const resultsChatLieu = await getAllChatLieu();

    return res.status(201).json({
      EM: "Thêm chất liệu thành công",
      EC: 1,
      DT: resultsChatLieu,
    });
  } catch (error) {
    console.error("Error creating chat lieu:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thêm chất liệu",
      EC: 0,
      DT: [],
    });
  }
};

// Cập nhật chất liệu

const updateCHAT_LIEU = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenChatLieu, moTaChatLieu, trangThaiChatLieu } =
      req.body.materialData;

    const [results] = await connection.execute(
      "SELECT * FROM CHAT_LIEU WHERE CHAT_LIEU_ID_ = ?",
      [id]
    );

    if (results.length > 0) {
      const updateChatLieu = new Date(); // Lấy ngày hiện tại
      await connection.execute(
        "UPDATE CHAT_LIEU SET TEN_CHAT_LIEU_ = ?, UPDATE_CHAT_LIEU = ?,TRANG_THAI_CHAT_LIEU = ?, MO_TA_CHAT_LIEU = ? WHERE CHAT_LIEU_ID_ = ?",
        [tenChatLieu, updateChatLieu, trangThaiChatLieu, moTaChatLieu, id]
      );
      return res.status(200).json({
        EM: "Cập nhật chất liệu thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy chất liệu",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error updating chat lieu:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật chất liệu",
      EC: 0,
      DT: [],
    });
  }
};

// Xóa chất liệu
const deleteCHAT_LIEU = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await connection.execute(
      "SELECT * FROM CHAT_LIEU WHERE CHAT_LIEU_ID_ = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM CHAT_LIEU WHERE CHAT_LIEU_ID_ = ?",
        [id]
      );
      return res.status(200).json({
        EM: "Xóa chất liệu thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy chất liệu để xóa",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error deleting chat lieu:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa chất liệu",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getCHAT_LIEU,
  createCHAT_LIEU,
  updateCHAT_LIEU,
  deleteCHAT_LIEU,
};
