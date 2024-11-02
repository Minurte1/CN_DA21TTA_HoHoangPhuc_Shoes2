const connection = require("../config/database.js");
const {
  createLoginUser,
  getUser,
  postLoginUser,
  getThongtinUser,
  updateUser,
  updateAvatarUser,
  DeleteUser,
  postLoginAdmin,
  createLoginAdmin,
  updatePasswordUser,
  buyProductpost,
  updateAdminPassword,
} = require("../services/apiCRUDServices");
const pool = require("../config/database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const CreateUser = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const results = await createLoginUser(taikhoan, matkhau);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const results = await getUser();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const results = await postLoginUser(taikhoan, matkhau);
    console.log("User logged in", results);
    if (results && results.DT && results.DT.access_token) {
      res.cookie("jwt", results.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const getInfoUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;

    const results = await getThongtinUser(taikhoan);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const CapnhatUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;

    const ten = req.body.ten;
    const diachi = req.body.diachi;
    const sodienthoai = req.body.sodienthoai;
    const results = await updateUser(taikhoan, ten, diachi, sodienthoai);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const CapnhatAdmin = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const mk2 = req.body.password2;
    const matkhaumoi = req.body.newpassword;
    const results = await updateAdminPassword(
      taikhoan,
      matkhau,
      mk2,
      matkhaumoi
    );
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const CapnhatAvatarUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;
    const results = await updateAvatarUser(taikhoan, req.file.filename);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const CapnhatPasswordUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;
    const matkhaucu = req.body.passwordcu;
    const matkhaumoi = req.body.passwordmoi;

    const results = await updatePasswordUser(taikhoan, matkhaucu, matkhaumoi);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const XoaUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;
    const results = await DeleteUser(taikhoan);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};
const loginAdmin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    const results = await postLoginAdmin(username, password);
    if (results && results.DT && results.DT.access_token) {
      res.cookie("jwt", results.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};
const registerAdmin = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const results = await createLoginAdmin(taikhoan, matkhau);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Logout Thành Công !!!",
      EC: 0,
      DT: " ",
    });
  } catch {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: " ",
    });
  }
};

