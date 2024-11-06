import { useRoutes, Navigate } from "react-router-dom";
import DashboardAdmin from "./pages/DashboardAdmin";
import DonHangGame from "./pages/DonHang";
import DanhSachNguoiDungAdmin from "./pages/quanLyNguoiDung/DanhSachNguoiDungAdmin";
import ChatLieuManager from "./pages/quanLySanPham/category/chatLieu";
import GioiTinhManager from "./pages/quanLySanPham/category/gioiTinh";

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
      path: "/san-pham/danh-muc/chat-lieu",
      element: <ChatLieuManager />,
    },
    {
      path: "/san-pham/danh-muc/gioi-tinh",
      element: <GioiTinhManager />,
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
