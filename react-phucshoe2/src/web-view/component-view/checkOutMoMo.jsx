import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Sử dụng Redux hooks
import axios from "axios";
import { toast } from "react-toastify"; // Đảm bảo bạn đã cài đặt react-toastify
import { setItemCart, setTotalCart } from "../../redux/authSlice"; // Import các action cần thiết

const CheckOutMoMo = () => {
  const apiUrl = process.env.REACT_APP_URL_SERVER;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentInfo, setPaymentInfo] = useState({});

  // Lấy dữ liệu từ Redux
  const { itemCart, totalCart, userInfo } = useSelector((state) => state.auth);
  console.log("itemCart", itemCart);
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

  // Hàm xử lý đơn hàng khi thanh toán thành công
  const handleOrder = async () => {
    try {
      // Lấy các thông tin từ paymentInfo và Redux state
      const orderId = paymentInfo.orderId; // Lấy orderId từ query params
      const orderInfo = paymentInfo.orderInfo; // Lấy thông tin đơn hàng từ query params
      const paymentMethod = 1;
      const userId = userInfo.userId; // Lấy ID người dùng từ Redux
      const totalAmount = totalCart; // Tổng tiền đơn hàng từ Redux
      const cartItems = itemCart; // Lấy giỏ hàng từ Redux

      // Xử lý ghi chú đơn hàng (có thể từ paymentInfo hoặc mặc định)
      const note = paymentInfo.message || "Không có ghi chú";

      // Chuẩn bị dữ liệu cho API
      const requestData = {
        idNguoiDung: userId, // Lấy từ Redux
        idThanhToan: paymentMethod, // Lấy phương thức thanh toán
        tongTien: totalAmount, // Lấy tổng tiền
        trangThaiDonHang: "Đang chờ", // Mặc định trạng thái là "Đang chờ"
        ghiChuDonHang: note, // Ghi chú đơn hàng
        ID_ODER: orderId, // Mã đơn hàng từ query params
        items: cartItems,
      };

      // Gửi yêu cầu API để tạo đơn hàng
      const response = await axios.post(`${apiUrl}/don-hang`, requestData);

      if (response.data.EC === 1) {
        // Đơn hàng được tạo thành công
        toast.success("Đặt hàng thành công!");

        // Dọn dẹp giỏ hàng sau khi thanh toán thành công
        dispatch(setItemCart([]));
        dispatch(setTotalCart(0));

        // Điều hướng đến trang thành công
        navigate("/order-success");
      } else {
        // Nếu có lỗi khi tạo đơn hàng
        toast.error("Đã có lỗi xảy ra khi đặt hàng.");
      }
    } catch (error) {
      console.error("Error while processing order:", error);
      toast.error("Đã có lỗi khi xử lý đơn hàng.");
    }
  };
  console.log("paymentInfo", paymentInfo);
  useEffect(() => {
    // Kiểm tra nếu đã có thông tin thanh toán thành công, thực hiện xử lý đơn hàng
    if (paymentInfo.message === "Successful.") {
      handleOrder(); // Xử lý đơn hàng khi thanh toán thành công
    }
  }, [paymentInfo]); // Chạy khi paymentInfo thay đổi

  return <></>; // Trả về JSX của bạn nếu cần thiết
};

export default CheckOutMoMo;
