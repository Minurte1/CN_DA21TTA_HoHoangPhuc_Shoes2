const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");

// Lấy danh sách thương hiệu
const getTHUONG_HIEU = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `thuong_hieu`");
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
const createTHUONG_HIEU = async (tenThuongHieu) => {
  try {
    const createdThuongHieu = new Date(); // Lấy ngày hiện tại
    const [results] = await connection.execute(
      "INSERT INTO thuong_hieu (TEN_THUONG_HIEU, CREATE_THUONG_HIEU, UPDATE_THUONG_HIEU, TRANG_THAI_THUONG_HIEU) VALUES (?, ?, ?, ?)",
      [tenThuongHieu, createdThuongHieu, createdThuongHieu, 1] // TRANG_THAI_THUONG_HIEU mặc định là 1 (hoạt động)
    );
    return {
      EM: "Thêm thương hiệu thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating thuong hieu:", error);
    throw error;
  }
};

// Cập nhật thương hiệu
const updateTHUONG_HIEU = async (idThuongHieu, tenThuongHieu) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM thuong_hieu WHERE ID_THUONG_HIEU = ?",
      [idThuongHieu]
    );

    if (results.length > 0) {
      const updateThuongHieu = new Date(); // Lấy ngày hiện tại
      await connection.execute(
        "UPDATE thuong_hieu SET TEN_THUONG_HIEU = ?, UPDATE_THUONG_HIEU = ? WHERE ID_THUONG_HIEU = ?",
        [tenThuongHieu, updateThuongHieu, idThuongHieu]
      );
      return {
        EM: "Cập nhật thương hiệu thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy thương hiệu",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error updating thuong hieu:", error);
    return {
      EM: "Có lỗi xảy ra khi cập nhật thương hiệu",
      EC: 0,
      DT: [],
    };
  }
};

// Xóa thương hiệu
const deleteTHUONG_HIEU = async (idThuongHieu) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM thuong_hieu WHERE ID_THUONG_HIEU = ?",
      [idThuongHieu]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM thuong_hieu WHERE ID_THUONG_HIEU = ?",
        [idThuongHieu]
      );
      return {
        EM: "Xóa thương hiệu thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy thương hiệu để xóa",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting thuong hieu:", error);
    return {
      EM: "Có lỗi xảy ra khi xóa thương hiệu",
      EC: 0,
      DT: [],
    };
  }
};

// Định nghĩa các route
router.get("/thuong-hieu", getTHUONG_HIEU);
router.post("/thuong-hieu", async (req, res) => {
  const { tenThuongHieu } = req.body;
  const result = await createTHUONG_HIEU(tenThuongHieu);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.put("/thuong-hieu/:id", async (req, res) => {
  const { id } = req.params;
  const { tenThuongHieu } = req.body;
  const result = await updateTHUONG_HIEU(id, tenThuongHieu);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.delete("/thuong-hieu/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deleteTHUONG_HIEU(id);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});

module.exports = router;
