import { useRoutes, Navigate } from "react-router-dom";

import UserProfile from "./pages/DashboardUser";
import DonHangGame from "./pages/DonHang";

const UserRouter = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <UserProfile />,
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

export default UserRouter;
