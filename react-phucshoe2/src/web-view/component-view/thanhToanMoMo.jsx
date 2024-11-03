import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentMoMo = () => {
  const navigate = useNavigate();
  const handleSummit = async () => {
    const responsive = await axios.post(
      "http://emailserivce.somee.com/api/Momo/CreatePaymentUrl",
      {
        fullName: "string",
        orderId: "string",
        orderInfo: "string",
        returnUrl: "http://localhost:3000/checkout",
        amount: 123456,
      }
    );
    console.log(responsive.data.url);
    // Lấy URL từ phản hồi
    const paymentUrl = responsive.data.url;
    console.log(paymentUrl);

    // Chuyển hướng đến URL thanh toán
    window.location.href = paymentUrl;
    try {
    } catch (error) {}
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      padding={3}
    >
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Thanh Toán MoMo
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="body1" gutterBottom>
            Vui lòng nhập thông tin thanh toán của bạn:
          </Typography>
          <TextField
            fullWidth
            label="Số điện thoại MoMo"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Số tiền"
            variant="outlined"
            margin="normal"
            type="number"
          />
          <TextField
            fullWidth
            label="Ghi chú"
            variant="outlined"
            margin="normal"
          />
        </CardContent>
        <Divider />
        <Box padding={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={() => handleSummit()}
            color="primary"
            size="large"
          >
            Thanh Toán
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default PaymentMoMo;
