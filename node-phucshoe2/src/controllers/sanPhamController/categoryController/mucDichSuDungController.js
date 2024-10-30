const connection = require("../../../config/database");
// Lấy danh sách mục đích sử dụng
const getMUC_DICH_SU_DUNG = async (req, res) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `muc_dich_su_dung`"
    );
    return res.status(200).json({
      EM: "Xem thông tin mục đích sử dụng thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting muc dich su dung:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo mục đích sử dụng mới
const createMUC_DICH_SU_DUNG = async (req, res) => {
  const { tenMucDichSuDung } = req.body;
  try {
    const createMucDichSuDung = new Date(); // Lấy ngày hiện tại
    const [results] = await connection.execute(
      "INSERT INTO muc_dich_su_dung (TEN_MUC_DICH_SU_DUNG, CREATE_MUC_DICH_SU_DUNG, UPDATE_MUC_DICH_SU_DUNG, TRANG_THAI_MUC_DICH_SU_DUNG) VALUES (?, ?, ?, ?)",
      [tenMucDichSuDung, createMucDichSuDung, createMucDichSuDung, 1] // TRANG_THAI_MUC_DICH_SU_DUNG mặc định là 1 (hoạt động)
    );
    return {
      EM: "Thêm mục đích sử dụng thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating muc dich su dung:", error);
    throw error;
  }
};

// Cập nhật mục đích sử dụng
const updateMUC_DICH_SU_DUNG = async (req, res) => {
  const { id } = req.params;
  const { tenMucDichSuDung } = req.body;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM muc_dich_su_dung WHERE ID_MUC_DICH_SU_DUNG = ?",
      [id]
    );

    if (results.length > 0) {
      const updateMucDichSuDung = new Date(); // Lấy ngày hiện tại
      await connection.execute(
        "UPDATE muc_dich_su_dung SET TEN_MUC_DICH_SU_DUNG = ?, UPDATE_MUC_DICH_SU_DUNG = ? WHERE ID_MUC_DICH_SU_DUNG = ?",
        [tenMucDichSuDung, updateMucDichSuDung, idMucDichSuDung]
      );
      return {
        EM: "Cập nhật mục đích sử dụng thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy mục đích sử dụng",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error updating muc dich su dung:", error);
    return {
      EM: "Có lỗi xảy ra khi cập nhật mục đích sử dụng",
      EC: 0,
      DT: [],
    };
  }
};

// Xóa mục đích sử dụng
const deleteMUC_DICH_SU_DUNG = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await connection.execute(
      "SELECT * FROM muc_dich_su_dung WHERE ID_MUC_DICH_SU_DUNG = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM muc_dich_su_dung WHERE ID_MUC_DICH_SU_DUNG = ?",
        [id]
      );
      return {
        EM: "Xóa mục đích sử dụng thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy mục đích sử dụng để xóa",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting muc dich su dung:", error);
    return {
      EM: "Có lỗi xảy ra khi xóa mục đích sử dụng",
      EC: 0,
      DT: [],
    };
  }
};

module.exports = {
  getMUC_DICH_SU_DUNG,
  createMUC_DICH_SU_DUNG,
  updateMUC_DICH_SU_DUNG,
  deleteMUC_DICH_SU_DUNG,
};
