import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";
import { getThemeConfig } from "../../../../services/themeService";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const RevenueDashboard = () => {
  const api = process.env.REACT_APP_URL_SERVER;
  const [combinedData, setCombinedData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [topSellingCategories, setTopSellingCategories] = useState([]);
  const [topSellingBrands, setTopSellingBrands] = useState([]);
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  useEffect(() => {
    fetchCombinedData();
    fetchRevenueByPaymentMethod();
    fetchTopSellingCategories();
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

  const fetchTopSellingCategories = async () => {
    try {
      const response = await axios.get(
        `${api}/thong-ke/statistics/top-selling-product-categories`
      );
      const response_Brand = await axios.get(`${api}/thong-ke/sales-by-brand`);
      setTopSellingBrands(response_Brand.data.DT);
      const data = response.data.DT;

      // Nếu có nhiều hơn 5 loại sản phẩm, gộp các loại sản phẩm còn lại vào mục "Khác"
      const topCategories = data.slice(0, 5);
      const otherCategories = data.slice(5);
      if (otherCategories.length > 0) {
        topCategories.push({
          categoryName: "Khác",
          soldCount: otherCategories.reduce(
            (acc, item) => acc + item.soldCount,
            0
          ),
        });
      }

      setTopSellingCategories(topCategories);
    } catch (error) {
      console.error("Error fetching top selling categories:", error);
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
    labels: ["Phương thức thanh toán"], // Một nhãn chung trên trục X
    datasets: paymentData.map((item) => ({
      label: item.paymentMethod, // Nhãn tương ứng với phương thức thanh toán
      data: [item.totalRevenue], // Dữ liệu doanh thu cho từng phương thức
      backgroundColor:
        item.paymentMethod === "Momo"
          ? "rgba(75, 192, 192, 0.2)" // Màu nền cho Momo
          : "rgba(153, 102, 255, 0.2)", // Màu nền cho Thanh toán tại nhà
      borderColor:
        item.paymentMethod === "Momo"
          ? "rgba(75, 192, 192, 1)" // Màu viền cho Momo
          : "rgba(153, 102, 255, 1)", // Màu viền cho Thanh toán tại nhà
      borderWidth: 1,
    })),
  };
  const paymentChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Số tiền (VND)",
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value) => `${value.toLocaleString("vi-VN")} đ`,
        font: {
          weight: "bold",
          size: 12,
        },
      },
    },
  };

  // Dữ liệu biểu đồ tròn từ API loại sản phẩm bán chạy nhất
  const pieChartData = {
    labels: topSellingCategories.map((item) => item.categoryName),
    datasets: [
      {
        data: topSellingCategories.map((item) => item.percentage), // Sử dụng percentage từ API
        backgroundColor: [
          "#FF6384", // Màu cho loại sản phẩm 1
          "#36A2EB", // Màu cho loại sản phẩm 2
          "#FFCE56", // Màu cho loại sản phẩm 3
          "#4BC0C0", // Màu cho loại sản phẩm 4
          "#FF9F40", // Màu cho loại sản phẩm 5
          "#9966FF", // Màu cho "Khác"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
          "#9966FF",
        ],
        // Thêm thông tin soldCount vào data
        soldCount: topSellingCategories.map((item) => item.soldCount),
      },
    ],
  };

  // Cấu hình biểu đồ tròn với phần trăm và soldCount
  const pieChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          // Tùy chỉnh tooltip để hiển thị soldCount
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const soldCount = dataset.soldCount[tooltipItem.dataIndex]; // Lấy soldCount từ data
            return `${tooltipItem.label}: ${soldCount} sản phẩm`;
          },
        },
      },
      datalabels: {
        // Hiển thị phần trăm từ API trên biểu đồ tròn
        formatter: (value, context) => {
          // Trả về giá trị phần trăm đã có sẵn từ API
          return `${value}%`;
        },
        color: "#000", // Màu chữ cho phần trăm
        font: {
          weight: "bold",
          size: 12,
        },
        anchor: "center", // Đặt phần trăm ở giữa phần của biểu đồ
        align: "center",
      },
    },
  };

  // Dữ liệu biểu đồ tròn từ API thương hiệu sản phẩm bán chạy nhất
  const pieChartDataBrand = {
    labels: topSellingBrands.map((item) => item.brandName),
    datasets: [
      {
        data: topSellingBrands.map((item) => item.percentage), // Sử dụng percentage từ API
        backgroundColor: [
          "#FF6384", // Màu cho loại sản phẩm 1
          "#36A2EB", // Màu cho loại sản phẩm 2
          "#FFCE56", // Màu cho loại sản phẩm 3
          "#4BC0C0", // Màu cho loại sản phẩm 4
          "#FF9F40", // Màu cho loại sản phẩm 5
          "#9966FF", // Màu cho "Khác"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
          "#9966FF",
        ],
        // Thêm thông tin soldCount vào data
        soldCount: topSellingBrands.map((item) => item.soldCount),
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
            <Line data={chartData} options={paymentChartOptions} />
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{ padding: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Thống kê doanh thu theo phương thức thanh toán
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Bar data={paymentChartData} options={paymentChartOptions} />
          </Grid>
        </Grid>{" "}
        <Grid container spacing={3} style={{ padding: "20px" }}>
          <Grid item xs={6} md={6}>
            <Typography variant="h6" align="center" gutterBottom>
              Thống kê loại sản phẩm bán được nhiều nhất
            </Typography>
            <Pie data={pieChartData} options={pieChartOptions} />
          </Grid>{" "}
          <Grid item xs={6} md={6}>
            <Typography variant="h6" align="center" gutterBottom>
              Thống kê thương hiệu sản phẩm bán được nhiều nhất
            </Typography>
            <Pie data={pieChartDataBrand} options={pieChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RevenueDashboard;
