import { useRoutes, Navigate } from "react-router-dom";

import UserProfile from "./pages/DashboardUser";
import DonHangUser from "./pages/DonHang";
import PasswordAndSetting from "./pages/PasswordAndSetting";
import LichSuMuaHangUser from "./pages/lichSuMuaHang";

const UserRouter = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <UserProfile />,
    },
    {
      path: "/don-hang",
      element: <DonHangUser />,
    },
    {
      path: "/mat-khau-cai-dat",
      element: <PasswordAndSetting />,
    },
    {
      path: "/lich-su-mua-hang",
      element: <LichSuMuaHangUser />,
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ]);

  return element;
};

export default UserRouter;
