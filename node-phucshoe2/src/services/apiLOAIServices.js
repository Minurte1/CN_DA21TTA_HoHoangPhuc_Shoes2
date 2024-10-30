const connection = require("../config/old.js");

// Lấy danh sách loại danh mục
const getLOAI_DANH_MUC = async () => {
  try {
    const [results] = await connection.execute("SELECT * FROM `loai`");
    return {
      EM: "Xem thông tin thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error getting danh muc:", error);
    throw error;
  }
};

// Tạo loại danh mục mới
const createLOAI_DANH_MUC = async (tenDanhMuc, moTaLoaiDanhMuc, trangThai) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM loai WHERE TEN_DANH_MUC = ?",
      [tenDanhMuc]
    );

    if (results.length > 0) {
      return {
        EM: "Thể loại đã tồn tại",
        EC: 0,
        DT: [],
      };
    } else {
      const [results1] = await connection.execute(
        "INSERT INTO loai (TEN_DANH_MUC, MO_TA_LOAI_DANH_MUC, TRANG_THAI_DANHMUC) VALUES (?, ?, ?)",
        [tenDanhMuc, moTaLoaiDanhMuc, trangThai]
      );
      return {
        EM: "Thêm thể loại mới thành công",
        EC: 1,
        DT: results1,
      };
    }
  } catch (error) {
    console.error("Error creating loai danh muc:", error);
    throw error;
  }
};

// Cập nhật loại danh mục
const updateLOAI_DANH_MUC = async (
  idDanhMuc,
  tenDanhMuc,
  moTaLoaiDanhMuc,
  trangThai
) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM loai WHERE ID_DANH_MUC = ?",
      [idDanhMuc]
    );

    if (results.length > 0) {
      const [results1] = await connection.execute(
        "UPDATE loai SET TEN_DANH_MUC = ?, MO_TA_LOAI_DANH_MUC = ?, TRANG_THAI_DANHMUC = ? WHERE ID_DANH_MUC = ?",
        [tenDanhMuc, moTaLoaiDanhMuc, trangThai, idDanhMuc]
      );
      return {
        EM: "Cập nhật thể loại thành công",
        EC: 1,
        DT: results1,
      };
    } else {
      return {
        EM: "Không tìm thấy thể loại",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error updating loai danh muc:", error);
    throw error;
  }
};

// Xóa loại danh mục
const deleteLOAI_DANH_MUC = async (idDanhMuc) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM loai WHERE ID_DANH_MUC = ?",
      [idDanhMuc]
    );

    if (results.length > 0) {
      await connection.execute("DELETE FROM loai WHERE ID_DANH_MUC = ?", [
        idDanhMuc,
      ]);
      return {
        EM: "Xóa thể loại sản phẩm thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không thể xóa thể loại vì không tìm thấy",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting loai danh muc:", error);
    return {
      EM: "Không thể xóa thể loại vì có thể có dữ liệu liên quan",
      EC: 0,
      DT: [],
    };
  }
};

module.exports = {
  getLOAI_DANH_MUC,
  createLOAI_DANH_MUC,
  updateLOAI_DANH_MUC,
  deleteLOAI_DANH_MUC,
};
