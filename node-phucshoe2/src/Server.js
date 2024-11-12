const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
require("./config/database.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const hostname = process.env.HOST_NAME || "3002";

//setting
const corsOptions = {
  origin: process.env.URL_REACT, // Địa chỉ frontend
  credentials: true, // Cho phép gửi cookie
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "src/public/images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//api

const userRoute = require("./routers/nguoiDungRouter/userRouters.js");
const chatLieuRoute = require("./routers/sanPhamRouters/categoryRouter/chatLieuRouter.js");
const gioiTinhRoute = require("./routers/sanPhamRouters/categoryRouter/gioiTinhRouter.js");
const kichCoRoute = require("./routers/sanPhamRouters/categoryRouter/kichCoRouter.js");
const theLoaiRoute = require("./routers/sanPhamRouters/categoryRouter/loaiDanhMucRouter.js");
const mauSacRoute = require("./routers/sanPhamRouters/categoryRouter/mauSacRouter.js");
const mucDichSuDungRoute = require("./routers/sanPhamRouters/categoryRouter/mucDichSuDungRouter.js");
const phongCachRoute = require("./routers/sanPhamRouters/categoryRouter/phongCachRouter.js");
const thuongHieuRoute = require("./routers/sanPhamRouters/categoryRouter/thuonghieuRouter.js");
const sanPhamRoute = require("./routers/sanPhamRouters/SanPhamRouter.js");
const carouselProductsRoute = require("./routers/sanPhamRouters/carouselProductsRoute.js");
const thanhToanRoute = require("./routers/thanhToanRouter/thanhToanRouter.js");
app.use("/", userRoute);
app.use("/chat-lieu/", chatLieuRoute);
app.use("/gioi-tinh/", gioiTinhRoute);
app.use("/kich-co/", kichCoRoute);
app.use("/loai-danh-muc/", theLoaiRoute);
app.use("/mau-sac/", mauSacRoute);
app.use("/muc-dich-su-dung", mucDichSuDungRoute);
app.use("/phong-cach", phongCachRoute);
app.use("/thuong-hieu", thuongHieuRoute);
app.use("/san-pham", sanPhamRoute);
app.use("/carousel-products", carouselProductsRoute);
app.use("/thanh-toan/", thanhToanRoute);

const configViewEngine = require("./config/viewEngine");
configViewEngine(app);

app.listen(port, hostname, () => {
  console.log(`${hostname}Example app listening on port ${port}`);
});
