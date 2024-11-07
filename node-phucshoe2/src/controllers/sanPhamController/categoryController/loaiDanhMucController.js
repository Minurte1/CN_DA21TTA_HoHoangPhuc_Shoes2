const connection = require("../../../config/database");
const moment = require("moment");

// Lấy danh sách LOAI_DANH_MUC
const getLOAI_DANH_MUC = async (req, res) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `LOAI_DANH_MUC` ORDER BY `UPDATE_DANH_MUC` DESC"
    );
    return res.status(200).json({
      EM: "Lấy danh sách loại danh mục thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting LOAI_DANH_MUC:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy danh sách loại danh mục",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo LOAI_DANH_MUC mới
const createLOAI_DANH_MUC = async (req, res) => {
  const { tenDanhMuc, moTaLoaiDanhMuc, trangThaiLoaiDanhMuc } = req.body;

  try {
    const createdDanhMuc = moment().format("YYYY-MM-DD HH:mm:ss"); // Ngày hiện tại
    console.log(
      tenDanhMuc,
      moTaLoaiDanhMuc,
      trangThaiLoaiDanhMuc,
      createdDanhMuc
    );
    await connection.execute(
      "INSERT INTO LOAI_DANH_MUC (TEN_DANH_MUC, MO_TA_LOAI_DANH_MUC, TRANG_THAI_DANHMUC, CREATED_DANH_MUC, UPDATE_DANH_MUC) VALUES (?, ?, ?, ?, ?)",
      [
        tenDanhMuc,
        moTaLoaiDanhMuc,
        trangThaiLoaiDanhMuc,
        createdDanhMuc,
        createdDanhMuc,
      ]
    );

    const [results] = await connection.execute(
      "SELECT * FROM `LOAI_DANH_MUC` ORDER BY `UPDATE_DANH_MUC` DESC"
    );

    return res.status(201).json({
      EM: "Thêm loại danh mục thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error creating LOAI_DANH_MUC:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thêm loại danh mục",
      EC: 0,
      DT: [],
    });
  }
};

// Cập nhật LOAI_DANH_MUC
const updateLOAI_DANH_MUC = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenDanhMuc, moTaLoaiDanhMuc, trangThaiLoaiDanhMuc } = req.body;

    const [results] = await connection.execute(
      "SELECT * FROM LOAI_DANH_MUC WHERE ID_DANH_MUC = ?",
      [id]
    );

    if (results.length > 0) {
      const updateDanhMuc = moment().format("YYYY-MM-DD HH:mm:ss"); // Ngày hiện tại
      await connection.execute(
        "UPDATE LOAI_DANH_MUC SET TEN_DANH_MUC = ?, MO_TA_LOAI_DANH_MUC = ?, TRANG_THAI_DANHMUC = ?, UPDATE_DANH_MUC = ? WHERE ID_DANH_MUC = ?",
        [tenDanhMuc, moTaLoaiDanhMuc, trangThaiLoaiDanhMuc, updateDanhMuc, id]
      );
      return res.status(200).json({
        EM: "Cập nhật loại danh mục thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy loại danh mục",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error updating LOAI_DANH_MUC:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật loại danh mục",
      EC: 0,
      DT: [],
    });
  }
};

// Xóa LOAI_DANH_MUC
const deleteLOAI_DANH_MUC = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await connection.execute(
      "SELECT * FROM LOAI_DANH_MUC WHERE ID_DANH_MUC = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM LOAI_DANH_MUC WHERE ID_DANH_MUC = ?",
        [id]
      );
      return res.status(200).json({
        EM: "Xóa loại danh mục thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy loại danh mục để xóa",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error deleting LOAI_DANH_MUC:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa loại danh mục",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getLOAI_DANH_MUC,
  createLOAI_DANH_MUC,
  updateLOAI_DANH_MUC,
  deleteLOAI_DANH_MUC,
};
