import { useRoutes, Navigate } from "react-router-dom";
import DashboardAdmin from "./pages/DashboardAdmin";
import DonHangGame from "./pages/DonHang";
import DanhSachNguoiDungAdmin from "./pages/quanLyNguoiDung/DanhSachNguoiDungAdmin";
import ChatLieuManager from "./pages/quanLySanPham/category/chatLieu";

// import QuanLySanPham from "./pages/QuanLySanPham";
// import TuongTacNguoiDung from "./pages/TuongTacNguoiDung";

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
      path: "/nguoi-dung/danh-sach",
      element: <DanhSachNguoiDungAdmin />,
    },
    {
      path: "/them-san-pham",
      element: <DanhSachNguoiDungAdmin />,
    },
    {
      path: "/chat-lieu-san-pham",
      element: <ChatLieuManager />,
    },
    // {
    //   path: "/san-pham",
    //   element: <QuanLySanPham />,
    // },
    // {
    //   path: "/tuong-tac-nguoi-dung",
    //   element: <TuongTacNguoiDung />,
    // },
    {
      path: "*",
      element: <Navigate to="/login" replace />, // Chuyển hướng nếu không tìm thấy route
    },
  ]);

  return element;
};

export default RouterAdmin;
