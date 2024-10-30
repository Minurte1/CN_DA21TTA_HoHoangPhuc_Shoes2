const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const port = process.env.PORT;
const configViewEngine = require("./config/viewEngine");
require("./config/old.js");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const hostname = process.env.HOST_NAME || "3002";
const corsOptions = {
  origin: true, // Cho phép truy cập từ tất cả các nguồn
  credentials: true, // Cho phép gửi cookie
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/helloworld", (req, res) => {
  res.send("hellowork");
});

const apiRoute = require("../src/routers/api.js");
app.use("/api", apiRoute);
configViewEngine(app);

app.listen(port, hostname, () => {
  console.log(`${hostname}Example app listening on port ${port}`);
});
