const express = require("express");
const router = express.Router();
const connection = require("../config/old.js");

// Lấy danh sách phương thức thanh toán
const getTHANH_TOAN = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `thanh_toan`");
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
const createTHANH_TOAN = async (phuongThucThanhToan, trangThaiThanhToan) => {
  try {
    const ngayThanhToan = new Date(); // Lấy ngày hiện tại
    const [results] = await connection.execute(
      "INSERT INTO thanh_toan (PHUONG_THUC_THANH_TOAN, NGAY_THANH_TOAN, TRANG_THAI_THANH_TOAN) VALUES (?, ?, ?)",
      [phuongThucThanhToan, ngayThanhToan, trangThaiThanhToan]
    );
    return {
      EM: "Thêm phương thức thanh toán thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating thanh toan:", error);
    throw error;
  }
};

// Cập nhật phương thức thanh toán
const updateTHANH_TOAN = async (
  idThanhToan,
  phuongThucThanhToan,
  trangThaiThanhToan
) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM thanh_toan WHERE ID_THANH_TOAN = ?",
      [idThanhToan]
    );

    if (results.length > 0) {
      const ngayThanhToan = new Date(); // Lấy ngày hiện tại
      await connection.execute(
        "UPDATE thanh_toan SET PHUONG_THUC_THANH_TOAN = ?, NGAY_THANH_TOAN = ?, TRANG_THAI_THANH_TOAN = ? WHERE ID_THANH_TOAN = ?",
        [phuongThucThanhToan, ngayThanhToan, trangThaiThanhToan, idThanhToan]
      );
      return {
        EM: "Cập nhật phương thức thanh toán thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy phương thức thanh toán",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error updating thanh toan:", error);
    return {
      EM: "Có lỗi xảy ra khi cập nhật phương thức thanh toán",
      EC: 0,
      DT: [],
    };
  }
};

// Xóa phương thức thanh toán
const deleteTHANH_TOAN = async (idThanhToan) => {
  try {
    const [results] = await connection.execute(
      "SELECT * FROM thanh_toan WHERE ID_THANH_TOAN = ?",
      [idThanhToan]
    );

    if (results.length > 0) {
      await connection.execute(
        "DELETE FROM thanh_toan WHERE ID_THANH_TOAN = ?",
        [idThanhToan]
      );
      return {
        EM: "Xóa phương thức thanh toán thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy phương thức thanh toán để xóa",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error deleting thanh toan:", error);
    return {
      EM: "Có lỗi xảy ra khi xóa phương thức thanh toán",
      EC: 0,
      DT: [],
    };
  }
};

// Định nghĩa các route
router.get("/thanh-toan", getTHANH_TOAN);
router.post("/thanh-toan", async (req, res) => {
  const { phuongThucThanhToan, trangThaiThanhToan } = req.body;
  const result = await createTHANH_TOAN(
    phuongThucThanhToan,
    trangThaiThanhToan
  );
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.put("/thanh-toan/:id", async (req, res) => {
  const { id } = req.params;
  const { phuongThucThanhToan, trangThaiThanhToan } = req.body;
  const result = await updateTHANH_TOAN(
    id,
    phuongThucThanhToan,
    trangThaiThanhToan
  );
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});
router.delete("/thanh-toan/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deleteTHANH_TOAN(id);
  return res.status(result.EC === 1 ? 200 : 400).json(result);
});

module.exports = router;
