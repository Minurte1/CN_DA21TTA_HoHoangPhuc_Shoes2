const connection = require("../../../config/database");

const getAllChatLieu = async () => {
  try {
    const [results] = await connection.execute("SELECT * FROM `CHAT_LIEU`");
    return {
      EM: "Xem thông tin chất liệu thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error getting chat lieu:", error);
    return {
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    };
  }
};

module.exports = {
  getAllChatLieu,
};
