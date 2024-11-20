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
const crypto = require("crypto");
const axios = require("axios");

// Cấu hình MoMo
const MOMO_PARTNER_CODE = "MOMO";
const MOMO_ACCESS_KEY = "F8BBA842ECF85";
const MOMO_SECRET_KEY = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const REDIRECT_URL =
  "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
const IPN_URL = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";

const createPayment = async (req, res) => {
  try {
    // Thông tin thanh toán
    const amount = req.body.amount || 500000; // Số tiền thanh toán
    const orderId = MOMO_PARTNER_CODE + new Date().getTime(); // Tạo mã đơn hàng
    const requestId = orderId; // Request ID
    const orderInfo = "Thanh toán với MoMo";
    const extraData = ""; // Thông tin bổ sung (nếu cần)
    const paymentCode = req.body.paymentCode || ""; // Mã thanh toán của người dùng (nếu có)

    // Tạo raw signature
    const rawSignature = `accessKey=${MOMO_ACCESS_KEY}&amount=${amount}&extraData=${extraData}&ipnUrl=${IPN_URL}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${MOMO_PARTNER_CODE}&paymentCode=${paymentCode}&redirectUrl=${REDIRECT_URL}&requestId=${requestId}&requestType=payWithMethod`;

    // Tạo chữ ký bảo mật
    const signature = crypto
      .createHmac("sha256", MOMO_SECRET_KEY)
      .update(rawSignature)
      .digest("hex");
    console.log("Raw Signature:", rawSignature);
    console.log("Generated Signature:", signature);

    // Payload gửi đến API MoMo
    const requestBody = {
      partnerCode: MOMO_PARTNER_CODE,
      accessKey: MOMO_ACCESS_KEY,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: REDIRECT_URL,
      ipnUrl: IPN_URL,
      lang: "vi",
      extraData: extraData,
      requestType: "payWithMethod",
      paymentCode: paymentCode,
      autoCapture: true,
      orderGroupId: "",
      signature: signature,
    };

    // Gửi yêu cầu đến API MoMo
    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody
    );

    // Kiểm tra kết quả
    if (response.data.resultCode === 0) {
      return res.json({
        message: "Tạo thanh toán thành công",
        payUrl: response.data.payUrl, // URL để người dùng thanh toán
      });
    } else {
      console.error("MoMo Error Response:", response.data);
      throw new Error(response.data.message || "Lỗi không xác định từ MoMo");
    }
  } catch (error) {
    console.error("Error creating MoMo payment:", error.message);
    res.status(500).json({
      message: "Lỗi khi tạo thanh toán",
      error: error.message,
    });
  }
};
module.exports = {
  getTHANH_TOAN,
  createTHANH_TOAN,
  updateTHANH_TOAN,
  deleteTHANH_TOAN,
  getTHANH_TOAN_Use,
  createPayment,
};
