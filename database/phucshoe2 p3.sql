-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 09, 2024 lúc 04:00 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `phucshoe2`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `binh_luan`
--

CREATE TABLE `binh_luan` (
  `ID_BINH_LUAN` int(11) NOT NULL,
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_NGUOI_DUNG` int(11) NOT NULL,
  `DANH_GIA` int(11) DEFAULT NULL,
  `NGAY_TAO_BAI_VIET` datetime DEFAULT NULL,
  `NOI_DUNG_CMT` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_hoa_don`
--

CREATE TABLE `chi_tiet_hoa_don` (
  `ID_CHI_TIET_HOA_DON` int(11) NOT NULL,
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_DON_HANG` int(11) NOT NULL,
  `SO_LUONG_SP` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `co_kich_co`
--

CREATE TABLE `co_kich_co` (
  `SO_LUONG_KICHCO` int(11) DEFAULT NULL,
  `ID_COKICHCO` int(11) NOT NULL,
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_KICH_CO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `don_hang`
--

CREATE TABLE `don_hang` (
  `ID_DON_HANG` int(11) NOT NULL,
  `ID_NGUOI_DUNG` int(11) NOT NULL,
  `ID_THANH_TOAN` int(11) NOT NULL,
  `TONG_TIEN` float DEFAULT NULL,
  `TRANG_THAI_DON_HANG` varchar(255) DEFAULT NULL,
  `GHI_CHU_DONHANG` varchar(255) DEFAULT NULL,
  `NGAY_CAP_NHAT_DONHANG` datetime DEFAULT NULL,
  `NGAY_TAO_DONHANG` datetime DEFAULT NULL,
  `TRANG_THAI_DONHANG` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gio_hang`
--

CREATE TABLE `gio_hang` (
  `ID_GIO_HANG` int(11) NOT NULL,
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_NGUOI_DUNG` int(11) NOT NULL,
  `SO_LUONG_GIOHANG` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `id_bai_viet`
--

CREATE TABLE `id_bai_viet` (
  `ID_BAI_VIET` int(11) NOT NULL,
  `ID_NGUOI_DUNG` int(11) NOT NULL,
  `TIEU_DE` varchar(255) DEFAULT NULL,
  `NGAY_TAO_BLOG` datetime DEFAULT NULL,
  `NGAY_CAP_NHAT_BAIVIET` datetime DEFAULT NULL,
  `NOI_DUNG_BAIVIET` varchar(255) DEFAULT NULL,
  `TRANG_THAI_BAIVIET` varchar(255) DEFAULT NULL,
  `HINH_ANH_BAIVIET` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kich_co`
--

CREATE TABLE `kich_co` (
  `ID_KICH_CO` int(11) NOT NULL,
  `KICH_CO` varchar(255) DEFAULT NULL,
  `TRANG_THAI_KICH_CO` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loai_danh_muc`
--

CREATE TABLE `loai_danh_muc` (
  `ID_DANH_MUC` varchar(255) NOT NULL,
  `TEN_DANH_MUC` varchar(255) DEFAULT NULL,
  `MO_TA_LOAI_DANH_MUC` varchar(255) DEFAULT NULL,
  `TRANG_THAI_DANHMUC` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoi_dung`
--

CREATE TABLE `nguoi_dung` (
  `ID_NGUOI_DUNG` int(11) NOT NULL,
  `TEN_DANG_NHAP` varchar(255) DEFAULT NULL,
  `MAT_KHAU` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `VAI_TRO` varchar(255) DEFAULT NULL,
  `HO_TEN` varchar(255) DEFAULT NULL,
  `SO_DIEN_THOAI` varchar(255) DEFAULT NULL,
  `DIA_CHI` varchar(255) DEFAULT NULL,
  `TRANG_THAI_USER` varchar(255) DEFAULT NULL,
  `NGAY_TAO_USER` datetime DEFAULT NULL,
  `NGAY_CAP_NHAT_USER` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `san_pham`
--

CREATE TABLE `san_pham` (
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_DANH_MUC` varchar(255) NOT NULL,
  `TEN_SAN_PHAM` varchar(255) DEFAULT NULL,
  `GIA` float DEFAULT NULL,
  `MO_TA_SAN_PHAM` varchar(255) DEFAULT NULL,
  `HINH_ANH_SANPHAM` varchar(255) DEFAULT NULL,
  `TRANG_THAI_SANPHAM` varchar(255) DEFAULT NULL,
  `NGAY_TAO_SANPHAM` datetime DEFAULT NULL,
  `NGAY_CAP_NHAT_SANPHAM` varchar(255) DEFAULT NULL,
  `SO_LUONG_SANPHAM` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thanh_toan`
--

CREATE TABLE `thanh_toan` (
  `ID_THANH_TOAN` int(11) NOT NULL,
  `PHUONG_THUC_THANH_TOAN` varchar(255) DEFAULT NULL,
  `NGAY_THANH_TOAN` datetime DEFAULT NULL,
  `TRANG_THAI_THANH_TOAN` varchar(266) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tin_nhan`
--

CREATE TABLE `tin_nhan` (
  `ID_TIN_NHAN` int(11) NOT NULL,
  `ID_NGUOI_DUNG` int(11) NOT NULL,
  `NGAY_TAO_TIN_NHAN` datetime DEFAULT NULL,
  `NOI_DUNG_TINNHAN` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `yeu_thich`
--

CREATE TABLE `yeu_thich` (
  `ID_YEU_THICH` int(11) NOT NULL,
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_NGUOI_DUNG` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `binh_luan`
--
ALTER TABLE `binh_luan`
  ADD PRIMARY KEY (`ID_BINH_LUAN`),
  ADD KEY `FK_BINH_LUA_CO_BINH_L_NGUOI_DU` (`ID_NGUOI_DUNG`),
  ADD KEY `FK_BINH_LUA__UOC_BINH_SAN_PHAM` (`ID_SAN_PHAM`);

--
-- Chỉ mục cho bảng `chi_tiet_hoa_don`
--
ALTER TABLE `chi_tiet_hoa_don`
  ADD PRIMARY KEY (`ID_CHI_TIET_HOA_DON`),
  ADD KEY `FK_CHI_TIET_CO_CHI_TI_DON_HANG` (`ID_DON_HANG`),
  ADD KEY `FK_CHI_TIET__UOC_CHI__SAN_PHAM` (`ID_SAN_PHAM`);

--
-- Chỉ mục cho bảng `co_kich_co`
--
ALTER TABLE `co_kich_co`
  ADD PRIMARY KEY (`ID_COKICHCO`),
  ADD KEY `FK_CO_KICH__CO_KICH_C_KICH_CO` (`ID_KICH_CO`),
  ADD KEY `FK_CO_KICH___UOC_KICH_SAN_PHAM` (`ID_SAN_PHAM`);

--
-- Chỉ mục cho bảng `don_hang`
--
ALTER TABLE `don_hang`
  ADD PRIMARY KEY (`ID_DON_HANG`),
  ADD KEY `FK_DON_HANG_CO_THANH__THANH_TO` (`ID_THANH_TOAN`),
  ADD KEY `FK_DON_HANG_TAO__ON_H_NGUOI_DU` (`ID_NGUOI_DUNG`);

--
-- Chỉ mục cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD PRIMARY KEY (`ID_GIO_HANG`),
  ADD KEY `FK_GIO_HANG_CO_SAN_PHAM` (`ID_SAN_PHAM`),
  ADD KEY `FK_GIO_HANG_CO_GIO_HA_NGUOI_DU` (`ID_NGUOI_DUNG`);

--
-- Chỉ mục cho bảng `id_bai_viet`
--
ALTER TABLE `id_bai_viet`
  ADD PRIMARY KEY (`ID_BAI_VIET`),
  ADD KEY `FK_ID_BAI_V_CO_BAI_VI_NGUOI_DU` (`ID_NGUOI_DUNG`);

--
-- Chỉ mục cho bảng `kich_co`
--
ALTER TABLE `kich_co`
  ADD PRIMARY KEY (`ID_KICH_CO`);

--
-- Chỉ mục cho bảng `loai_danh_muc`
--
ALTER TABLE `loai_danh_muc`
  ADD PRIMARY KEY (`ID_DANH_MUC`);

--
-- Chỉ mục cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD PRIMARY KEY (`ID_NGUOI_DUNG`);

--
-- Chỉ mục cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`ID_SAN_PHAM`),
  ADD KEY `FK_SAN_PHAM_CO_DANH_M_LOAI_DAN` (`ID_DANH_MUC`);

--
-- Chỉ mục cho bảng `thanh_toan`
--
ALTER TABLE `thanh_toan`
  ADD PRIMARY KEY (`ID_THANH_TOAN`);

--
-- Chỉ mục cho bảng `tin_nhan`
--
ALTER TABLE `tin_nhan`
  ADD PRIMARY KEY (`ID_TIN_NHAN`),
  ADD KEY `FK_TIN_NHAN_CO_TIN_NH_NGUOI_DU` (`ID_NGUOI_DUNG`);

--
-- Chỉ mục cho bảng `yeu_thich`
--
ALTER TABLE `yeu_thich`
  ADD PRIMARY KEY (`ID_YEU_THICH`),
  ADD KEY `FK_YEU_THIC_CO_YEU_TH_NGUOI_DU` (`ID_NGUOI_DUNG`),
  ADD KEY `FK_YEU_THIC__UOC_SAN_PHAM` (`ID_SAN_PHAM`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `binh_luan`
--
ALTER TABLE `binh_luan`
  ADD CONSTRAINT `FK_BINH_LUA_CO_BINH_L_NGUOI_DU` FOREIGN KEY (`ID_NGUOI_DUNG`) REFERENCES `nguoi_dung` (`ID_NGUOI_DUNG`),
  ADD CONSTRAINT `FK_BINH_LUA__UOC_BINH_SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `san_pham` (`ID_SAN_PHAM`);

--
-- Các ràng buộc cho bảng `chi_tiet_hoa_don`
--
ALTER TABLE `chi_tiet_hoa_don`
  ADD CONSTRAINT `FK_CHI_TIET_CO_CHI_TI_DON_HANG` FOREIGN KEY (`ID_DON_HANG`) REFERENCES `don_hang` (`ID_DON_HANG`),
  ADD CONSTRAINT `FK_CHI_TIET__UOC_CHI__SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `san_pham` (`ID_SAN_PHAM`);

--
-- Các ràng buộc cho bảng `co_kich_co`
--
ALTER TABLE `co_kich_co`
  ADD CONSTRAINT `FK_CO_KICH__CO_KICH_C_KICH_CO` FOREIGN KEY (`ID_KICH_CO`) REFERENCES `kich_co` (`ID_KICH_CO`),
  ADD CONSTRAINT `FK_CO_KICH___UOC_KICH_SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `san_pham` (`ID_SAN_PHAM`);

--
-- Các ràng buộc cho bảng `don_hang`
--
ALTER TABLE `don_hang`
  ADD CONSTRAINT `FK_DON_HANG_CO_THANH__THANH_TO` FOREIGN KEY (`ID_THANH_TOAN`) REFERENCES `thanh_toan` (`ID_THANH_TOAN`),
  ADD CONSTRAINT `FK_DON_HANG_TAO__ON_H_NGUOI_DU` FOREIGN KEY (`ID_NGUOI_DUNG`) REFERENCES `nguoi_dung` (`ID_NGUOI_DUNG`);

--
-- Các ràng buộc cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD CONSTRAINT `FK_GIO_HANG_CO_GIO_HA_NGUOI_DU` FOREIGN KEY (`ID_NGUOI_DUNG`) REFERENCES `nguoi_dung` (`ID_NGUOI_DUNG`),
  ADD CONSTRAINT `FK_GIO_HANG_CO_SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `san_pham` (`ID_SAN_PHAM`);

--
-- Các ràng buộc cho bảng `id_bai_viet`
--
ALTER TABLE `id_bai_viet`
  ADD CONSTRAINT `FK_ID_BAI_V_CO_BAI_VI_NGUOI_DU` FOREIGN KEY (`ID_NGUOI_DUNG`) REFERENCES `nguoi_dung` (`ID_NGUOI_DUNG`);

--
-- Các ràng buộc cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD CONSTRAINT `FK_SAN_PHAM_CO_DANH_M_LOAI_DAN` FOREIGN KEY (`ID_DANH_MUC`) REFERENCES `loai_danh_muc` (`ID_DANH_MUC`);

--
-- Các ràng buộc cho bảng `tin_nhan`
--
ALTER TABLE `tin_nhan`
  ADD CONSTRAINT `FK_TIN_NHAN_CO_TIN_NH_NGUOI_DU` FOREIGN KEY (`ID_NGUOI_DUNG`) REFERENCES `nguoi_dung` (`ID_NGUOI_DUNG`);

--
-- Các ràng buộc cho bảng `yeu_thich`
--
ALTER TABLE `yeu_thich`
  ADD CONSTRAINT `FK_YEU_THIC_CO_YEU_TH_NGUOI_DU` FOREIGN KEY (`ID_NGUOI_DUNG`) REFERENCES `nguoi_dung` (`ID_NGUOI_DUNG`),
  ADD CONSTRAINT `FK_YEU_THIC__UOC_SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `san_pham` (`ID_SAN_PHAM`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
