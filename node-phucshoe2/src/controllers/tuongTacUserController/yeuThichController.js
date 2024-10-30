const connection = require("../../config/database"); // Đảm bảo `connection` được import từ tệp kết nối cơ sở dữ liệu của bạn

// Lấy danh sách yêu thích
const getYEU_THICH = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `YEU_THICH`");
    return res.status(200).json({
      EM: "Xem thông tin thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting yeu thich:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};
const getYEU_THICH_By_IdUser = async (req, res) => {
  try {
    const id = req.params;
    const [results] = await connection.execute(
      "SELECT * FROM `YEU_THICH` where ID_NGUOI_DUNG =?",
      [id]
    );
    return res.status(200).json({
      EM: "Xem thông tin thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting yeu thich:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};
// Tạo yêu thích mới
const createYEU_THICH = async (req, res) => {
  const { idSanPham, idNguoiDung } = req.body;
  try {
    // Kiểm tra xem đã tồn tại trong yêu thích chưa
    const [results] = await connection.execute(
      "SELECT * FROM YEU_THICH WHERE ID_SAN_PHAM = ? AND ID_NGUOI_DUNG = ?",
      [idSanPham, idNguoiDung]
    );

    if (results.length > 0) {
      return {
        EM: "Sản phẩm đã được thêm vào danh sách yêu thích",
        EC: 0,
        DT: [],
      };
    } else {
      const [results1] = await connection.execute(
        "INSERT INTO YEU_THICH (ID_SAN_PHAM, ID_NGUOI_DUNG) VALUES (?, ?)",
        [idSanPham, idNguoiDung]
      );
      return {
        EM: "Thêm sản phẩm vào danh sách yêu thích thành công",
        EC: 1,
        DT: results1,
      };
    }
  } catch (error) {
    console.error("Error creating yeu thich:", error);
    throw error;
  }
};

// Xóa sản phẩm khỏi danh sách yêu thích
const deleteYEU_THICH = async (req, res) => {
  const { idSanPham, idNguoiDung } = req.body;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM YEU_THICH WHERE ID_SAN_PHAM = ? AND ID_NGUOI_DUNG = ?",
      [idSanPham, idNguoiDung]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM YEU_THICH WHERE ID_SAN_PHAM = ? AND ID_NGUOI_DUNG = ?",
        [idSanPham, idNguoiDung]
      );
      return {
        EM: "Xóa sản phẩm khỏi danh sách yêu thích thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy sản phẩm trong danh sách yêu thích",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting yeu thich:", error);
    return {
      EM: "Có lỗi xảy ra khi xóa sản phẩm khỏi danh sách yêu thích",
      EC: 0,
      DT: [],
    };
  }
};

module.exports = {
  getYEU_THICH,
  createYEU_THICH,
  deleteYEU_THICH,
  getYEU_THICH_By_IdUser,
};
