const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");

// Lấy danh sách chất liệu
const getCHAT_LIEU = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `chat_lieu`");
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
const createCHAT_LIEU = async (tenChatLieu) => {
  try {
    const createdChatLieu = new Date(); // Lấy ngày hiện tại
    const [results] = await connection.execute(
      "INSERT INTO chat_lieu (TEN_CHAT_LIEU, CREATED_TEN_CHAT_LIEU, UPDATE_CHAT_LIEU, TRANG_THAI_CHAT_LIEU) VALUES (?, ?, ?, ?)",
      [tenChatLieu, createdChatLieu, createdChatLieu, 1] // TRANG_THAI_CHAT_LIEU mặc định là 1 (hoạt động)
    );
    return {
      EM: "Thêm chất liệu thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating chat lieu:", error);
    throw error;
  }
};

// Cập nhật chất liệu
const updateCHAT_LIEU = async (idChatLieu, tenChatLieu) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM chat_lieu WHERE ID_CHAT_LIEU = ?",
      [idChatLieu]
    );

    if (results.length > 0) {
      const updateChatLieu = new Date(); // Lấy ngày hiện tại
      await connection.execute(
        "UPDATE chat_lieu SET TEN_CHAT_LIEU = ?, UPDATE_CHAT_LIEU = ? WHERE ID_CHAT_LIEU = ?",
        [tenChatLieu, updateChatLieu, idChatLieu]
      );
      return {
        EM: "Cập nhật chất liệu thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy chất liệu",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error updating chat lieu:", error);
    return {
      EM: "Có lỗi xảy ra khi cập nhật chất liệu",
      EC: 0,
      DT: [],
    };
  }
};

// Xóa chất liệu
const deleteCHAT_LIEU = async (idChatLieu) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM chat_lieu WHERE ID_CHAT_LIEU = ?",
      [idChatLieu]
    );

    if (results.length > 0) {
      await connection.execute("DELETE FROM chat_lieu WHERE ID_CHAT_LIEU = ?", [
        idChatLieu,
      ]);
      return {
        EM: "Xóa chất liệu thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy chất liệu để xóa",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting chat lieu:", error);
    return {
      EM: "Có lỗi xảy ra khi xóa chất liệu",
      EC: 0,
      DT: [],
    };
  }
};

// Định nghĩa các route
router.get("/chat-lieu", getCHAT_LIEU);
router.post("/chat-lieu", async (req, res) => {
  const { tenChatLieu } = req.body;
  const result = await createCHAT_LIEU(tenChatLieu);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.put("/chat-lieu/:id", async (req, res) => {
  const { id } = req.params;
  const { tenChatLieu } = req.body;
  const result = await updateCHAT_LIEU(id, tenChatLieu);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.delete("/chat-lieu/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deleteCHAT_LIEU(id);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});

module.exports = router;
