const connection = require("../../../config/database");

// Lấy danh sách phong cách
const getPHONG_CACH = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `PHONG_CACH`");
    return res.status(200).json({
      EM: "Xem thông tin phong cách thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting phong cach:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo phong cách mới
const createPHONG_CACH = async (req, res) => {
  try {
    const { tenPhuongCach } = req.body;
    const createdPhongCach = new Date(); // Lấy ngày hiện tại
    const [results] = await connection.execute(
      "INSERT INTO PHONG_CACH (TEN_PHONG_CACH, CREATED_PHONG_CACH, UPDATE_PHONG_CACH, TRANG_THAI_PHONG_CACH) VALUES (?, ?, ?, ?)",
      [tenPhuongCach, createdPhongCach, createdPhongCach, 1] // TRANG_THAI_PHONG_CACH mặc định là 1 (hoạt động)
    );
    return res.status(201).json({
      EM: "Thêm phong cách thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error creating phong cach:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi tạo phong cách",
      EC: 0,
      DT: [],
    });
  }
};

// Cập nhật phong cách
const updatePHONG_CACH = async (req, res) => {
  const { id } = req.params;
  const { tenPhuongCach } = req.body;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM PHONG_CACH WHERE ID_PHUONG_CACH = ?",
      [id]
    );

    if (results.length > 0) {
      const updatePhongCach = new Date(); // Lấy ngày hiện tại
      await connection.execute(
        "UPDATE PHONG_CACH SET TEN_PHONG_CACH = ?, UPDATE_PHONG_CACH = ? WHERE ID_PHUONG_CACH = ?",
        [tenPhuongCach, updatePhongCach, id]
      );
      return res.status(200).json({
        EM: "Cập nhật phong cách thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy phong cách",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error updating phong cach:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật phong cách",
      EC: 0,
      DT: [],
    });
  }
};

// Xóa phong cách
const deletePHONG_CACH = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM PHONG_CACH WHERE ID_PHUONG_CACH = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM PHONG_CACH WHERE ID_PHUONG_CACH = ?",
        [id]
      );
      return res.status(200).json({
        EM: "Xóa phong cách thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy phong cách để xóa",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error deleting phong cach:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa phong cách",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getPHONG_CACH,
  createPHONG_CACH,
  updatePHONG_CACH,
  deletePHONG_CACH,
};