const muahangUser = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    console.log("username", taikhoan);
    const ten = req.body.name;
    const diachi = req.body.dataDiachi;
    const ghichu = req.body.note;
    const masp = req.body.IdSP;
    const sodienthoai = req.body.phoneNumber;
    const soluong = req.body.SoluongDaMua;
    const thanhtien = req.body.Tongtien;
    const results = await buyProductpost(
      taikhoan,
      ten,
      diachi,
      ghichu,
      sodienthoai,
      masp,
      soluong,
      thanhtien
    );
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch {
    return res.status(200).json({
      EM: "404 not found",
    });
  }
};
const countUsers = async (req, res) => {
  try {
    const [results, fields] = await connection.execute(
      `SELECT COUNT(*) AS totalUsers FROM users`
    );
    console.log("check", results);
    return res.status(200).json({
      EM: "Tính tổng số lượng user thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    return res.status(200).json({
      EM: "404 not found",
    });
  }
};
const loginUserGoogle = async (req, res) => {
  const { email, HO_TEN } = req.body;
  console.log("req.body loginUserGoogle", req.body);
  if (!email) {
    return res.status(401).json({
      EM: "email is missing",
      EC: 401,
      DT: [],
    });
  }

  try {
    // Check if the user already exists in the database

    const [rows] = await pool.query(
      "SELECT * FROM NGUOI_DUNG WHERE EMAIL = ?",
      [email]
    );

    if (rows.length > 0) {
      const user = rows[0];
      console.log(user);
      const token = jwt.sign(
        {
          ID_NGUOI_DUNG: user.ID_NGUOI_DUNG,
          EMAIL: user.EMAIL,
          VAI_TRO: user.VAI_TRO,
          HO_TEN: user.HO_TEN,
        },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
      // Kiểm tra nếu role = -1, không cho phép đăng nhập
      if (user.role === -1) {
        return res.status(403).json({
          EM: "Tài khoản đã bị khóa, không thể đăng nhập",
          EC: 403,
          DT: "Account is disabled",
        });
      }

      return res.status(200).json({
        EM: "Login successful",
        EC: 200,
        DT: {
          accessToken: token,
          user: {
            ID_NGUOI_DUNG: user.ID_NGUOI_DUNG,
            EMAIL: user.EMAIL,
            VAI_TRO: user.VAI_TRO,
          },
        },
      });
    } else {
      const VAI_TRO = "0";
      const TRANG_THAI_USER = "1";
      const [insertResult] = await pool.query(
        "INSERT INTO NGUOI_DUNG (EMAIL, VAI_TRO, HO_TEN, TRANG_THAI_USER,NGAY_TAO_USER,NGAY_CAP_NHAT_USER) VALUES (?,?,?,?,NOW(),NOW())",
        [email, VAI_TRO, HO_TEN, TRANG_THAI_USER]
      );

      const newUserId = insertResult.insertId;

      const token = jwt.sign(
        {
          ID_NGUOI_DUNG: newUserId,
          EMAIL: email,
          VAI_TRO: VAI_TRO,
          HO_TEN: HO_TEN,
        },
        JWT_SECRET,
        { expiresIn: "2h" }
      );

      return res.status(200).json({
        EM: "New user created and logged in successfully",
        EC: 200,
        DT: {
          accessToken: token,
          user: {
            ID_NGUOI_DUNG: newUserId,
            EMAIL: email,
            HO_TEN: HO_TEN,
            VAI_TRO: VAI_TRO,
          },
        },
      });
    }
  } catch (error) {
    console.error("Error in loginUserGoogle:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: 500,
      DT: [],
    });
  }
};

const verifyAdmin = async (req, res) => {
  const { token } = req.body;
  console.log("token", token);
  if (!token) {
    return res.status(401).json({
      EM: "Token is missing",
      EC: 401,
      DT: { isAdmin: false },
    });
  }

  try {
    // Giải mã token
    const decoded = jwt.verify(token, JWT_SECRET);

    const ID_NGUOI_DUNG = decoded.ID_NGUOI_DUNG;
    console.log("id", decoded);
    // Truy vấn để lấy thông tin user từ database
    const [rows] = await pool.query(
      "SELECT VAI_TRO FROM NGUOI_DUNG WHERE ID_NGUOI_DUNG = ?",
      [ID_NGUOI_DUNG]
    );

    if (rows.length > 0) {
      const user = rows[0];
      console.log(user.VAI_TRO);
      // Kiểm tra vai trò của người dùng
      if (user.VAI_TRO == "1") {
        return res.status(200).json({
          EM: "User is admin",
          EC: 200,
          DT: { isAdmin: true }, // Người dùng là admin
        });
      } else {
        return res.status(403).json({
          EM: "User is not admin",
          EC: 403,
          DT: { isAdmin: false }, // Người dùng không phải admin
        });
      }
    } else {
      return res.status(404).json({
        EM: "User not found",
        EC: 404,
        DT: { isAdmin: false }, // Người dùng không tìm thấy
      });
    }
  } catch (error) {
    console.error("Error decoding token or querying database:", error);
    return res.status(401).json({
      EM: `Invalid token: ${error.message}`, // Thông báo lỗi token không hợp lệ
      EC: 401,
      DT: { isAdmin: false }, // Token không hợp lệ, trả về false
    });
  }
};
module.exports = {
  CreateUser,
  getAllUser,
  loginUser,
  getInfoUser,
  CapnhatUser,
  CapnhatAvatarUser,
  XoaUser,
  loginAdmin,
  registerAdmin,
  CapnhatPasswordUser,
  logoutUser,
  muahangUser,
  countUsers,
  CapnhatAdmin,
  loginUserGoogle,
  verifyAdmin,
};
