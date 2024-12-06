import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Grid, Typography } from "@mui/material";

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = ({ apiUrl, title }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data?.DT || [];

        // Xử lý dữ liệu để đưa vào biểu đồ
        const labels = data.map(
          (item) =>
            item.brandName ||
            item.colorName ||
            item.materialName ||
            item.size ||
            item.styleName ||
            item.purposeName ||
            item.genderName ||
            item.categoryTypeName
        );
        const values = data.map((item) => item.productCount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Số lượng sản phẩm",
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
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
  }, [apiUrl]);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (!chartData) {
    return <p>Không có dữ liệu để hiển thị.</p>;
  }

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h5" align="center" gutterBottom>
        {title}
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
              text: title,
            },
          },
        }}
      />
    </Grid>
  );
};

const CategoryProductsChart = () => {
  const api = process.env.REACT_APP_URL_SERVER;
  const apiEndpoints = [
    {
      url: `${api}/thong-ke/products-by-brand`,
      title: "Thống kê số lượng sản phẩm theo thương hiệu",
    },
    {
      url: `${api}/thong-ke/products-by-color`,
      title: "Thống kê sản phẩm theo màu sắc",
    },
    {
      url: `${api}/thong-ke/products-by-material`,
      title: "Thống kê sản phẩm theo chất liệu",
    },
    {
      url: `${api}/thong-ke/products-by-size`,
      title: "Thống kê sản phẩm theo kích cỡ",
    },
    {
      url: `${api}/thong-ke/products-by-style`,
      title: "Thống kê sản phẩm theo phong cách",
    },
    {
      url: `${api}/thong-ke/products-by-gender`,
      title: "Thống kê sản phẩm theo giới tính",
    },
    {
      url: `${api}/thong-ke/products-by-category-type`,
      title: "Thống kê sản phẩm theo loại danh mục",
    },
    {
      url: `${api}/thong-ke/products-by-usage-purpose`,
      title: "Thống kê sản phẩm theo mục đích sử dụng",
    },
  ];

  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      {apiEndpoints.map((endpoint, index) => (
        <StatisticsChart
          key={index}
          apiUrl={endpoint.url}
          title={endpoint.title}
        />
      ))}
    </Grid>
  );
};

export default CategoryProductsChart;
