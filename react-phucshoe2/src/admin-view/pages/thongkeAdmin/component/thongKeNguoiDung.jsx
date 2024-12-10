import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";
import { CircularProgress } from "@mui/material"; // Dùng CircularProgress từ MUI để hiển thị loading
import { getThemeConfig } from "../../../../services/themeService";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const UsersByProvinceChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true); // Thêm state loading
  const api = process.env.REACT_APP_URL_SERVER;
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/thong-ke/users-by-province`);

        if (
          response.data &&
          response.data.EC === 1 &&
          Array.isArray(response.data.DT)
        ) {
          const data = response.data.DT;
          const provinces = data.map((item) => item.province);
          const userCounts = data.map((item) => item.userCount);

          setChartData({
            labels: provinces,
            datasets: [
              {
                label: "Số lượng người dùng",
                data: userCounts,
                backgroundColor: "#4caf50", // Màu sắc cột
                borderColor: "#388e3c",
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error("Dữ liệu trả về không đúng định dạng hoặc bị thiếu.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false); // Kết thúc việc tải dữ liệu
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: currentTheme.backgroundColor,
        height: "auto",
        width: "100%",
        color: currentTheme.color,
      }}
    >
      <h2>Thống kê người dùng theo tỉnh/thành phố</h2>
      <div style={{ width: "100%", height: "400px", margin: "0 auto" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <CircularProgress /> {/* Hiển thị vòng quay khi đang tải */}
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "400px",
              overflowX: "auto",
              margin: "0 auto",
            }}
          >
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Biểu đồ số lượng người dùng theo tỉnh/thành phố",
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Tỉnh/Thành phố",
                    },
                    ticks: {
                      maxRotation: 90, // Xoay nhãn nếu cần thiết
                      minRotation: 45,
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Số lượng người dùng",
                    },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        )}
      </div>{" "}
      <div style={{ width: "100%", height: "400px", margin: "0 auto" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <CircularProgress /> {/* Hiển thị vòng quay khi đang tải */}
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "400px",
              overflowX: "auto",
              margin: "0 auto",
            }}
          >
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Biểu đồ số lượng người dùng theo tỉnh/thành phố",
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Tỉnh/Thành phố",
                    },
                    ticks: {
                      maxRotation: 90, // Xoay nhãn nếu cần thiết
                      minRotation: 45,
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Số lượng người dùng",
                    },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default UsersByProvinceChart;
