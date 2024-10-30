const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");

// Lấy danh sách màu sắc sản phẩm
const getMAU_SAC_SAN_PHAM = async (req, res) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `mau_sac_san_pham`"
    );
    return res.status(200).json({
      EM: "Xem thông tin màu sắc sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting mau sac san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo màu sắc sản phẩm mới
const createMAU_SAC_SAN_PHAM = async (idSanPham, mauSacId) => {
  try {
    const [results] = await connection.execute(
      "INSERT INTO mau_sac_san_pham (ID_SAN_PHAM, MAU_SAC_ID) VALUES (?, ?)",
      [idSanPham, mauSacId]
    );
    return {
      EM: "Thêm màu sắc sản phẩm thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating mau sac san pham:", error);
    throw error;
  }
};

// Cập nhật màu sắc sản phẩm
const updateMAU_SAC_SAN_PHAM = async (id, idSanPham, mauSacId) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM mau_sac_san_pham WHERE ID_MAU_SAC = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute(
        "UPDATE mau_sac_san_pham SET ID_SAN_PHAM = ?, MAU_SAC_ID = ? WHERE ID_MAU_SAC = ?",
        [idSanPham, mauSacId, id]
      );
      return {
        EM: "Cập nhật màu sắc sản phẩm thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy màu sắc sản phẩm",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error updating mau sac san pham:", error);
    return {
      EM: "Có lỗi xảy ra khi cập nhật màu sắc sản phẩm",
      EC: 0,
      DT: [],
    };
  }
};

// Xóa màu sắc sản phẩm
const deleteMAU_SAC_SAN_PHAM = async (id) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM mau_sac_san_pham WHERE ID_MAU_SAC = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM mau_sac_san_pham WHERE ID_MAU_SAC = ?",
        [id]
      );
      return {
        EM: "Xóa màu sắc sản phẩm thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy màu sắc sản phẩm để xóa",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting mau sac san pham:", error);
    return {
      EM: "Có lỗi xảy ra khi xóa màu sắc sản phẩm",
      EC: 0,
      DT: [],
    };
  }
};

// Định nghĩa các route
router.get("/mau-sac-san-pham", getMAU_SAC_SAN_PHAM);
router.post("/mau-sac-san-pham", async (req, res) => {
  const { idSanPham, mauSacId } = req.body;
  const result = await createMAU_SAC_SAN_PHAM(idSanPham, mauSacId);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.put("/mau-sac-san-pham/:id", async (req, res) => {
  const { id } = req.params;
  const { idSanPham, mauSacId } = req.body;
  const result = await updateMAU_SAC_SAN_PHAM(id, idSanPham, mauSacId);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.delete("/mau-sac-san-pham/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deleteMAU_SAC_SAN_PHAM(id);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});

module.exports = router;
