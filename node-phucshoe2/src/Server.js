const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
require("./config/database.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const hostname = process.env.HOST_NAME || "localhost";

// Middleware để gắn `io` vào `req`
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
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

//api user
const userRoute = require("./routers/nguoiDungRouter/userRouters.js");

//api products
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

//api thanh toán
const thanhToanRoute = require("./routers/thanhToanRouter/thanhToanRouter.js");
const donHangRoute = require("./routers/thanhToanRouter/donHangRouter.js");
const chiTietHoaDonRoute = require("./routers/thanhToanRouter/chiTietHoaDonRouter.js");

//api tương tác người dùng
const gioHangRoute = require("./routers/tuongTacUserRouter/gioHangRouter.js");
const yeuThichRoute = require("./routers/tuongTacUserRouter/yeuThichRouter.js");
const binhLuanRoute = require("./routers/tuongTacUserRouter/binhLuanRouter.js");
const tinNhanRoute = require("./routers/nguoiDungRouter/tinNhanRouter.js");
app.use("/", userRoute);
//
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
//
app.use("/thanh-toan/", thanhToanRoute);
app.use("/gio-hang/", gioHangRoute);
app.use("/chi-tiet-hoa-don/", chiTietHoaDonRoute);
//
app.use("/yeu-thich/", yeuThichRoute);
app.use("/don-hang/", donHangRoute);
app.use("/binh-luan/", binhLuanRoute);

app.use("/tin-nhan/", tinNhanRoute);

// Socket.IO logic
const userSockets = {}; // Lưu trữ socket.id của từng user theo userId

io.on("connection", (socket) => {
  console.log("User connected:", socket.id); // Kiểm tra kết nối thành công

  socket.on("user_connected", (userId) => {
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    userSockets[userId] = socket.id;
  });

  socket.on("send_message", (data) => {
    const receiverSocketId = userSockets[data.idNguoiNhan];
    console.log("receiverSocketId", receiverSocketId);
    if (receiverSocketId) {
      console.log("receive_message", data);
      io.to(receiverSocketId).emit("receive_message", data);
    } else {
      console.warn(`Receiver ${data.idNguoiNhan} is not connected.`);
      // Xử lý bổ sung nếu cần, ví dụ: lưu tin nhắn vào cơ sở dữ liệu
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const userId in userSockets) {
      if (userSockets[userId] === socket.id) {
        delete userSockets[userId];
        break;
      }
    }
  });
});

const configViewEngine = require("./config/viewEngine");
configViewEngine(app);

server.listen(port, hostname, () => {
  console.log(`${hostname}Example app listening on port ${port}`);
});
