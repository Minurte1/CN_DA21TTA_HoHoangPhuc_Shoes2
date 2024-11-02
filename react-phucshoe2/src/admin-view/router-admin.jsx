/* eslint-disable no-sparse-arrays */
import { useRoutes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import Users from "./pages/Users";

const AdminRouter = () => {
  const element = useRoutes([
    {
      path: "", // Route chính cho Dashboard
      element: <Dashboard />,
      children: [
        {
          path: "", // Khi vào "/admin/" sẽ render Users
          element: <Users />,
        },

        {
          path: "*",
          element: <Navigate to="/admin/users" replace />, // Chuyển hướng nếu không tìm thấy route
        },
      ],
    },
  ]);
  return element;
};

export default AdminRouter;
