const connection = require("../../../config/database");
// Lấy danh sách màu sắc

const getDanhSachMauSac = async (req, res) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `sanpham_mausac`"
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
  const { ten_mau } = req.body;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `sanpham_mausac`"
    );
    res
      .status(200)
      .json({ EM: "Lấy danh sách màu sắc thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

// Cập nhật màu sắc
const updateDanhSachMauSac = async (req, res) => {
  const { id } = req.params;
  const { ten_mau } = req.body;
  try {
    const [results] = await connection.execute(
      "UPDATE `sanpham_mausac` SET ten_mau = ? WHERE mau_id = ?",
      [ten_mau, id]
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
      "DELETE FROM `sanpham_mausac` WHERE mau_id = ?",
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
};
