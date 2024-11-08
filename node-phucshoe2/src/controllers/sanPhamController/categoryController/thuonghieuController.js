const connection = require("../../../config/database");

// Lấy danh sách thương hiệu
const getTHUONG_HIEU = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `THUONG_HIEU`");
    return res.status(200).json({
      EM: "Xem thông tin thương hiệu thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting thuong hieu:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};
const getTHUONG_HIEU_Use = async (req, res) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `THUONG_HIEU` WHERE `TRANG_THAI_THUONG_HIEU` = 1"
    );
    return res.status(200).json({
      EM: "Xem thông tin thương hiệu thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting thuong hieu:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo thương hiệu mới
const createTHUONG_HIEU = async (req, res) => {
  const { tenThuongHieu } = req.body.brandData;
  try {
    const createdThuongHieu = new Date();
    const [results] = await connection.execute(
      "INSERT INTO THUONG_HIEU (TEN_THUONG_HIEU, CREATE_THUONG_HIEU, UPDATE_THUONG_HIEU, TRANG_THAI_THUONG_HIEU) VALUES (?, ?, ?, ?)",
      [tenThuongHieu, createdThuongHieu, createdThuongHieu, 1]
    );
    return res.status(200).json({
      EM: "Thêm thương hiệu thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error creating thuong hieu:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thêm thương hiệu",
      EC: 0,
      DT: [],
    });
  }
};

// Cập nhật thương hiệu
const updateTHUONG_HIEU = async (req, res) => {
  const { id } = req.params;
  const { tenThuongHieu } = req.body.brandData;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM THUONG_HIEU WHERE ID_THUONG_HIEU = ?",
      [id]
    );

    if (results.length > 0) {
      const updateThuongHieu = new Date();
      await connection.execute(
        "UPDATE THUONG_HIEU SET TEN_THUONG_HIEU = ?, UPDATE_THUONG_HIEU = ? WHERE ID_THUONG_HIEU = ?",
        [tenThuongHieu, updateThuongHieu, id]
      );
      return res.status(200).json({
        EM: "Cập nhật thương hiệu thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy thương hiệu",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error updating thuong hieu:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật thương hiệu",
      EC: 0,
      DT: [],
    });
  }
};

// Xóa thương hiệu
const deleteTHUONG_HIEU = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM THUONG_HIEU WHERE ID_THUONG_HIEU = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM THUONG_HIEU WHERE ID_THUONG_HIEU = ?",
        [id]
      );
      return res.status(200).json({
        EM: "Xóa thương hiệu thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy thương hiệu để xóa",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error deleting thuong hieu:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa thương hiệu",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getTHUONG_HIEU,
  createTHUONG_HIEU,
  updateTHUONG_HIEU,
  deleteTHUONG_HIEU,
  getTHUONG_HIEU_Use,
};
