// src/CheckOutMoMo.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Đảm bảo bạn đã cài đặt react-toastify

const CheckOutMoMo = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(() => {
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    if (orderDetails) {
      // handleOrder(orderDetails);
    }
  }, []);

  // const handleOrder = async (orderDetails) => {
  //   try {
  //     const { seatsToPurchase, discountedPrice, userId } = orderDetails;

  //     // Gửi yêu cầu đến API để tạo đơn hàng
  //     const response = await axiosInstance.post(
  //       `http://localhost:3002/api/seats/order/ticket`,
  //       {
  //         seatsToPurchase: seatsToPurchase, // Truyền toàn bộ thông tin ghế
  //         totalPrice: discountedPrice, // Truyền tổng tiền đã giảm
  //       }
  //     );

  //     // Cập nhật điểm số người dùng
  //     const updatedScore = userAllData.score - inputScore; // Tính toán điểm số mới

  //     const updateResponse = await axiosInstance.put(
  //       `http://localhost:3002/api/users/score/${userId}`,
  //       { score: updatedScore }
  //     );

  //     const response_updateScore = await axiosInstance.post(
  //       `http://localhost:3002/api/seats/add-score`,
  //       {
  //         id: userId,
  //         soLuongVe: seatsToPurchase.length,
  //       }
  //     );

  //     // Cập nhật state của userAllData
  //     setUserAllData((prev) => ({ ...prev, score: updatedScore }));

  //     // Cập nhật cookie với dữ liệu mới
  //     const updatedUserData = {
  //       ...userAllData, // Sao chép tất cả thông tin người dùng
  //       score: updatedScore, // Cập nhật điểm mới
  //     };

  //     Cookies.set("userData", JSON.stringify(updatedUserData)); // Cập nhật cookie

  //     if (response.data.EC === 1) {
  //       toast.success(`Bạn đã đặt vé thành công`);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log("Lỗi khi mua vé:", error);
  //     toast.error("Đã có lỗi xảy ra khi mua vé");
  //   }
  // };

  return <></>; // Trả về JSX của bạn nếu cần thiết
};

export default CheckOutMoMo;
