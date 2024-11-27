const connection = require("../../config/database");

// Gửi tin nhắn
const sendMessage = async (req, res) => {
  const { ID_NGUOI_DUNG, NOI_DUNG_TINNHAN } = req.body;

  if (!ID_NGUOI_DUNG || !NOI_DUNG_TINNHAN) {
    return res.status(400).json({
      EM: "Thiếu thông tin người gửi hoặc nội dung tin nhắn",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Lấy tất cả người dùng có vai trò là admin (VAI_TRO = 1)
    const [admins] = await connection.execute(
      `SELECT ID_NGUOI_DUNG FROM NGUOI_DUNG WHERE VAI_TRO = 1`
    );

    if (admins.length === 0) {
      return res.status(404).json({
        EM: "Không tìm thấy người dùng có vai trò admin",
        EC: 0,
        DT: [],
      });
    }

    // Gửi tin nhắn đến tất cả các admin
    for (const admin of admins) {
      const ID_NGUOI_DUNG_2 = admin.ID_NGUOI_DUNG;

      // Kiểm tra xem đã có cuộc trò chuyện giữa người gửi và người nhận chưa
      let [conversation] = await connection.execute(
        `SELECT * FROM CONVERSATIONS 
         WHERE (ID_NGUOI_DUNG_1 = ? AND ID_NGUOI_DUNG_2 = ?) 
         OR (ID_NGUOI_DUNG_1 = ? AND ID_NGUOI_DUNG_2 = ?)`,
        [ID_NGUOI_DUNG, ID_NGUOI_DUNG_2, ID_NGUOI_DUNG_2, ID_NGUOI_DUNG]
      );

      // Nếu chưa có cuộc trò chuyện, tạo mới
      if (conversation.length === 0) {
        const [newConversation] = await connection.execute(
          `INSERT INTO CONVERSATIONS (ID_NGUOI_DUNG_1, ID_NGUOI_DUNG_2, NGAY_TAO)
           VALUES (?, ?, NOW())`,
          [ID_NGUOI_DUNG, ID_NGUOI_DUNG_2]
        );

        conversation = [{ ID_CONVERSATION: newConversation.insertId }];
      }

      const conversationId = conversation[0].ID_CONVERSATION;

      // Gửi tin nhắn vào cuộc trò chuyện
      const [messageResult] = await connection.execute(
        `INSERT INTO TIN_NHAN (ID_CONVERSATION, ID_NGUOI_DUNG, NOI_DUNG_TINNHAN, NGAY_TAO_TIN_NHAN)
         VALUES (?, ?, ?, NOW())`,
        [conversationId, ID_NGUOI_DUNG, NOI_DUNG_TINNHAN]
      );

      if (messageResult.affectedRows > 0) {
        req.io.emit("receive_message", {
          idTinNhan: messageResult.insertId,
          ID_NGUOI_DUNG,
          ID_NGUOI_DUNG_2,
          NOI_DUNG_TINNHAN,
          NGAY_TAO_TIN_NHAN: new Date().toISOString(),
        });
      }
    }

    return res.status(200).json({
      EM: "Gửi tin nhắn thành công đến tất cả admin",
      EC: 1,
      DT: [],
    });
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
  const { ID_NGUOI_DUNG } = req.body;

  if (!ID_NGUOI_DUNG) {
    return res.status(400).json({
      EM: "Thiếu thông tin người gửi",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Lấy tất cả người dùng có vai trò là admin (VAI_TRO = 1)
    const [admins] = await connection.execute(
      `SELECT ID_NGUOI_DUNG FROM NGUOI_DUNG WHERE VAI_TRO = 1`
    );

    if (admins.length === 0) {
      return res.status(404).json({
        EM: "Không tìm thấy người dùng có vai trò admin",
        EC: 0,
        DT: [],
      });
    }

    let allMessages = [];

    // Lấy tin nhắn với tất cả các admin
    for (const admin of admins) {
      const idNguoiNhan = admin.ID_NGUOI_DUNG;

      // Tìm cuộc trò chuyện giữa người gửi và người nhận
      const [conversation] = await connection.execute(
        `SELECT * FROM CONVERSATIONS 
         WHERE (ID_NGUOI_DUNG_1 = ? AND ID_NGUOI_DUNG_2 = ?) 
         OR (ID_NGUOI_DUNG_1 = ? AND ID_NGUOI_DUNG_2 = ?)`,
        [ID_NGUOI_DUNG, idNguoiNhan, idNguoiNhan, ID_NGUOI_DUNG]
      );

      if (conversation.length === 0) {
        continue; // Không có cuộc trò chuyện với admin này
      }

      const conversationId = conversation[0].ID_CONVERSATION;

      const [messages] = await connection.execute(
        `SELECT * FROM TIN_NHAN 
         WHERE ID_CONVERSATION = ?
         ORDER BY NGAY_TAO_TIN_NHAN ASC`,
        [conversationId]
      );

      allMessages = [...allMessages, ...messages];
    }

    return res.status(200).json({
      EM: "Lấy danh sách tin nhắn thành công",
      EC: 1,
      DT: allMessages,
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

// Gửi tin nhắn đến người dùng cụ thể (Admin)
const sendMessageToUser = async (req, res) => {
  const { idNguoiGui, idNguoiNhan, noiDungTinNhan } = req.body;

  if (!idNguoiGui || !idNguoiNhan || !noiDungTinNhan) {
    return res.status(400).json({
      EM: "Thiếu thông tin người gửi, người nhận hoặc nội dung tin nhắn",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Kiểm tra xem người gửi có phải là admin hay không
    const [sender] = await connection.execute(
      `SELECT VAI_TRO FROM NGUOI_DUNG WHERE ID_NGUOI_DUNG = ?`,
      [idNguoiGui]
    );
    console.log("sender", sender[0]);
    if (sender.length === 0 || sender[0].VAI_TRO !== "1") {
      return res.status(403).json({
        EM: "Bạn không có quyền gửi tin nhắn này",
        EC: 0,
        DT: [],
      });
    }

    // Kiểm tra xem đã có cuộc trò chuyện giữa người gửi và người nhận chưa
    let [conversation] = await connection.execute(
      `SELECT * FROM CONVERSATIONS 
       WHERE (ID_NGUOI_DUNG_1 = ? AND ID_NGUOI_DUNG_2 = ?) 
       OR (ID_NGUOI_DUNG_1 = ? AND ID_NGUOI_DUNG_2 = ?)`,
      [idNguoiGui, idNguoiNhan, idNguoiNhan, idNguoiGui]
    );

    // Nếu chưa có cuộc trò chuyện, tạo mới
    if (conversation.length === 0) {
      const [newConversation] = await connection.execute(
        `INSERT INTO CONVERSATIONS (ID_NGUOI_DUNG_1, ID_NGUOI_DUNG_2, NGAY_TAO)
         VALUES (?, ?, NOW())`,
        [idNguoiGui, idNguoiNhan]
      );

      conversation = [{ ID_CONVERSATION: newConversation.insertId }];
    }

    const conversationId = conversation[0].ID_CONVERSATION;

    // Gửi tin nhắn vào cuộc trò chuyện
    const [messageResult] = await connection.execute(
      `INSERT INTO TIN_NHAN (ID_CONVERSATION, ID_NGUOI_DUNG, NOI_DUNG_TINNHAN, NGAY_TAO_TIN_NHAN)
       VALUES (?, ?, ?, NOW())`,
      [conversationId, idNguoiGui, noiDungTinNhan]
    );
    const ID_NGUOI_DUNG = idNguoiGui;
    const ID_NGUOI_DUNG_2 = idNguoiNhan;
    const NOI_DUNG_TINNHAN = noiDungTinNhan;

    if (messageResult.affectedRows > 0) {
      req.io.emit("receive_message", {
        idTinNhan: messageResult.insertId,
        ID_NGUOI_DUNG,
        ID_NGUOI_DUNG_2,
        NOI_DUNG_TINNHAN,
        NGAY_TAO_TIN_NHAN: new Date().toISOString(),
      });
    }

    return res.status(200).json({
      EM: "Gửi tin nhắn thành công đến người dùng",
      EC: 1,
      DT: [],
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống khi gửi tin nhắn",
      EC: 0,
      DT: [],
    });
  }
};
// Lấy danh sách tin nhắn với người dùng cụ thể (Admin)
const getMessagesFromUser = async (req, res) => {
  const { idNguoiGui, idNguoiNhan } = req.body;

  if (!idNguoiGui || !idNguoiNhan) {
    return res.status(400).json({
      EM: "Thiếu thông tin người gửi hoặc người nhận",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Kiểm tra xem người gửi có phải là admin hay không
    const [sender] = await connection.execute(
      `SELECT VAI_TRO FROM NGUOI_DUNG WHERE ID_NGUOI_DUNG = ?`,
      [idNguoiGui]
    );

    if (sender.length === 0 || sender[0].VAI_TRO !== 1) {
      return res.status(403).json({
        EM: "Bạn không có quyền xem tin nhắn này",
        EC: 0,
        DT: [],
      });
    }

    // Tìm cuộc trò chuyện giữa admin và người dùng cụ thể
    const [conversation] = await connection.execute(
      `SELECT * FROM CONVERSATIONS 
       WHERE (ID_NGUOI_DUNG_1 = ? AND ID_NGUOI_DUNG_2 = ?) 
       OR (ID_NGUOI_DUNG_1 = ? AND ID_NGUOI_DUNG_2 = ?)`,
      [idNguoiGui, idNguoiNhan, idNguoiNhan, idNguoiGui]
    );

    if (conversation.length === 0) {
      return res.status(404).json({
        EM: "Không tìm thấy cuộc trò chuyện với người dùng này",
        EC: 0,
        DT: [],
      });
    }

    const conversationId = conversation[0].ID_CONVERSATION;

    const [messages] = await connection.execute(
      `SELECT * FROM TIN_NHAN 
       WHERE ID_CONVERSATION = ? 
       ORDER BY NGAY_TAO_TIN_NHAN ASC`,
      [conversationId]
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

module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
  getMessagesFromUser,
  sendMessageToUser,
};
