-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: PhucShoe2
-- ------------------------------------------------------
-- Server version	5.7.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BINH_LUAN`
--

DROP TABLE IF EXISTS `BINH_LUAN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BINH_LUAN` (
  `ID_BINH_LUAN` int(11) NOT NULL AUTO_INCREMENT,
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_NGUOI_DUNG` int(11) NOT NULL,
  `DANH_GIA` int(11) DEFAULT NULL,
  `NGAY_TAO_BAI_VIET` datetime DEFAULT NULL,
  `NOI_DUNG_CMT` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_BINH_LUAN`),
  KEY `FK_BINH_LUA_CO_BINH_L_NGUOI_DU` (`ID_NGUOI_DUNG`),
  KEY `FK_BINH_LUA__UOC_BINH_SAN_PHAM` (`ID_SAN_PHAM`),
  CONSTRAINT `FK_BINH_LUA_CO_BINH_L_NGUOI_DU` FOREIGN KEY (`ID_NGUOI_DUNG`) REFERENCES `NGUOI_DUNG` (`ID_NGUOI_DUNG`),
  CONSTRAINT `FK_BINH_LUA__UOC_BINH_SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `SAN_PHAM` (`ID_SAN_PHAM`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BINH_LUAN`
--

LOCK TABLES `BINH_LUAN` WRITE;
/*!40000 ALTER TABLE `BINH_LUAN` DISABLE KEYS */;
/*!40000 ALTER TABLE `BINH_LUAN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CAROUSEL_PRODUCTS`
--

DROP TABLE IF EXISTS `CAROUSEL_PRODUCTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CAROUSEL_PRODUCTS` (
  `ID_CAROUSEL` int(11) NOT NULL AUTO_INCREMENT,
  `ID_SAN_PHAM` int(11) DEFAULT NULL,
  `HINH_ANH_NEN_CAROUSEL` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HINH_ANH_ICON_CAROUSEL` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MO_TA_CAROUSEL` text COLLATE utf8mb4_unicode_ci,
  `TRANG_THAI_CAROUSEL` tinyint(1) DEFAULT '1',
  `NGAY_TAO_CAROUSEL` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `NGAY_CAP_NHAT_CAROUSEL` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_CAROUSEL`),
  KEY `ID_SAN_PHAM` (`ID_SAN_PHAM`),
  CONSTRAINT `CAROUSEL_PRODUCTS_ibfk_1` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `SAN_PHAM` (`ID_SAN_PHAM`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CAROUSEL_PRODUCTS`
--

LOCK TABLES `CAROUSEL_PRODUCTS` WRITE;
/*!40000 ALTER TABLE `CAROUSEL_PRODUCTS` DISABLE KEYS */;
INSERT INTO `CAROUSEL_PRODUCTS` VALUES (1,4,'images-1731152930528.jpg','images-1731152930530.png','đây là sản phẩm carousel lv1',1,'2024-11-09 11:46:05','2024-11-09 12:26:24'),(2,25,'images-1731152942604.png','images-1731152942605.png','ádadadadad',1,'2024-11-09 11:49:02','2024-11-09 12:26:20'),(3,22,'images-1731153002072.png','images-1731153002073.png','adasdadad',1,'2024-11-09 11:50:02','2024-11-09 12:26:17'),(4,13,'images-1731153011836.png','images-1731153011838.jpg','adadad',1,'2024-11-09 11:50:11','2024-11-09 12:26:14'),(5,7,'images-1731155158634.png','images-1731155158635.png','adadad1',1,'2024-11-09 11:50:20','2024-11-09 12:26:09'),(6,27,'images-1731157150633.jpg','images-1731155197654.jpg','ádasdasd',1,'2024-11-09 12:26:37','2024-11-09 12:59:10'),(7,17,'images-1731155212880.png','images-1731155212887.png','ádasd',1,'2024-11-09 12:26:52','2024-11-09 12:26:52');
/*!40000 ALTER TABLE `CAROUSEL_PRODUCTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CHAT_LIEU`
--

DROP TABLE IF EXISTS `CHAT_LIEU`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CHAT_LIEU` (
  `CHAT_LIEU_ID_` int(11) NOT NULL AUTO_INCREMENT,
  `TEN_CHAT_LIEU_` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_TEN_CHAT_LIEU_` datetime DEFAULT NULL,
  `UPDATE_CHAT_LIEU` datetime DEFAULT NULL,
  `TRANG_THAI_CHAT_LIEU` int(11) DEFAULT NULL,
  `MO_TA_CHAT_LIEU` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`CHAT_LIEU_ID_`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CHAT_LIEU`
--

LOCK TABLES `CHAT_LIEU` WRITE;
/*!40000 ALTER TABLE `CHAT_LIEU` DISABLE KEYS */;
INSERT INTO `CHAT_LIEU` VALUES (13,'Da','2024-11-05 15:46:17','2024-11-07 21:36:40',1,'Giày làm bằng chất liệu da là loại giày sử dụng các loại da như da thật, da tổng hợp, hoặc da lộn để sản xuất, mang lại sự sang trọng, bền bỉ và thoải mái cho người dùng.'),(14,'Vải','2024-11-05 16:00:34','2024-11-07 21:36:02',1,'Giày làm bằng chất liệu vải là loại giày sử dụng các loại vải như canvas, denim, lưới (mesh), và nhiều loại vải dệt khác để làm phần thân giày. Loại giày này rất phổ biến vì chúng thoải mái, dễ bảo quản và thường có giá thành phải chăng.'),(15,'Tổng hợp','2024-11-05 16:00:50','2024-11-07 21:35:23',1,'Giày làm từ chất liệu tổng hợp là giày được sản xuất từ các vật liệu nhân tạo, không phải tự nhiên'),(16,'Cao su','2024-11-05 16:01:04','2024-11-05 16:27:22',1,'một trong những chất liệu phổ biến được sử dụng trong sản xuất giày, đặc biệt là trong đế giày. Dưới đây là một số thông tin về cao su và ứng dụng của nó trong giày:'),(17,'Chất liệu tổng hợp ','2024-11-05 16:02:10','2024-11-05 16:26:39',1,'Các loại chất liệu như EVA (ethylene-vinyl acetate) thường được sử dụng cho đế giày, nhẹ và có khả năng đàn hồi tốt.');
/*!40000 ALTER TABLE `CHAT_LIEU` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CHI_TIET_HOA_DON`
--

DROP TABLE IF EXISTS `CHI_TIET_HOA_DON`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CHI_TIET_HOA_DON` (
  `ID_CHI_TIET_HOA_DON` int(11) NOT NULL AUTO_INCREMENT,
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_DON_HANG` int(11) NOT NULL,
  `SO_LUONG_SP` int(11) DEFAULT NULL,
  `GIA_SAN_PHAM_CHI_TIET` float DEFAULT NULL,
  `DANH_GIA` varchar(255) DEFAULT NULL,
  `BINH_LUAN` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID_CHI_TIET_HOA_DON`),
  KEY `FK_CHI_TIET_CO_CHI_TI_DON_HANG` (`ID_DON_HANG`),
  KEY `FK_CHI_TIET__UOC_CHI__SAN_PHAM` (`ID_SAN_PHAM`),
  CONSTRAINT `FK_CHI_TIET_CO_CHI_TI_DON_HANG` FOREIGN KEY (`ID_DON_HANG`) REFERENCES `DON_HANG` (`ID_DON_HANG`),
  CONSTRAINT `FK_CHI_TIET__UOC_CHI__SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `SAN_PHAM` (`ID_SAN_PHAM`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CHI_TIET_HOA_DON`
--

LOCK TABLES `CHI_TIET_HOA_DON` WRITE;
/*!40000 ALTER TABLE `CHI_TIET_HOA_DON` DISABLE KEYS */;
INSERT INTO `CHI_TIET_HOA_DON` VALUES (27,11,15,5,1400000,NULL,NULL),(28,5,15,1,250000,NULL,NULL),(29,8,16,5,900000,NULL,NULL),(30,4,16,1,150000,NULL,NULL),(31,8,17,5,900000,NULL,NULL),(32,4,17,1,150000,NULL,NULL),(33,8,18,5,900000,NULL,NULL),(34,4,18,1,150000,NULL,NULL),(35,8,19,5,900000,NULL,NULL),(36,4,19,1,150000,NULL,NULL);
/*!40000 ALTER TABLE `CHI_TIET_HOA_DON` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CO_KICH_CO`
--

DROP TABLE IF EXISTS `CO_KICH_CO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CO_KICH_CO` (
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_KICH_CO` int(11) NOT NULL,
  PRIMARY KEY (`ID_SAN_PHAM`,`ID_KICH_CO`),
  KEY `FK_CO_KICH__CO_KICH_C_KICH_CO` (`ID_KICH_CO`),
  CONSTRAINT `FK_CO_KICH__CO_KICH_C_KICH_CO` FOREIGN KEY (`ID_KICH_CO`) REFERENCES `KICH_CO` (`ID_KICH_CO`),
  CONSTRAINT `FK_CO_KICH__CO_KICH_C_SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `SAN_PHAM` (`ID_SAN_PHAM`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CO_KICH_CO`
--

LOCK TABLES `CO_KICH_CO` WRITE;
/*!40000 ALTER TABLE `CO_KICH_CO` DISABLE KEYS */;
INSERT INTO `CO_KICH_CO` VALUES (4,1),(36,1),(38,1),(39,1);
/*!40000 ALTER TABLE `CO_KICH_CO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DON_HANG`
--

DROP TABLE IF EXISTS `DON_HANG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DON_HANG` (
  `ID_DON_HANG` int(11) NOT NULL AUTO_INCREMENT,
  `ID_NGUOI_DUNG` int(11) NOT NULL,
  `ID_THANH_TOAN` int(11) NOT NULL,
  `TONG_TIEN` float DEFAULT NULL,
  `TRANG_THAI_DON_HANG` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GHI_CHU_DONHANG` varchar(255) DEFAULT NULL,
  `NGAY_CAP_NHAT_DONHANG` datetime DEFAULT NULL,
  `NGAY_TAO_DONHANG` datetime DEFAULT NULL,
  `ID_ODER` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID_DON_HANG`),
  KEY `FK_DON_HANG_CO_THANH__THANH_TO` (`ID_THANH_TOAN`),
  KEY `FK_DON_HANG_TAO__ON_H_NGUOI_DU` (`ID_NGUOI_DUNG`),
  CONSTRAINT `FK_DON_HANG_CO_THANH__THANH_TO` FOREIGN KEY (`ID_THANH_TOAN`) REFERENCES `THANH_TOAN` (`ID_THANH_TOAN`),
  CONSTRAINT `FK_DON_HANG_TAO__ON_H_NGUOI_DU` FOREIGN KEY (`ID_NGUOI_DUNG`) REFERENCES `NGUOI_DUNG` (`ID_NGUOI_DUNG`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DON_HANG`
--

LOCK TABLES `DON_HANG` WRITE;
/*!40000 ALTER TABLE `DON_HANG` DISABLE KEYS */;
INSERT INTO `DON_HANG` VALUES (15,6,1,1650000,'Giao dịch thành công',NULL,'2024-11-21 14:44:32','2024-11-21 14:41:51','PhucShoes - Mã đơn hàng: 8d97680f-7663-4420-87ce-52a4b1ec9ed6'),(16,6,1,1050000,'Đang chờ thanh toán',NULL,'2024-11-22 03:32:18','2024-11-22 03:32:18','PhucShoes - Mã đơn hàng: 7057f877-b3c1-48e1-8db4-e523e2a550ad'),(17,6,1,1050000,'Đang chờ thanh toán',NULL,'2024-11-22 03:34:15','2024-11-22 03:34:15','PhucShoes - Mã đơn hàng: a9415f7e-f412-41fc-b0e4-f098a76e7122'),(18,6,1,1050000,'Đang chờ thanh toán',NULL,'2024-11-22 03:35:35','2024-11-22 03:35:35','PhucShoes - Mã đơn hàng: 9fdc7f8c-a6ae-4647-b1b3-14ad91e69192'),(19,6,2,1050000,'Đang chờ thanh toán',NULL,'2024-11-22 03:42:03','2024-11-22 03:42:03','PhucShoes - Mã đơn hàng: 1ecae621-f8ff-44fd-86f4-611028388a6f');
/*!40000 ALTER TABLE `DON_HANG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GIOI_TINH`
--

DROP TABLE IF EXISTS `GIOI_TINH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GIOI_TINH` (
  `GIOI_TINH_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TEN_GIOI_TINH` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_GIOI_TINH` datetime DEFAULT NULL,
  `UPDATE_GIOI_TINH` datetime DEFAULT NULL,
  `TRANG_THAI_GIOI_TINH` int(11) DEFAULT NULL,
  PRIMARY KEY (`GIOI_TINH_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GIOI_TINH`
--

LOCK TABLES `GIOI_TINH` WRITE;
/*!40000 ALTER TABLE `GIOI_TINH` DISABLE KEYS */;
INSERT INTO `GIOI_TINH` VALUES (14,'Nam','2024-11-07 21:19:15','2024-11-07 21:23:51',1),(15,'Nữ','2024-11-07 21:32:40','2024-11-07 21:32:40',1),(16,'Trẻ em','2024-11-07 21:32:49','2024-11-07 21:32:49',1);
/*!40000 ALTER TABLE `GIOI_TINH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GIO_HANG`
--

DROP TABLE IF EXISTS `GIO_HANG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GIO_HANG` (
  `ID_GIO_HANG` int(11) NOT NULL AUTO_INCREMENT,
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_NGUOI_DUNG` int(11) NOT NULL,
  `NGAY_CAP_NHAT_GIOHANG` date DEFAULT NULL,
  PRIMARY KEY (`ID_GIO_HANG`),
  KEY `FK_GIO_HANG_CO_SAN_PHAM` (`ID_SAN_PHAM`),
  KEY `FK_GIO_HANG_CO_GIO_HA_NGUOI_DU` (`ID_NGUOI_DUNG`),
  CONSTRAINT `FK_GIO_HANG_CO_GIO_HA_NGUOI_DU` FOREIGN KEY (`ID_NGUOI_DUNG`) REFERENCES `NGUOI_DUNG` (`ID_NGUOI_DUNG`),
  CONSTRAINT `FK_GIO_HANG_CO_SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `SAN_PHAM` (`ID_SAN_PHAM`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GIO_HANG`
--

LOCK TABLES `GIO_HANG` WRITE;
/*!40000 ALTER TABLE `GIO_HANG` DISABLE KEYS */;
INSERT INTO `GIO_HANG` VALUES (32,4,6,'2024-11-21'),(33,8,6,'2024-11-21'),(34,8,6,'2024-11-21'),(35,8,6,'2024-11-21'),(36,8,6,'2024-11-21'),(37,8,6,'2024-11-21');
/*!40000 ALTER TABLE `GIO_HANG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ID_BAI_VIET`
--

DROP TABLE IF EXISTS `ID_BAI_VIET`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ID_BAI_VIET` (
  `ID_BAI_VIET` int(11) NOT NULL AUTO_INCREMENT,
  `ID_NGUOI_DUNG` int(11) NOT NULL,
  `TIEU_DE` varchar(255) DEFAULT NULL,
  `NGAY_TAO_BLOG` datetime DEFAULT NULL,
  `NGAY_CAP_NHAT_BAIVIET` datetime DEFAULT NULL,
  `NOI_DUNG_BAIVIET` varchar(255) DEFAULT NULL,
  `TRANG_THAI_BAIVIET` varchar(255) DEFAULT NULL,
  `HINH_ANH_BAIVIET` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_BAI_VIET`),
  KEY `FK_ID_BAI_V_CO_BAI_VI_NGUOI_DU` (`ID_NGUOI_DUNG`),
  CONSTRAINT `FK_ID_BAI_V_CO_BAI_VI_NGUOI_DU` FOREIGN KEY (`ID_NGUOI_DUNG`) REFERENCES `NGUOI_DUNG` (`ID_NGUOI_DUNG`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ID_BAI_VIET`
--

LOCK TABLES `ID_BAI_VIET` WRITE;
/*!40000 ALTER TABLE `ID_BAI_VIET` DISABLE KEYS */;
/*!40000 ALTER TABLE `ID_BAI_VIET` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `KICH_CO`
--

DROP TABLE IF EXISTS `KICH_CO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `KICH_CO` (
  `ID_KICH_CO` int(11) NOT NULL AUTO_INCREMENT,
  `KICH_CO` varchar(255) DEFAULT NULL,
  `TRANG_THAI_KICH_CO` varchar(255) DEFAULT NULL,
  `CREATED_KICH_CO` datetime DEFAULT NULL,
  `UPDATE_KICH_CO` datetime DEFAULT NULL,
  PRIMARY KEY (`ID_KICH_CO`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `KICH_CO`
--

LOCK TABLES `KICH_CO` WRITE;
/*!40000 ALTER TABLE `KICH_CO` DISABLE KEYS */;
INSERT INTO `KICH_CO` VALUES (1,'40','1','2024-11-07 22:01:33','2024-11-07 22:02:50');
/*!40000 ALTER TABLE `KICH_CO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LOAI_DANH_MUC`
--

DROP TABLE IF EXISTS `LOAI_DANH_MUC`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LOAI_DANH_MUC` (
  `ID_DANH_MUC` int(11) NOT NULL AUTO_INCREMENT,
  `TEN_DANH_MUC` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MO_TA_LOAI_DANH_MUC` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TRANG_THAI_DANHMUC` int(11) DEFAULT NULL,
  `CREATED_DANH_MUC` datetime DEFAULT NULL,
  `UPDATE_DANH_MUC` datetime DEFAULT NULL,
  PRIMARY KEY (`ID_DANH_MUC`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LOAI_DANH_MUC`
--

LOCK TABLES `LOAI_DANH_MUC` WRITE;
/*!40000 ALTER TABLE `LOAI_DANH_MUC` DISABLE KEYS */;
INSERT INTO `LOAI_DANH_MUC` VALUES (1,'Giày thể thao','Giày thể thao là loại giày được thiết kế cho các hoạt động thể thao, với đặc điểm nhẹ, thoải mái và có đế chống trơn. Chúng giúp bảo vệ và hỗ trợ cơ thể khi vận động.',1,'2024-11-07 23:17:05','2024-11-07 23:17:05'),(5,'Giày thời trang','Giày thời trang là loại giày chủ yếu được thiết kế để làm đẹp, thể hiện phong cách và xu hướng thời trang, thay vì chỉ phục vụ cho mục đích thể thao hay công việc. Chúng có thể có nhiều kiểu dáng, chất liệu và màu sắc khác nhau, phù hợp với các dịp, hoàn cảnh khác nhau.',1,'2024-11-07 23:28:19','2024-11-07 23:28:19');
/*!40000 ALTER TABLE `LOAI_DANH_MUC` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MAU_SAC`
--

DROP TABLE IF EXISTS `MAU_SAC`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MAU_SAC` (
  `MAU_SAC_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TEN_MAU_SAC` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATE_MAU_SAC` datetime DEFAULT NULL,
  `UPDATE_MAU_SAC` datetime DEFAULT NULL,
  `TRANG_THAI_MAU_SAC` int(11) DEFAULT NULL,
  PRIMARY KEY (`MAU_SAC_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MAU_SAC`
--

LOCK TABLES `MAU_SAC` WRITE;
/*!40000 ALTER TABLE `MAU_SAC` DISABLE KEYS */;
INSERT INTO `MAU_SAC` VALUES (2,'Xanh','2024-11-08 07:50:33','2024-11-08 07:50:33',1),(3,'Đỏ','2024-11-08 07:51:34','2024-11-08 07:51:34',1),(4,'Tím ','2024-11-08 07:51:41','2024-11-08 07:51:41',1),(5,'Vàng','2024-11-08 07:51:44','2024-11-08 07:51:44',1),(7,'Đen','2024-11-08 07:52:00','2024-11-08 07:52:00',1),(8,'Tổng hợp','2024-11-08 07:52:05','2024-11-08 07:52:05',1),(9,'Trắng','2024-11-08 07:52:19','2024-11-08 07:52:19',1);
/*!40000 ALTER TABLE `MAU_SAC` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MAU_SAC_SAN_PHAM`
--

DROP TABLE IF EXISTS `MAU_SAC_SAN_PHAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MAU_SAC_SAN_PHAM` (
  `ID_SAN_PHAM` int(11) NOT NULL,
  `MAU_SAC_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID_SAN_PHAM`,`MAU_SAC_ID`),
  KEY `FK_MAU_SAC__MAU_SAC_S_MAU_SAC` (`MAU_SAC_ID`),
  CONSTRAINT `FK_MAU_SAC__MAU_SAC_S_MAU_SAC` FOREIGN KEY (`MAU_SAC_ID`) REFERENCES `MAU_SAC` (`MAU_SAC_ID`),
  CONSTRAINT `FK_MAU_SAC__MAU_SAC_S_SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `SAN_PHAM` (`ID_SAN_PHAM`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MAU_SAC_SAN_PHAM`
--

LOCK TABLES `MAU_SAC_SAN_PHAM` WRITE;
/*!40000 ALTER TABLE `MAU_SAC_SAN_PHAM` DISABLE KEYS */;
INSERT INTO `MAU_SAC_SAN_PHAM` VALUES (4,3),(38,3),(39,3),(36,4);
/*!40000 ALTER TABLE `MAU_SAC_SAN_PHAM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MUC_DICH_SU_DUNG`
--

DROP TABLE IF EXISTS `MUC_DICH_SU_DUNG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MUC_DICH_SU_DUNG` (
  `ID_MUC_DICH_SU_DUNG` int(11) NOT NULL AUTO_INCREMENT,
  `TEN_MUC_DICH_SU_DUNG` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATE_MUC_DICH_SU_DUNG` datetime DEFAULT NULL,
  `UPDATE_MUC_DICH_SU_DUNG` datetime DEFAULT NULL,
  `TRANG_THAI_MUC_DICH_SU_DUNG` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_MUC_DICH_SU_DUNG`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MUC_DICH_SU_DUNG`
--

LOCK TABLES `MUC_DICH_SU_DUNG` WRITE;
/*!40000 ALTER TABLE `MUC_DICH_SU_DUNG` DISABLE KEYS */;
INSERT INTO `MUC_DICH_SU_DUNG` VALUES (8,'Chạy bộ','2024-11-08 08:01:59','2024-11-08 08:01:59',1),(9,'Thời trang hàng ngày','2024-11-08 08:02:09','2024-11-08 08:02:09',1),(10,'Thể thao và tập luyện','2024-11-08 08:02:14','2024-11-08 08:02:14',1);
/*!40000 ALTER TABLE `MUC_DICH_SU_DUNG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MUC_DICH_SU_DUNG_SAN_PHAM`
--

DROP TABLE IF EXISTS `MUC_DICH_SU_DUNG_SAN_PHAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MUC_DICH_SU_DUNG_SAN_PHAM` (
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_MUC_DICH_SU_DUNG` int(11) NOT NULL,
  PRIMARY KEY (`ID_SAN_PHAM`,`ID_MUC_DICH_SU_DUNG`),
  KEY `FK_MUC_DICH_MUC_DICH__MUC_DICH` (`ID_MUC_DICH_SU_DUNG`),
  CONSTRAINT `FK_MUC_DICH_MUC_DICH__MUC_DICH` FOREIGN KEY (`ID_MUC_DICH_SU_DUNG`) REFERENCES `MUC_DICH_SU_DUNG` (`ID_MUC_DICH_SU_DUNG`),
  CONSTRAINT `FK_MUC_DICH_MUC_DICH__SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `SAN_PHAM` (`ID_SAN_PHAM`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MUC_DICH_SU_DUNG_SAN_PHAM`
--

LOCK TABLES `MUC_DICH_SU_DUNG_SAN_PHAM` WRITE;
/*!40000 ALTER TABLE `MUC_DICH_SU_DUNG_SAN_PHAM` DISABLE KEYS */;
INSERT INTO `MUC_DICH_SU_DUNG_SAN_PHAM` VALUES (4,9),(36,9),(38,10),(39,10);
/*!40000 ALTER TABLE `MUC_DICH_SU_DUNG_SAN_PHAM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NGUOI_DUNG`
--

DROP TABLE IF EXISTS `NGUOI_DUNG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NGUOI_DUNG` (
  `ID_NGUOI_DUNG` int(11) NOT NULL AUTO_INCREMENT,
  `MAT_KHAU` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `VAI_TRO` varchar(255) DEFAULT NULL,
  `HO_TEN` varchar(255) DEFAULT NULL,
  `SO_DIEN_THOAI` varchar(255) DEFAULT NULL,
  `DIA_CHI` varchar(255) DEFAULT NULL,
  `TRANG_THAI_USER` varchar(255) DEFAULT NULL,
  `NGAY_TAO_USER` datetime DEFAULT NULL,
  `NGAY_CAP_NHAT_USER` varchar(255) DEFAULT NULL,
  `AVATAR` varchar(255) DEFAULT NULL,
  `NGAY_SINH` datetime DEFAULT NULL,
  `DIA_CHI_Provinces` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DIA_CHI_Districts` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DIA_CHI_Wards` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `THEMES` varchar(255) DEFAULT NULL,
  `LANGUAGE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_NGUOI_DUNG`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NGUOI_DUNG`
--

LOCK TABLES `NGUOI_DUNG` WRITE;
/*!40000 ALTER TABLE `NGUOI_DUNG` DISABLE KEYS */;
INSERT INTO `NGUOI_DUNG` VALUES (1,NULL,'hohoangphucjob12312@gmail.com','0','phúc','12312','ádasd','1','2024-11-02 07:29:46','2024-11-02 07:29:46','ádasd',NULL,NULL,NULL,NULL,NULL,NULL),(2,NULL,'hohoangphucjob123112@gmail.com','0','phúc1',NULL,NULL,'1','2024-11-02 07:33:45','2024-11-02 07:33:45',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'$2b$10$yNGBeBtNceYYlF1ekrBFXOoWYmSzgIjKvbuWJ0tqMV0M5P4UnC31a','hohoangphucjob@gmail.com','1','Hoàng Phúc','0327434821',NULL,'1','2024-11-02 07:41:11','2024-11-21 14:04:10','images-1732088204175.jpg','2003-01-27 00:00:00','Tỉnh Bắc Ninh','Huyện Tiên Du','Xã Lạc Vệ','dark','vi'),(6,'$2b$10$N6sU63YZs2oGHjF3xLjnpOsFDCWou5XRbv3PX14dgIMSN88aAKt1u','phucvntv159@gmail.com','0','phuc','0327434821',NULL,'1','2024-11-21 07:40:44','2024-11-21 14:50:39','images-1732175439165.jpg',NULL,'Tỉnh Bắc Giang','Huyện Lục Ngạn','Xã Biên Sơn','dark','vi');
/*!40000 ALTER TABLE `NGUOI_DUNG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PHONG_CACH`
--

DROP TABLE IF EXISTS `PHONG_CACH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PHONG_CACH` (
  `ID_PHUONG_CACH` int(11) NOT NULL AUTO_INCREMENT,
  `TEN_PHONG_CACH` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_PHONG_CACH` datetime DEFAULT NULL,
  `UPDATE_PHONG_CACH` datetime DEFAULT NULL,
  `TRANG_THAI_PHONG_CACH` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_PHUONG_CACH`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PHONG_CACH`
--

LOCK TABLES `PHONG_CACH` WRITE;
/*!40000 ALTER TABLE `PHONG_CACH` DISABLE KEYS */;
INSERT INTO `PHONG_CACH` VALUES (6,'Cổ điển','2024-11-08 08:19:38','2024-11-08 08:19:38',1),(7,'Hiện đại','2024-11-08 08:19:43','2024-11-08 08:19:43',1),(8,'Đường phố','2024-11-08 08:19:48','2024-11-08 08:19:48',1),(9,'Sang trọng','2024-11-08 08:19:53','2024-11-08 08:19:53',1);
/*!40000 ALTER TABLE `PHONG_CACH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PHONG_CACH_SAN_PHAM`
--

DROP TABLE IF EXISTS `PHONG_CACH_SAN_PHAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PHONG_CACH_SAN_PHAM` (
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_PHUONG_CACH` int(11) NOT NULL,
  PRIMARY KEY (`ID_SAN_PHAM`,`ID_PHUONG_CACH`),
  KEY `FK_PHONG_CA_PHONG_CAC_PHUONG_C` (`ID_PHUONG_CACH`),
  CONSTRAINT `FK_PHONG_CA_PHONG_CAC_PHUONG_C` FOREIGN KEY (`ID_PHUONG_CACH`) REFERENCES `PHONG_CACH` (`ID_PHUONG_CACH`),
  CONSTRAINT `FK_PHONG_CA_PHONG_CAC_SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `SAN_PHAM` (`ID_SAN_PHAM`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PHONG_CACH_SAN_PHAM`
--

LOCK TABLES `PHONG_CACH_SAN_PHAM` WRITE;
/*!40000 ALTER TABLE `PHONG_CACH_SAN_PHAM` DISABLE KEYS */;
INSERT INTO `PHONG_CACH_SAN_PHAM` VALUES (4,6),(38,6),(36,7),(39,7);
/*!40000 ALTER TABLE `PHONG_CACH_SAN_PHAM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SAN_PHAM`
--

DROP TABLE IF EXISTS `SAN_PHAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SAN_PHAM` (
  `ID_SAN_PHAM` int(11) NOT NULL AUTO_INCREMENT,
  `ID_THUONG_HIEU` int(11) NOT NULL,
  `ID_DANH_MUC` int(11) NOT NULL,
  `GIOI_TINH_ID` int(11) NOT NULL,
  `CHAT_LIEU_ID_` int(11) NOT NULL,
  `TEN_SAN_PHAM` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GIA` float DEFAULT NULL,
  `MO_TA_SAN_PHAM` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HINH_ANH_SANPHAM` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TRANG_THAI_SANPHAM` int(11) DEFAULT NULL,
  `NGAY_TAO_SANPHAM` datetime DEFAULT NULL,
  `NGAY_CAP_NHAT_SANPHAM` varchar(255) DEFAULT NULL,
  `SO_LUONG_SANPHAM` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_SAN_PHAM`),
  KEY `FK_SAN_PHAM_BRAND_PRO_THUONG_H` (`ID_THUONG_HIEU`),
  KEY `FK_SAN_PHAM_CHAT_LIEU_CHAT_LIE` (`CHAT_LIEU_ID_`),
  KEY `FK_SAN_PHAM_CO_DANH_M_LOAI_DAN` (`ID_DANH_MUC`),
  KEY `FK_SAN_PHAM_GIOI_TINH_GIOI_TIN` (`GIOI_TINH_ID`),
  CONSTRAINT `FK_SAN_PHAM_BRAND_PRO_THUONG_H` FOREIGN KEY (`ID_THUONG_HIEU`) REFERENCES `THUONG_HIEU` (`ID_THUONG_HIEU`),
  CONSTRAINT `FK_SAN_PHAM_CHAT_LIEU_CHAT_LIE` FOREIGN KEY (`CHAT_LIEU_ID_`) REFERENCES `CHAT_LIEU` (`CHAT_LIEU_ID_`),
  CONSTRAINT `FK_SAN_PHAM_CO_DANH_M_LOAI_DAN` FOREIGN KEY (`ID_DANH_MUC`) REFERENCES `LOAI_DANH_MUC` (`ID_DANH_MUC`),
  CONSTRAINT `FK_SAN_PHAM_GIOI_TINH_GIOI_TIN` FOREIGN KEY (`GIOI_TINH_ID`) REFERENCES `GIOI_TINH` (`GIOI_TINH_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SAN_PHAM`
--

LOCK TABLES `SAN_PHAM` WRITE;
/*!40000 ALTER TABLE `SAN_PHAM` DISABLE KEYS */;
INSERT INTO `SAN_PHAM` VALUES (4,6,1,14,13,'Giày Thể Thao Classic',150000,'Giày thể thao phong cách cổ điển','profile_pic-1705383625789.jpg',1,'2023-07-01 00:00:00','2024-11-14 12:50:47',60),(5,7,5,15,14,'Giày Chạy Bộ Ultra Boost',250000,'Giày chạy bộ siêu nhẹ, hỗ trợ tốt','profile_pic-1705383560469.jpg',1,'2023-07-05 00:00:00','2023-07-15',80),(6,8,1,16,15,'Giày Lười Slip-on',120000,'Giày lười tiện dụng và thoải mái','profile_pic-1705383465739.jpg',0,'2023-07-10 00:00:00','2023-07-20',45),(7,9,5,14,16,'Giày Bốt Da',300000,'Giày bốt làm từ da cao cấp','profile_pic-1705383428310.jpg',1,'2023-07-15 00:00:00','2023-07-25',20),(8,10,1,15,13,'Giày Tây Formal',180000,'Giày tây phù hợp với trang phục công sở','profile_pic-1702013056947.jpg',1,'2023-07-20 00:00:00','2023-07-30',55),(9,11,5,16,17,'Giày Sandal Outdoor',90000,'Giày sandal cho các hoạt động ngoài trời','profile_pic-1702012314938.jpg',1,'2023-07-25 00:00:00','2023-08-05',75),(10,6,1,14,14,'Giày Sneakers Năng Động',220000,'Giày sneakers dành cho các bạn trẻ','profile_pic-1702011166495.jpg',1,'2023-08-01 00:00:00','2023-08-10',90),(11,7,5,15,15,'Giày Cao Gót Thời Trang',280000,'Giày cao gót cho các buổi tiệc','profile_pic-1702010913905.jpg',1,'2023-08-05 00:00:00','2023-08-15',40),(12,8,1,16,16,'Giày Sandal Đi Biển',80000,'Sandal thích hợp cho đi biển','profile_pic-1702010983904.jpg',0,'2023-08-10 00:00:00','2023-08-20',50),(13,9,5,14,13,'Giày Moccasin',160000,'Giày moccasin kiểu dáng cổ điển','profile_pic-1702011007811.jpg',1,'2023-08-15 00:00:00','2023-08-25',25),(14,10,1,15,14,'Giày Đá Bóng',260000,'Giày đá bóng chất lượng cao','profile_pic-1702011118624.jpg',1,'2023-08-20 00:00:00','2023-08-30',70),(15,11,5,16,15,'Giày Leo Núi',350000,'Giày leo núi bền bỉ và an toàn','profile_pic-1702011129020.jpg',1,'2023-08-25 00:00:00','2023-09-05',30),(16,6,1,14,13,'Giày Thể Thao Air Max',220000,'Giày thể thao dành cho vận động viên','profile_pic-1701962101171.jpg',1,'2023-09-01 00:00:00','2023-09-10',60),(17,7,5,15,14,'Giày Chạy Bộ Asics',230000,'Giày chạy bộ với công nghệ hỗ trợ gân chân','profile_pic-1701962194952.jpg',1,'2023-09-02 00:00:00','2023-09-12',50),(18,8,1,16,15,'Giày Converse Chuck Taylor',180000,'Giày thể thao thời trang cho giới trẻ','profile_pic-1701962064910.jpg',0,'2023-09-03 00:00:00','2023-09-13',70),(19,9,5,14,16,'Giày Nike Air Force 1',250000,'Giày thể thao huyền thoại của Nike','profile_pic-1701962018496.jpg',1,'2023-09-04 00:00:00','2023-09-14',80),(20,10,1,15,13,'Giày Adidas Superstar',210000,'Giày Adidas cổ điển cho mọi lứa tuổi','profile_pic-1701961994540.jpg',1,'2023-09-05 00:00:00','2023-09-15',55),(21,11,5,16,17,'Giày Puma RS-X',270000,'Giày thể thao Puma kiểu dáng năng động','profile_pic-1701961964536.jpg',1,'2023-09-06 00:00:00','2023-09-16',45),(22,6,1,14,13,'Giày Saucony Endorphin',240000,'Giày chạy bộ nhẹ và êm','profile_pic-1701961905082.jpg',0,'2023-09-07 00:00:00','2023-09-17',65),(23,7,5,15,14,'Giày New Balance 990',260000,'Giày chạy bộ với công nghệ đệm tốt nhất','profile_pic-1701961853003.jpg',1,'2023-09-08 00:00:00','2023-09-18',90),(24,8,1,16,15,'Giày Vans Old Skool',170000,'Giày Vans với thiết kế cổ điển','profile_pic-1701961778593.jpg',1,'2023-09-09 00:00:00','2023-09-19',50),(25,9,5,14,16,'Giày Reebok Classic',200000,'Giày thể thao cổ điển với kiểu dáng đẹp','profile_pic-1701961741997.jpg',1,'2023-09-10 00:00:00','2023-09-20',40),(26,10,1,15,13,'Giày Nike Zoom',230000,'Giày thể thao nhẹ và linh hoạt','profile_pic-1701961516007.jpg',1,'2023-09-11 00:00:00','2023-09-21',85),(27,11,5,16,17,'Giày Timberland Boot',350000,'Giày bốt da chắc chắn cho mùa đông','profile_pic-1701961442792.jpg',0,'2023-09-12 00:00:00','2023-09-22',30),(28,6,1,14,14,'Giày Adidas NMD',260000,'Giày Adidas với phong cách trẻ trung','profile_pic-1701961267065.jpg',1,'2023-09-13 00:00:00','2023-09-23',60),(29,7,5,15,15,'Giày Balenciaga Triple S',500000,'Giày Balenciaga nổi bật với kiểu dáng độc đáo','profile_pic-1701869010936.jpg',1,'2023-09-14 00:00:00','2023-09-24',25),(30,8,1,16,16,'Giày Nike React Element',270000,'Giày thể thao với công nghệ đệm React của Nike','profile_pic-1701869062047.jpg',1,'2023-09-15 00:00:00','2023-09-25',55),(31,9,5,14,13,'Giày Hoka One One Clifton',290000,'Giày chạy bộ với đệm mềm mại và êm ái','profile_pic-1701868615569.jpg',1,'2023-09-16 00:00:00','2023-09-26',45),(32,10,1,15,14,'Giày Saucony Triumph',320000,'Giày chạy bộ với công nghệ đệm tối ưu','profile_pic-1701867428434.jpg',1,'2023-09-17 00:00:00','2023-09-27',70),(33,11,5,16,15,'Giày Under Armour HOVR',280000,'Giày chạy bộ Under Armour với công nghệ đệm HOVR','profile_pic-1701867428434.jpg',0,'2023-09-18 00:00:00','2023-09-28',80),(34,6,1,14,17,'Giày Jordan 1 Retro',450000,'Giày bóng rổ Jordan với phong cách cổ điển','profile_pic-1701868681028.jpg',1,'2023-09-19 00:00:00','2023-09-29',35),(35,7,5,15,16,'Giày Fila Disruptor',150000,'Giày thể thao Fila với kiểu dáng retro','profile_pic-1701868955863.jpg',1,'2023-09-20 00:00:00','2023-09-30',90),(36,11,5,14,13,'Giày New Balance Geter ',145000,'Là loại giày thời trang đỉnh cao của New Balance với phiên bản thứ 5 trong 5 năm liên tiếp','images-1731145180801.png',1,'2024-11-09 16:39:41','2024-11-13 22:46:25',10),(38,7,1,15,14,'Giày thời trang Nike OT5',210000,'Là loại giày thời trang đỉnh cao của Nike với phiên bản thứ 5 trong 5 năm liên tiếp','images-1731403036606.png',1,'2024-11-12 16:17:17','2024-11-13 21:58:43',2),(39,8,5,16,14,'Giày thời trang Nike OT5',350000,'Là loại giày thời trang đỉnh cao của Nike với phiên bản thứ 5 trong 5 năm liên tiếp','images-1732175726241.png',1,'2024-11-21 14:55:26','2024-11-21 14:55:26',23);
/*!40000 ALTER TABLE `SAN_PHAM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `THANH_TOAN`
--

DROP TABLE IF EXISTS `THANH_TOAN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `THANH_TOAN` (
  `ID_THANH_TOAN` int(11) NOT NULL AUTO_INCREMENT,
  `PHUONG_THUC_THANH_TOAN` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NGAY_THANH_TOAN` datetime DEFAULT NULL,
  `TRANG_THAI_THANH_TOAN` varchar(266) DEFAULT NULL,
  PRIMARY KEY (`ID_THANH_TOAN`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `THANH_TOAN`
--

LOCK TABLES `THANH_TOAN` WRITE;
/*!40000 ALTER TABLE `THANH_TOAN` DISABLE KEYS */;
INSERT INTO `THANH_TOAN` VALUES (1,'Momo','2024-11-12 13:49:36','1'),(2,'Thanh toán tại nhà','2024-11-12 13:49:36','1'),(5,'VNPay','2024-11-12 13:52:54','1');
/*!40000 ALTER TABLE `THANH_TOAN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `THUONG_HIEU`
--

DROP TABLE IF EXISTS `THUONG_HIEU`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `THUONG_HIEU` (
  `ID_THUONG_HIEU` int(11) NOT NULL AUTO_INCREMENT,
  `TEN_THUONG_HIEU` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATE_THUONG_HIEU` varchar(255) DEFAULT NULL,
  `UPDATE_THUONG_HIEU` datetime DEFAULT NULL,
  `TRANG_THAI_THUONG_HIEU` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_THUONG_HIEU`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `THUONG_HIEU`
--

LOCK TABLES `THUONG_HIEU` WRITE;
/*!40000 ALTER TABLE `THUONG_HIEU` DISABLE KEYS */;
INSERT INTO `THUONG_HIEU` VALUES (6,'Nike','2024-11-08 08:31:34','2024-11-12 15:15:16',0),(7,'Adidas','2024-11-08 08:31:38','2024-11-08 08:31:39',1),(8,'Puma','2024-11-08 08:31:42','2024-11-08 08:31:43',1),(9,'Converse','2024-11-08 08:31:46','2024-11-08 08:31:47',1),(10,'Vans','2024-11-08 08:31:49','2024-11-08 08:31:50',1),(11,'New Balance','2024-11-08 08:31:54','2024-11-08 08:31:55',1);
/*!40000 ALTER TABLE `THUONG_HIEU` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TIN_NHAN`
--

DROP TABLE IF EXISTS `TIN_NHAN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TIN_NHAN` (
  `ID_TIN_NHAN` int(11) NOT NULL AUTO_INCREMENT,
  `ID_NGUOI_DUNG` int(11) NOT NULL,
  `NGAY_TAO_TIN_NHAN` datetime DEFAULT NULL,
  `NOI_DUNG_TINNHAN` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_TIN_NHAN`),
  KEY `FK_TIN_NHAN_CO_TIN_NH_NGUOI_DU` (`ID_NGUOI_DUNG`),
  CONSTRAINT `FK_TIN_NHAN_CO_TIN_NH_NGUOI_DU` FOREIGN KEY (`ID_NGUOI_DUNG`) REFERENCES `NGUOI_DUNG` (`ID_NGUOI_DUNG`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TIN_NHAN`
--

LOCK TABLES `TIN_NHAN` WRITE;
/*!40000 ALTER TABLE `TIN_NHAN` DISABLE KEYS */;
/*!40000 ALTER TABLE `TIN_NHAN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `YEU_THICH`
--

DROP TABLE IF EXISTS `YEU_THICH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `YEU_THICH` (
  `ID_YEU_THICH` int(11) NOT NULL AUTO_INCREMENT,
  `ID_SAN_PHAM` int(11) NOT NULL,
  `ID_NGUOI_DUNG` int(11) NOT NULL,
  `NGAY_YEU_THICH` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_YEU_THICH`),
  KEY `FK_YEU_THIC_CO_YEU_TH_NGUOI_DU` (`ID_NGUOI_DUNG`),
  KEY `FK_YEU_THIC__UOC_SAN_PHAM` (`ID_SAN_PHAM`),
  CONSTRAINT `FK_YEU_THIC_CO_YEU_TH_NGUOI_DU` FOREIGN KEY (`ID_NGUOI_DUNG`) REFERENCES `NGUOI_DUNG` (`ID_NGUOI_DUNG`),
  CONSTRAINT `FK_YEU_THIC__UOC_SAN_PHAM` FOREIGN KEY (`ID_SAN_PHAM`) REFERENCES `SAN_PHAM` (`ID_SAN_PHAM`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `YEU_THICH`
--

LOCK TABLES `YEU_THICH` WRITE;
/*!40000 ALTER TABLE `YEU_THICH` DISABLE KEYS */;
INSERT INTO `YEU_THICH` VALUES (49,5,6,'2024-11-21 08:02:19'),(50,8,6,'2024-11-21 08:02:27'),(51,11,6,'2024-11-21 08:02:30');
/*!40000 ALTER TABLE `YEU_THICH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'PhucShoe2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-22 12:29:28
