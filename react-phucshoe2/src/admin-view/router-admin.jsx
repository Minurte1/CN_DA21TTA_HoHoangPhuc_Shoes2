import { useRoutes, Navigate } from "react-router-dom";
import DashboardAdmin from "./pages/thongkeAdmin/DashboardAdmin";

import DanhSachNguoiDungAdmin from "./pages/quanLyNguoiDung/DanhSachNguoiDungAdmin";
import ChatLieuManager from "./pages/quanLySanPham/category/chatLieu";
import GioiTinhManager from "./pages/quanLySanPham/category/gioiTinh";
import KichCoManager from "./pages/quanLySanPham/category/kichCo";
import LoaiDanhMucManager from "./pages/quanLySanPham/category/theLoai";
import MauSacManager from "./pages/quanLySanPham/category/mauSac";
import MucDichSuDungManager from "./pages/quanLySanPham/category/mucDichSuDung";
import PhongCachManager from "./pages/quanLySanPham/category/phongCach";
import ThuongHieuManager from "./pages/quanLySanPham/category/thuongHieu";
import SanPhamManager from "./pages/quanLySanPham/sanPham";
import CarouselManager from "./pages/quanLySanPham/carouselSanPham";
import ThanhToanManager from "./pages/thanhToan/thanhToan";

import TatCaDonHangAdmin from "./pages/thanhToan/donHangAdmin";
import TatCaDonHangAdminSuccess from "./pages/thanhToan/donHangAdminSuccess";
import TatCaDonHangAdminCancel from "./pages/thanhToan/donHangAdminCancel";
import TatCaDonHangAdminProcess from "./pages/thanhToan/donHangAdminProcess";
import MessengerAdmin from "./pages/tuongTacNguoiDung/page/messengerAdmin";
import BlogManager from "./pages/tuongTacNguoiDung/page/blogAdmin";

// import QuanLySanPham from "./pages/QuanLySanPham";
// import TuongTacNguoiDung from "./pages/TuongTacNguoiDung";

const RouterAdmin = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <DashboardAdmin />,
    },

    {
      path: "/nguoi-dung/danh-sach",
      element: <DanhSachNguoiDungAdmin />,
    },
    {
      path: "/san-pham/them-san-pham",
      element: <SanPhamManager />,
    },
    {
      path: "/san-pham/carousel-product",
      element: <CarouselManager />,
    },
    {
      path: "/san-pham/danh-muc/chat-lieu",
      element: <ChatLieuManager />,
    },
    {
      path: "/san-pham/danh-muc/gioi-tinh",
      element: <GioiTinhManager />,
    },
    {
      path: "/san-pham/danh-muc/kich-co",
      element: <KichCoManager />,
    },
    {
      path: "/san-pham/danh-muc/the-loai",
      element: <LoaiDanhMucManager />,
    },
    {
      path: "/san-pham/danh-muc/mau-sac",
      element: <MauSacManager />,
    },
    {
      path: "/san-pham/danh-muc/muc-dich",
      element: <MucDichSuDungManager />,
    },
    {
      path: "/san-pham/danh-muc/phong-cach",
      element: <PhongCachManager />,
    },
    {
      path: "/san-pham/danh-muc/thuong-hieu",
      element: <ThuongHieuManager />,
    },
    {
      path: "/thanh-toan/them-thanh-toan",
      element: <ThanhToanManager />,
    },
    {
      path: "/don-hang/tat-ca",
      element: <TatCaDonHangAdmin />,
    },
    {
      path: "/don-hang/da-giao",
      element: <TatCaDonHangAdminSuccess />,
    },
    {
      path: "/don-hang/da-huy",
      element: <TatCaDonHangAdminCancel />,
    },
    {
      path: "/don-hang/dang-xu-ly",
      element: <TatCaDonHangAdminProcess />,
    },
    {
      path: "/tuong-tac-nguoi-dung/messages",
      element: <MessengerAdmin />,
    },
    {
      path: "/blog",
      element: <BlogManager />,
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
