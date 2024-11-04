const express = require("express");
const app = express();
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//api

const userRoute = require("./routers/nguoiDungRouter/userRouters.js");

app.use("/", userRoute);
// app.use("/", (req, res) => {
//   res.send("helloworld");
// });

const configViewEngine = require("./config/viewEngine");
configViewEngine(app);

app.listen(port, hostname, () => {
  console.log(`${hostname}Example app listening on port ${port}`);
});
