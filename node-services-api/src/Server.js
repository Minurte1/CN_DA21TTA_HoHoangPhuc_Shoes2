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

//setting
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true); // Allow all origins dynamically
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "src/public/images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//api user
const provincesRoute = require("./routers/provincesRoute.js");
app.use("/", provincesRoute);
//

const configViewEngine = require("./config/viewEngine");
configViewEngine(app);

app.listen(port, hostname, () => {
  console.log(`${hostname}Example app listening on port ${port}`);
});
