const connection = require("../../config/database");

// Gửi tin nhắn
const sendMessage = async (req, res) => {
  const { idNguoiGui, idNguoiNhan, noiDungTinNhan } = req.body;

  if (!idNguoiGui || !idNguoiNhan || !noiDungTinNhan) {
    return res.status(400).json({
      EM: "Thiếu thông tin người gửi, người nhận hoặc nội dung tin nhắn",
      EC: 0,
      DT: [],
    });
  }

  try {
    const [result] = await connection.execute(
      `INSERT INTO TIN_NHAN (ID_NGUOI_GUI, ID_NGUOI_NHAN, NOI_DUNG_TINNHAN, NGAY_TAO_TIN_NHAN)
         VALUES (?, ?, ?, NOW())`,
      [idNguoiGui, idNguoiNhan, noiDungTinNhan]
    );

    if (result.affectedRows > 0) {
      // Emit tin nhắn tới client
      req.io.emit("new_message", {
        idTinNhan: result.insertId,
        idNguoiGui,
        idNguoiNhan,
        noiDungTinNhan,
        ngayTaoTinNhan: new Date().toISOString(),
      });

      return res.status(200).json({
        EM: "Gửi tin nhắn thành công",
        EC: 1,
        DT: {
          idTinNhan: result.insertId,
          idNguoiGui,
          idNguoiNhan,
          noiDungTinNhan,
          ngayTaoTinNhan: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống khi gửi tin nhắn",
      EC: 0,
      DT: [],
    });
  }
};

// Lấy danh sách tin nhắn
const getMessages = async (req, res) => {
  const { idNguoiGui, idNguoiNhan } = req.query;

  if (!idNguoiGui || !idNguoiNhan) {
    return res.status(400).json({
      EM: "Thiếu thông tin người gửi hoặc người nhận",
      EC: 0,
      DT: [],
    });
  }

  try {
    const [messages] = await connection.execute(
      `SELECT * FROM TIN_NHAN 
         WHERE (ID_NGUOI_GUI = ? AND ID_NGUOI_NHAN = ?) 
         OR (ID_NGUOI_GUI = ? AND ID_NGUOI_NHAN = ?)
         ORDER BY NGAY_TAO_TIN_NHAN ASC`,
      [idNguoiGui, idNguoiNhan, idNguoiNhan, idNguoiGui]
    );

    return res.status(200).json({
      EM: "Lấy danh sách tin nhắn thành công",
      EC: 1,
      DT: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống khi lấy danh sách tin nhắn",
      EC: 0,
      DT: [],
    });
  }
};

// Xóa tin nhắn
const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await connection.execute(
      `DELETE FROM TIN_NHAN WHERE ID_TIN_NHAN = ?`,
      [id]
    );

    if (result.affectedRows > 0) {
      return res.status(200).json({
        EM: "Xóa tin nhắn thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy tin nhắn",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống khi xóa tin nhắn",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
};
