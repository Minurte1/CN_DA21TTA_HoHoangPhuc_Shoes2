import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
} from "chart.js";
import { Grid, Typography } from "@mui/material";

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LinearScale
);

const ProductStatisticsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [statusChartData, setStatusChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = process.env.REACT_APP_URL_SERVER;

  // Lấy dữ liệu thống kê sản phẩm yêu thích
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/thong-ke/most-liked-products`);
        const data = response.data?.DT || [];

        const labels = data.map((item) => item.productName);
        const values = data.map((item) => item.likeCount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Số lượt thích",
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });

        const statusResponse = await axios.get(
          `${api}/thong-ke/statistics/products-by-status`
        );
        const statusData = statusResponse.data?.DT || [];

        // Tạo dữ liệu cho biểu đồ thống kê trạng thái sản phẩm
        const statuses = statusData.map((item) => item.productStatus);
        const counts = statusData.map((item) => item.productCount);
        const productNames = statusData.map((item) => item.productName);
        const totalProductQuantities = statusData.map(
          (item) => item.totalProductQuantity
        );

        setStatusChartData({
          labels: productNames, // Dùng tên sản phẩm làm nhãn cho trục X
          datasets: [
            {
              label: "Số lượng sản phẩm",
              data: counts, // Dữ liệu số lượng sản phẩm
              backgroundColor: ["#4caf50", "#f44336"], // Màu sắc cho các trạng thái
              borderColor: ["#388e3c", "#d32f2f"],
              borderWidth: 1,
              // Nếu muốn hiển thị thêm thông tin bổ sung, có thể sử dụng tooltip
            },
            {
              label: "Tổng số lượng sản phẩm",
              data: totalProductQuantities, // Dữ liệu tổng số lượng sản phẩm
              backgroundColor: "#ffeb3b", // Màu sắc khác cho tổng số lượng
              borderColor: "#fbc02d",
              borderWidth: 1,
              borderDash: [5, 5], // Kiểu đường kẻ
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (!chartData || !statusChartData) {
    return <p>Không có dữ liệu để hiển thị.</p>;
  }

  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      {" "}
      <Grid item xs={12}>
        <Typography variant="h6" align="center" gutterBottom>
          Số lượng sản phẩm theo trạng thái
        </Typography>
        <Bar
          data={statusChartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Thống kê số lượng sản phẩm theo trạng thái",
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const productName = tooltipItem.label;
                    const productCount = tooltipItem.raw;
                    const totalQuantity =
                      statusChartData.datasets[1].data[tooltipItem.dataIndex];
                    return `${productName}: ${productCount} sản phẩm (Tổng số: ${totalQuantity})`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Tên sản phẩm",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Số lượng sản phẩm",
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" align="center" gutterBottom>
          Sản phẩm được yêu thích nhất
        </Typography>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Thống kê sản phẩm yêu thích nhất",
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ProductStatisticsChart;
