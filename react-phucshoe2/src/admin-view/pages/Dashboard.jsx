// Dashboard.jsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const onNavigateRouter = (routerName) => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    navigate(routerName);
  };
  const onLogout = () => {
    // Use js-cookie to remove the "authToken" cookie
    Cookies.remove("accessToken");

    // Optionally, remove other cookies if needed
    // Cookies.remove("anotherCookieName");

    // Redirect to the login page after logout
    navigate("/login");
  };
  return (
    <>
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li
            onClick={(e) => {
              e.preventDefault();
              onNavigateRouter("/admin/categories");
            }}
          >
            <a href="">Danh Mục</a>
          </li>{" "}
          <li
            onClick={(e) => {
              e.preventDefault();
              onNavigateRouter("/admin/movie");
            }}
          >
            <a href="">Phim</a>
          </li>{" "}
          <li
            onClick={(e) => {
              e.preventDefault();
              onNavigateRouter("/admin/theaters");
            }}
          >
            <a href="">Phòng</a>
          </li>{" "}
          <li
            onClick={(e) => {
              e.preventDefault();
              onNavigateRouter("/admin/seats");
            }}
          >
            <a href="">Ghế</a>
          </li>{" "}
          <li
            onClick={(e) => {
              e.preventDefault();
              onNavigateRouter("/admin/screening");
            }}
          >
            <a href="">Lịch Chiếu</a>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              onNavigateRouter("/admin/users");
            }}
          >
            <a href="">Tài Khoản</a>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              onNavigateRouter("/admin/order");
            }}
          >
            <a href="">Đơn hàng</a>
          </li>
          <li>
            <a href="">Báo cáo</a>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              onLogout();
            }}
          >
            <a href="">Đăng Xuất</a>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="admin-header">
          {/* <h1>Chào mừng đến với trang quản trị</h1> */}
        </div>
        <section>
          <div className="admin-content">
            <div className="container-admin-content">
              <Outlet /> {/* Vị trí render các route con */}
            </div>
          </div>
        </section>
        <div className="admin-footer"></div>
      </div>
    </>
  );
};

export default Dashboard;
