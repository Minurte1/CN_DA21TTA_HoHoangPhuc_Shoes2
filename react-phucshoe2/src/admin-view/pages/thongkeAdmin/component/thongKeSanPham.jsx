import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Grid, Typography } from "@mui/material";
// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const MostLikedProductsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = process.env.REACT_APP_URL_SERVER;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/thong-ke/most-liked-products`);
        const data = response.data?.DT || [];

        // Xử lý dữ liệu để đưa vào biểu đồ
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (!chartData) {
    return <p>Không có dữ liệu để hiển thị.</p>;
  }

  return (
    <>
      {" "}
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} md={4}>
          {" "}
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
    </>
  );
};

export default MostLikedProductsChart;
