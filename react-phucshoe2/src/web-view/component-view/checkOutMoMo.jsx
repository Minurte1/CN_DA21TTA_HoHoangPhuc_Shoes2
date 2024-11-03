// src/CheckOutMoMo.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckOutMoMo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Khai báo state để lưu trữ thông tin thanh toán
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    // Lấy dữ liệu từ query parameters
    const info = {
      partnerCode: queryParams.get("partnerCode"),
      accessKey: queryParams.get("accessKey"),
      requestId: queryParams.get("requestId"),
      amount: queryParams.get("amount"),
      orderId: queryParams.get("orderId"),
      orderInfo: queryParams.get("orderInfo"),
      orderType: queryParams.get("orderType"),
      transId: queryParams.get("transId"),
      message: queryParams.get("message"),
      localMessage: queryParams.get("localMessage"),
      responseTime: queryParams.get("responseTime"),
      errorCode: queryParams.get("errorCode"),
      payType: queryParams.get("payType"),
      extraData: queryParams.get("extraData"),
      signature: queryParams.get("signature"),
    };

    // Cập nhật state với thông tin thanh toán
    setPaymentInfo(info);

    // Xóa các query parameters khi component được render
    const newPath = location.pathname;
    navigate(newPath);
  }, [navigate, location.pathname]);

  return (
    <div style={{ backgroundColor: "#101014", color: "#fff", padding: "20px" }}>
      <h2>Thông Tin Thanh Toán</h2>
      <ul>
        <li>
          <strong>Partner Code:</strong> {paymentInfo.partnerCode}
        </li>
        <li>
          <strong>Access Key:</strong> {paymentInfo.accessKey}
        </li>
        <li>
          <strong>Request ID:</strong> {paymentInfo.requestId}
        </li>
        <li>
          <strong>Số Tiền:</strong> {paymentInfo.amount}
        </li>
        <li>
          <strong>Order ID:</strong> {paymentInfo.orderId}
        </li>
        <li>
          <strong>Thông Tin Đơn Hàng:</strong> {paymentInfo.orderInfo}
        </li>
        <li>
          <strong>Loại Đơn Hàng:</strong> {paymentInfo.orderType}
        </li>
        <li>
          <strong>Transaction ID:</strong> {paymentInfo.transId}
        </li>
        <li>
          <strong>Message:</strong> {paymentInfo.message}
        </li>
        <li>
          <strong>Local Message:</strong> {paymentInfo.localMessage}
        </li>
        <li>
          <strong>Thời Gian Phản Hồi:</strong> {paymentInfo.responseTime}
        </li>
        <li>
          <strong>Mã Lỗi:</strong> {paymentInfo.errorCode}
        </li>
        <li>
          <strong>Loại Thanh Toán:</strong> {paymentInfo.payType}
        </li>
        <li>
          <strong>Dữ Liệu Bổ Sung:</strong> {paymentInfo.extraData}
        </li>
        <li>
          <strong>Chữ Ký:</strong> {paymentInfo.signature}
        </li>
      </ul>
    </div>
  );
};

export default CheckOutMoMo;
