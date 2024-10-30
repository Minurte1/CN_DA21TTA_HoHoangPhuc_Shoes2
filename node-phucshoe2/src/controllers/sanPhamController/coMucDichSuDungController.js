const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");

// Lấy danh sách mục đích sử dụng sản phẩm
const getMUC_DICH_SU_DUNG_SAN_PHAM = async (req, res) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `muc_dich_su_dung_san_pham`"
    );
    return res.status(200).json({
      EM: "Xem thông tin mục đích sử dụng sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting muc dich su dung san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo mục đích sử dụng sản phẩm mới
const createMUC_DICH_SU_DUNG_SAN_PHAM = async (idSanPham, idMucDichSuDung) => {
  try {
    const [results] = await connection.execute(
      "INSERT INTO muc_dich_su_dung_san_pham (ID_SAN_PHAM, ID_MUC_DICH_SU_DUNG) VALUES (?, ?)",
      [idSanPham, idMucDichSuDung]
    );
    return {
      EM: "Thêm mục đích sử dụng sản phẩm thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating muc dich su dung san pham:", error);
    throw error;
  }
};

// Cập nhật mục đích sử dụng sản phẩm
const updateMUC_DICH_SU_DUNG_SAN_PHAM = async (
  idMucDich,
  idSanPham,
  idMucDichSuDung
) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM muc_dich_su_dung_san_pham WHERE ID_MUC_DICH = ?",
      [idMucDich]
    );

    if (results.length > 0) {
      await connection.execute(
        "UPDATE muc_dich_su_dung_san_pham SET ID_SAN_PHAM = ?, ID_MUC_DICH_SU_DUNG = ? WHERE ID_MUC_DICH = ?",
        [idSanPham, idMucDichSuDung, idMucDich]
      );
      return {
        EM: "Cập nhật mục đích sử dụng sản phẩm thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy mục đích sử dụng sản phẩm",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error updating muc dich su dung san pham:", error);
    return {
      EM: "Có lỗi xảy ra khi cập nhật mục đích sử dụng sản phẩm",
      EC: 0,
      DT: [],
    };
  }
};

// Xóa mục đích sử dụng sản phẩm
const deleteMUC_DICH_SU_DUNG_SAN_PHAM = async (idMucDich) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM muc_dich_su_dung_san_pham WHERE ID_MUC_DICH = ?",
      [idMucDich]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM muc_dich_su_dung_san_pham WHERE ID_MUC_DICH = ?",
        [idMucDich]
      );
      return {
        EM: "Xóa mục đích sử dụng sản phẩm thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy mục đích sử dụng sản phẩm để xóa",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting muc dich su dung san pham:", error);
    return {
      EM: "Có lỗi xảy ra khi xóa mục đích sử dụng sản phẩm",
      EC: 0,
      DT: [],
    };
  }
};

// Định nghĩa các route
router.get("/muc-dich-su-dung-san-pham", getMUC_DICH_SU_DUNG_SAN_PHAM);
router.post("/muc-dich-su-dung-san-pham", async (req, res) => {
  const { idSanPham, idMucDichSuDung } = req.body;
  const result = await createMUC_DICH_SU_DUNG_SAN_PHAM(
    idSanPham,
    idMucDichSuDung
  );
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.put("/muc-dich-su-dung-san-pham/:id", async (req, res) => {
  const { id } = req.params;
  const { idSanPham, idMucDichSuDung } = req.body;
  const result = await updateMUC_DICH_SU_DUNG_SAN_PHAM(
    id,
    idSanPham,
    idMucDichSuDung
  );
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.delete("/muc-dich-su-dung-san-pham/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deleteMUC_DICH_SU_DUNG_SAN_PHAM(id);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});

module.exports = router;
