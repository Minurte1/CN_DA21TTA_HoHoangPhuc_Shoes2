import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Grid, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const RevenueDashboard = () => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    fetchCombinedData();
  }, []);

  const fetchCombinedData = async () => {
    const monthlyResponse = [{ monthYear: "2024-11", totalRevenue: 3240000 }];
    const dailyResponse = [
      { date: "2024-11-20T17:00:00.000Z", totalRevenue: 1650000 },
      { date: "2024-11-21T17:00:00.000Z", totalRevenue: 1050000 },
      { date: "2024-11-25T17:00:00.000Z", totalRevenue: 540000 },
      { date: "2024-12-05T17:00:00.000Z", totalRevenue: 230000 },
    ];
    const yearlyResponse = [{ year: 2024, totalRevenue: 3470000 }];

    const allLabels = [
      ...monthlyResponse.map((item) => item.monthYear),
      ...dailyResponse.map((item) =>
        new Date(item.date).toLocaleDateString("vi-VN")
      ),
      ...yearlyResponse.map((item) => item.year.toString()),
    ];

    const uniqueLabels = [...new Set(allLabels)].sort();

    const monthlyData = uniqueLabels.map(
      (label) =>
        monthlyResponse.find((item) => item.monthYear === label)
          ?.totalRevenue || 0
    );
    const dailyData = uniqueLabels.map(
      (label) =>
        dailyResponse.find(
          (item) => new Date(item.date).toLocaleDateString("vi-VN") === label
        )?.totalRevenue || 0
    );
    const yearlyData = uniqueLabels.map(
      (label) =>
        yearlyResponse.find((item) => item.year.toString() === label)
          ?.totalRevenue || 0
    );

    setCombinedData({
      labels: uniqueLabels,
      monthlyData,
      dailyData,
      yearlyData,
    });
  };

  const chartData = {
    labels: combinedData.labels,
    datasets: [
      {
        label: "Doanh thu theo tháng",
        data: combinedData.monthlyData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4, // Đường cong mềm mại
        fill: true, // Làm đầy màu
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

  return (
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
  );
};

export default RevenueDashboard;
