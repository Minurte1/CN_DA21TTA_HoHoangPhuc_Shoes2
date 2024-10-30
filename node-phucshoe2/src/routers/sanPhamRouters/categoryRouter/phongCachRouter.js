const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");

// Lấy danh sách phong cách
const getPHONG_CACH = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `phong_cach`");
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
const createPHONG_CACH = async (tenPhuongCach) => {
  try {
    const createdPhongCach = new Date(); // Lấy ngày hiện tại
    const [results] = await connection.execute(
      "INSERT INTO phong_cach (TEN_PHUONG_CACH, CREATED_PHONG_CACH, UPDATE_PHONG_CACH, TRANG_THAI_PHONG_CACH) VALUES (?, ?, ?, ?)",
      [tenPhuongCach, createdPhongCach, createdPhongCach, 1] // TRANG_THAI_PHONG_CACH mặc định là 1 (hoạt động)
    );
    return {
      EM: "Thêm phong cách thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating phong cach:", error);
    throw error;
  }
};

// Cập nhật phong cách
const updatePHONG_CACH = async (idPhongCach, tenPhuongCach) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM phong_cach WHERE ID_PHONG_CACH = ?",
      [idPhongCach]
    );

    if (results.length > 0) {
      const updatePhongCach = new Date(); // Lấy ngày hiện tại
      await connection.execute(
        "UPDATE phong_cach SET TEN_PHUONG_CACH = ?, UPDATE_PHONG_CACH = ? WHERE ID_PHONG_CACH = ?",
        [tenPhuongCach, updatePhongCach, idPhongCach]
      );
      return {
        EM: "Cập nhật phong cách thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy phong cách",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error updating phong cach:", error);
    return {
      EM: "Có lỗi xảy ra khi cập nhật phong cách",
      EC: 0,
      DT: [],
    };
  }
};

// Xóa phong cách
const deletePHONG_CACH = async (idPhongCach) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM phong_cach WHERE ID_PHONG_CACH = ?",
      [idPhongCach]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM phong_cach WHERE ID_PHONG_CACH = ?",
        [idPhongCach]
      );
      return {
        EM: "Xóa phong cách thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy phong cách để xóa",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting phong cach:", error);
    return {
      EM: "Có lỗi xảy ra khi xóa phong cách",
      EC: 0,
      DT: [],
    };
  }
};

// Định nghĩa các route
router.get("/phong-cach", getPHONG_CACH);
router.post("/phong-cach", async (req, res) => {
  const { tenPhuongCach } = req.body;
  const result = await createPHONG_CACH(tenPhuongCach);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.put("/phong-cach/:id", async (req, res) => {
  const { id } = req.params;
  const { tenPhuongCach } = req.body;
  const result = await updatePHONG_CACH(id, tenPhuongCach);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.delete("/phong-cach/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deletePHONG_CACH(id);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});

module.exports = router;
