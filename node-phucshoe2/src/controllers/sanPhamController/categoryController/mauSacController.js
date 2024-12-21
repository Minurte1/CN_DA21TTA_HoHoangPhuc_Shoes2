const connection = require("../../../config/database");
// Lấy danh sách màu sắc

const getDanhSachMauSac = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `MAU_SAC`");
    res
      .status(200)
      .json({ EM: "Lấy danh sách màu sắc thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};
const getDanhSachMauSac_Use = async (req, res) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `MAU_SAC` where TRANG_THAI_MAU_SAC = 1"
    );
    res
      .status(200)
      .json({ EM: "Lấy danh sách màu sắc thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

// Thêm mới màu sắc
const createDanhSachMauSac = async (req, res) => {
  const { tenMau, maMauSac } = req.body;
  try {
    const createdMauSac = new Date(); // Lấy ngày hiện tại
    const [results] = await connection.execute(
      "INSERT INTO MAU_SAC (TEN_MAU_SAC, CREATE_MAU_SAC, UPDATE_MAU_SAC, TRANG_THAI_MAU_SAC,MA_MAU) VALUES (?, ?, ?, ?,?)",
      [tenMau, createdMauSac, createdMauSac, 1, maMauSac]
    );
    return res.status(200).json({
      EM: "Thêm kích cỡ thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error creating kich co:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thêm kích cỡ",
      EC: 0,
      DT: [],
    });
  }
};

// Cập nhật màu sắc
const updateDanhSachMauSac = async (req, res) => {
  const { id } = req.params;
  const { tenMau, trangThaiMauSac, maMauSac } = req.body;
  try {
    const [results] = await connection.execute(
      "UPDATE `MAU_SAC` SET TEN_MAU_SAC = ? , TRANG_THAI_MAU_SAC = ?,MA_MAU=? WHERE MAU_SAC_ID = ?",
      [tenMau, trangThaiMauSac, maMauSac, id]
    );
    res
      .status(200)
      .json({ EM: "Cập nhật màu sắc thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

// Xóa màu sắc
const deleteDanhSachMauSac = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "DELETE FROM `MAU_SAC` WHERE MAU_SAC_ID = ?",
      [id]
    );
    res.status(200).json({ EM: "Xóa màu sắc thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};
module.exports = {
  getDanhSachMauSac,
  createDanhSachMauSac,
  updateDanhSachMauSac,
  deleteDanhSachMauSac,
  getDanhSachMauSac_Use,
};
