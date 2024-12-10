import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Grid, Typography, Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { getThemeConfig } from "../../../../services/themeService";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const RevenueDashboard = () => {
  const api = process.env.REACT_APP_URL_SERVER;
  const [combinedData, setCombinedData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  useEffect(() => {
    fetchCombinedData();
    fetchRevenueByPaymentMethod(); // Fetch doanh thu theo phương thức thanh toán
  }, []);

  const fetchCombinedData = async () => {
    try {
      // Gửi các yêu cầu song song để lấy dữ liệu
      const [monthlyResponse, dailyResponse, yearlyResponse] =
        await Promise.all([
          axios.get(`${api}/thong-ke/doanh-thu/thang`),
          axios.get(`${api}/thong-ke/doanh-thu/ngay`),
          axios.get(`${api}/thong-ke/doanh-thu/nam`),
        ]);

      // Lấy dữ liệu từ phản hồi
      const monthlyData = monthlyResponse.data.DT;
      const dailyData = dailyResponse.data.DT;
      const yearlyData = yearlyResponse.data.DT;

      // Chuẩn hóa dữ liệu thành labels chung
      const allLabels = [
        ...monthlyData.map((item) => item.monthYear),
        ...dailyData.map((item) =>
          new Date(item.date).toLocaleDateString("vi-VN")
        ),
        ...yearlyData.map((item) => item.year.toString()),
      ];

      // Loại bỏ nhãn trùng lặp
      const uniqueLabels = [...new Set(allLabels)].sort();

      // Gộp dữ liệu
      const monthlyDataset = uniqueLabels.map(
        (label) =>
          monthlyData.find((item) => item.monthYear === label)?.totalRevenue ||
          0
      );
      const dailyDataset = uniqueLabels.map(
        (label) =>
          dailyData.find(
            (item) => new Date(item.date).toLocaleDateString("vi-VN") === label
          )?.totalRevenue || 0
      );
      const yearlyDataset = uniqueLabels.map(
        (label) =>
          yearlyData.find((item) => item.year.toString() === label)
            ?.totalRevenue || 0
      );

      // Cập nhật state
      setCombinedData({
        labels: uniqueLabels,
        monthlyData: monthlyDataset,
        dailyData: dailyDataset,
        yearlyData: yearlyDataset,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchRevenueByPaymentMethod = async () => {
    try {
      const response = await axios.get(
        `${api}/thong-ke/revenue-by-payment-method`
      );
      const data = response.data.DT;
      setPaymentData(data); // Cập nhật dữ liệu doanh thu theo phương thức thanh toán
    } catch (error) {
      console.error("Error fetching revenue by payment method:", error);
    }
  };

  // Dữ liệu biểu đồ cho doanh thu theo tháng, ngày và năm
  const chartData = {
    labels: combinedData.labels,
    datasets: [
      {
        label: "Doanh thu theo tháng",
        data: combinedData.monthlyData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Doanh thu theo ngày",
        data: combinedData.dailyData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Doanh thu theo năm",
        data: combinedData.yearlyData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Dữ liệu biểu đồ cho doanh thu theo phương thức thanh toán
  const paymentChartData = {
    labels: paymentData.map((item) => item.paymentMethod),
    datasets: [
      {
        label: "Doanh thu theo phương thức thanh toán",
        data: paymentData.map((item) => item.totalRevenue),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
        }}
      >
        <Grid container spacing={3} style={{ padding: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Thống kê doanh thu
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Line data={chartData} options={{ responsive: true }} />
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ padding: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Thống kê doanh thu theo phương thức thanh toán
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Line data={paymentChartData} options={{ responsive: true }} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RevenueDashboard;
