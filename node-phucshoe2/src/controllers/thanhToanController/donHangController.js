const connection = require("../../config/database");
const JWT_SECRET = process.env.JWT_SECRET;
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const otpStorage = new Map();

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
    ID_ODER,
    items,
    email, // Thêm email user
  } = req.body;
  console.log("req.body", req.body);

  try {
    const ngayTaoDonHang = new Date();
    const [results] = await connection.execute(
      "INSERT INTO don_hang (ID_NGUOI_DUNG, ID_THANH_TOAN, TONG_TIEN, TRANG_THAI_DON_HANG, GHI_CHU_DONHANG, NGAY_TAO_DONHANG, NGAY_CAP_NHAT_DONHANG, ID_ODER) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        idNguoiDung,
        idThanhToan,
        tongTien,
        trangThaiDonHang,
        ghiChuDonHang,
        ngayTaoDonHang,
        ngayTaoDonHang,
        ID_ODER,
      ]
    );

    const donHangId = results.insertId;

    const chiTietHoaDonPromises = items.map(async (item) => {
      const { idSanPham, soLuong, giaSanPhamChiTiet } = item;

      await connection.execute(
        "INSERT INTO CHI_TIET_HOA_DON (ID_SAN_PHAM, ID_DON_HANG, SO_LUONG_SP, GIA_SAN_PHAM_CHI_TIET) VALUES (?, ?, ?, ?)",
        [idSanPham, donHangId, soLuong, giaSanPhamChiTiet]
      );
    });

    await Promise.all(chiTietHoaDonPromises);

    // Chuẩn bị dữ liệu gửi email
    const orderDetails = {
      orderId: ID_ODER,
      tongTien,
      ngayTaoDonHang,
      items: items.map((item) => ({
        tenSanPham: item.tenSanPham,
        soLuong: item.soLuong,
        giaSanPhamChiTiet: item.giaSanPhamChiTiet,
      })),
    };

    // Gọi trực tiếp hàm gửi email
    const emailResult = await sendOrderEmail({ email, orderDetails });

    if (emailResult.EC === 1) {
      // Xóa dữ liệu trong bảng GIO_HANG
      await connection.execute("DELETE FROM gio_hang WHERE ID_NGUOI_DUNG = ?", [
        idNguoiDung,
      ]);

      return res.json({
        EM: "Thêm đơn hàng, gửi email và xóa giỏ hàng thành công",
        EC: 1,
      });
    } else {
      throw new Error("Gửi email thất bại");
    }
  } catch (error) {
    console.error("Error creating don hang:", error);
    return res.status(500).json({
      EM: "Lỗi khi thêm đơn hàng hoặc gửi email",
      EC: -1,
    });
  } finally {
    connection.release();
  }
};

// Hàm gửi email
const sendOrderEmail = async ({ email, orderDetails }) => {
  if (!email || !orderDetails) {
    return {
      EM: "Email và chi tiết đơn hàng là bắt buộc",
      EC: -1,
    };
  }

  // Tạo nội dung email
  const orderMessage = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <div style="text-align: center; padding: 10px 0;">
        <h1 style="color: #007BFF;">Cảm Ơn Bạn Đã Đặt Hàng!</h1>
        <p style="font-size: 16px; color: #555;">Đơn hàng của bạn đã được ghi nhận thành công.</p>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #007BFF;">Chi Tiết Đơn Hàng</h2>
        <p><strong>Mã Đơn Hàng:</strong> ${orderDetails.orderId}</p>
        <p><strong>Tổng Tiền:</strong> ${orderDetails.tongTien} VND</p>
        <p><strong>Ngày Đặt:</strong> ${orderDetails.ngayTaoDonHang}</p>
        <h3>Sản Phẩm:</h3>
        <ul>
          ${orderDetails.items
            .map(
              (item) =>
                `<li>${item.tenSanPham} - ${item.soLuong} x ${item.giaSanPhamChiTiet} VND</li>`
            )
            .join("")}
        </ul>
      </div>
      <div style="margin-top: 20px; text-align: center; color: #888; font-size: 12px;">
        <p>&copy; 2024 ShoeStore. All rights reserved.</p>
      </div>
    </div>
  `;

  // Cấu hình gửi email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_OTP,
      pass: process.env.PASSWORD_OTP,
    },
  });

  const mailOptions = {
    from: "hohoangphucjob@gmail.com",
    to: email,
    subject: "Thông Tin Đơn Hàng Của Bạn",
    html: orderMessage,
  };

  try {
    // Gửi email
    await transporter.sendMail(mailOptions);
    return {
      EM: "Gửi email đơn hàng thành công",
      EC: 1,
    };
  } catch (error) {
    console.error("Error sending order email:", error);
    return {
      EM: "Gửi email thất bại",
      EC: -1,
    };
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
