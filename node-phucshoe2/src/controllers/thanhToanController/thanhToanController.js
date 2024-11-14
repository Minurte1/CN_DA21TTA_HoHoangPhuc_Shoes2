const connection = require("../../config/database");

// Lấy danh sách phương thức thanh toán
const getTHANH_TOAN = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `THANH_TOAN`");
    return res.status(200).json({
      EM: "Xem thông tin thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting thanh toan:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

const getTHANH_TOAN_Use = async (req, res) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `THANH_TOAN` where TRANG_THAI_THANH_TOAN = 1"
    );
    return res.status(200).json({
      EM: "Xem thông tin thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting thanh toan:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};
// Tạo phương thức thanh toán mới
const createTHANH_TOAN = async (req, res) => {
  const { phuongThucThanhToan, trangThaiThanhToan } = req.body;
  try {
    const ngayThanhToan = new Date(); // Lấy ngày hiện tại
    const [results] = await connection.execute(
      "INSERT INTO THANH_TOAN (PHUONG_THUC_THANH_TOAN, NGAY_THANH_TOAN, TRANG_THAI_THANH_TOAN) VALUES (?, ?, ?)",
      [phuongThucThanhToan, ngayThanhToan, trangThaiThanhToan]
    );
    return res.status(200).json({
      EM: "Thêm phương thức thanh toán thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error creating thanh toan:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thêm phương thức thanh toán",
      EC: 0,
      DT: [],
    });
  }
};

// Cập nhật phương thức thanh toán
const updateTHANH_TOAN = async (req, res) => {
  const { id } = req.params;
  const { phuongThucThanhToan, trangThaiThanhToan } = req.body;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM THANH_TOAN WHERE ID_THANH_TOAN = ?",
      [id]
    );

    if (results.length > 0) {
      const ngayThanhToan = new Date(); // Lấy ngày hiện tại
      await connection.execute(
        "UPDATE THANH_TOAN SET PHUONG_THUC_THANH_TOAN = ?, NGAY_THANH_TOAN = ?, TRANG_THAI_THANH_TOAN = ? WHERE ID_THANH_TOAN = ?",
        [phuongThucThanhToan, ngayThanhToan, trangThaiThanhToan, id]
      );
      return res.status(200).json({
        EM: "Cập nhật phương thức thanh toán thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy phương thức thanh toán",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error updating thanh toan:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật phương thức thanh toán",
      EC: 0,
      DT: [],
    });
  }
};

// Xóa phương thức thanh toán
const deleteTHANH_TOAN = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM THANH_TOAN WHERE ID_THANH_TOAN = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM THANH_TOAN WHERE ID_THANH_TOAN = ?",
        [id]
      );
      return res.status(200).json({
        EM: "Xóa phương thức thanh toán thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy phương thức thanh toán để xóa",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error deleting thanh toan:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa phương thức thanh toán",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getTHANH_TOAN,
  createTHANH_TOAN,
  updateTHANH_TOAN,
  deleteTHANH_TOAN,
  getTHANH_TOAN_Use,
};
