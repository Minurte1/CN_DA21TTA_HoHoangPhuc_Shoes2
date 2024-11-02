import { useRoutes, Navigate } from "react-router-dom";
import DashboardAdmin from "./pages/DashboardAdmin";
import DonHangGame from "./pages/DonHang";

const RouterAdmin = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <DashboardAdmin />,
    },
    {
      path: "/donhang",
      element: <DonHangGame />,
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />, // Chuyển hướng nếu không tìm thấy route
    },
  ]);

  return element;
};

export default RouterAdmin;
