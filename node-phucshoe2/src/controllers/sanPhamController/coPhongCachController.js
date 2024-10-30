const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");

// Lấy danh sách phong cách sản phẩm
const getPHONG_CACH_SAN_PHAM = async (req, res) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `phong_cach_san_pham`"
    );
    return res.status(200).json({
      EM: "Xem thông tin phong cách sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting phong cach san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo phong cách sản phẩm mới
const createPHONG_CACH_SAN_PHAM = async (req, res) => {
  try {
    const { idSanPham, idPhuongCach } = req.body;
    const [results] = await connection.execute(
      "INSERT INTO phong_cach_san_pham (ID_SAN_PHAM, ID_PHUONG_CACH) VALUES (?, ?)",
      [idSanPham, idPhuongCach]
    );
    return {
      EM: "Thêm phong cách sản phẩm thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating phong cach san pham:", error);
    throw error;
  }
};

// Cập nhật phong cách sản phẩm
const updatePHONG_CACH_SAN_PHAM = async (req, res) => {
  try {
    const { id } = req.params;
    const { idSanPham, idPhuongCach } = req.body;
    const [results] = await connection.execute(
      "SELECT * FROM phong_cach_san_pham WHERE ID_PHONG_CACH = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute(
        "UPDATE phong_cach_san_pham SET ID_SAN_PHAM = ?, ID_PHUONG_CACH = ? WHERE ID_PHONG_CACH = ?",
        [idSanPham, idPhuongCach, id]
      );
      return {
        EM: "Cập nhật phong cách sản phẩm thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy phong cách sản phẩm",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error updating phong cach san pham:", error);
    return {
      EM: "Có lỗi xảy ra khi cập nhật phong cách sản phẩm",
      EC: 0,
      DT: [],
    };
  }
};

// Xóa phong cách sản phẩm
const deletePHONG_CACH_SAN_PHAM = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM phong_cach_san_pham WHERE ID_PHONG_CACH = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM phong_cach_san_pham WHERE ID_PHONG_CACH = ?",
        [id]
      );
      return {
        EM: "Xóa phong cách sản phẩm thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy phong cách sản phẩm để xóa",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting phong cach san pham:", error);
    return {
      EM: "Có lỗi xảy ra khi xóa phong cách sản phẩm",
      EC: 0,
      DT: [],
    };
  }
};

module.exports = {
  getPHONG_CACH_SAN_PHAM,
  createPHONG_CACH_SAN_PHAM,
  updatePHONG_CACH_SAN_PHAM,
  deletePHONG_CACH_SAN_PHAM,
};
