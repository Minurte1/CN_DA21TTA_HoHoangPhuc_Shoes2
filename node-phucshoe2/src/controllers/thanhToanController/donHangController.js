const connection = require("../../config/database");

// Lấy danh sách đơn hàng
const getDON_HANG = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `don_hang`");
    return res.status(200).json({
      EM: "Xem thông tin thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting don hang:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo đơn hàng mới
const createDON_HANG = async (req, res) => {
  const {
    idNguoiDung,
    idThanhToan,
    tongTien,
    trangThaiDonHang,
    ghiChuDonHang,
  } = req.body;
  try {
    const ngayTaoDonHang = new Date(); // Lấy ngày hiện tại
    const [results] = await connection.execute(
      "INSERT INTO don_hang (ID_NGUOI_DUNG, ID_THANH_TOAN, TONG_TIEN, TRANG_THAI_DON_HANG, GHI_CHU_DONHANG, NGAY_TAO_DONHANG, NGAY_CAP_NHAT_DONHANG) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        idNguoiDung,
        idThanhToan,
        tongTien,
        trangThaiDonHang,
        ghiChuDonHang,
        ngayTaoDonHang,
        ngayTaoDonHang,
      ]
    );
    return {
      EM: "Thêm đơn hàng thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating don hang:", error);
    throw error;
  }
};

// Cập nhật đơn hàng
const updateDON_HANG = async (req, res) => {
  const { id } = req.params;
  const {
    idNguoiDung,
    idThanhToan,
    tongTien,
    trangThaiDonHang,
    ghiChuDonHang,
  } = req.body;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM don_hang WHERE ID_DON_HANG = ?",
      [id]
    );

    if (results.length > 0) {
      const ngayCapNhatDonHang = new Date(); // Lấy ngày hiện tại
      await connection.execute(
        "UPDATE don_hang SET ID_NGUOI_DUNG = ?, ID_THANH_TOAN = ?, TONG_TIEN = ?, TRANG_THAI_DON_HANG = ?, GHI_CHU_DONHANG = ?, NGAY_CAP_NHAT_DONHANG = ? WHERE ID_DON_HANG = ?",
        [
          idNguoiDung,
          idThanhToan,
          tongTien,
          trangThaiDonHang,
          ghiChuDonHang,
          ngayCapNhatDonHang,
          id,
        ]
      );
      return {
        EM: "Cập nhật đơn hàng thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy đơn hàng",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error updating don hang:", error);
    return {
      EM: "Có lỗi xảy ra khi cập nhật đơn hàng",
      EC: 0,
      DT: [],
    };
  }
};

// Xóa đơn hàng
const deleteDON_HANG = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM don_hang WHERE ID_DON_HANG = ?",
      [id]
    );

    if (results.length > 0) {
      await connection.execute("DELETE FROM don_hang WHERE ID_DON_HANG = ?", [
        id,
      ]);
      return {
        EM: "Xóa đơn hàng thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy đơn hàng để xóa",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting don hang:", error);
    return {
      EM: "Có lỗi xảy ra khi xóa đơn hàng",
      EC: 0,
      DT: [],
    };
  }
};

module.exports = {
  getDON_HANG,
  createDON_HANG,
  updateDON_HANG,
  deleteDON_HANG,
};
