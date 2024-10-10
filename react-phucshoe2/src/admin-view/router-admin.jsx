/* eslint-disable no-sparse-arrays */
import { useRoutes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import Movies from "./pages/Movies";
import TheaterList from "./pages/Theaters";
import Seats from "./pages/Seats";
import ScreeningList from "./pages/Screening";

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
          path: "users", // Khi vào "/admin/users" sẽ render Users
          element: <Users />,
        },
        {
          path: "categories", // Khi vào "/admin/users" sẽ render Users
          element: <Categories />,
        },
        ,
        {
          path: "movie", // Khi vào "/admin/users" sẽ render Users
          element: <Movies />,
        },
        {
          path: "theaters", // Khi vào "/admin/users" sẽ render Users
          element: <TheaterList />,
        },
        {
          path: "screening", // Khi vào "/admin/users" sẽ render Users
          element: <ScreeningList />,
        },
        {
          path: "seats", // Khi vào "/admin/users" sẽ render Users
          element: <Seats />,
        },
        {
          path: "order", // Khi vào "/admin/users" sẽ render Users
          element: <Seats />,
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
