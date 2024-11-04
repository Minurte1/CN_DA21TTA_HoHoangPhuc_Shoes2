const pool = require("../../config/database"); // Đảm bảo `connection` được import từ tệp kết nối cơ sở dữ liệu của bạn
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getAllUser_Admin = async (req, res) => {
  try {
    // Check if the user already exists in the database

    const [rows] = await pool.query("SELECT * FROM NGUOI_DUNG ");
    const results = rows;
    return res.status(200).json({
      EM: "Lấy thông tin tất cả người dùng thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error in loginUserGoogle:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};
const infoUserById = async (req, res) => {
  const { ID_NGUOI_DUNG } = req.body;

  if (!ID_NGUOI_DUNG) {
    return res.status(401).json({
      EM: "ID_NGUOI_DUNG is missing",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Check if the user already exists in the database

    const [rows] = await pool.query(
      "SELECT * FROM NGUOI_DUNG WHERE ID_NGUOI_DUNG = ?",
      [ID_NGUOI_DUNG]
    );
    const results = rows[0];
    return res.status(200).json({
      EM: "Lấy thông tin người dùng thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error in loginUserGoogle:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};
// ---------------------------------------------- updateUserById
const updateUserById_Admin = async (req, res) => {
  const {
    ID_NGUOI_DUNG,
    MAT_KHAU,
    EMAIL,
    VAI_TRO,
    HO_TEN,
    SO_DIEN_THOAI,
    DIA_CHI,
    TRANG_THAI_USER,
    NGAY_CAP_NHAT_USER,
    AVATAR,
  } = req.body;

  // Kiểm tra xem có đủ ID người dùng để cập nhật hay không
  if (!ID_NGUOI_DUNG) {
    return res.status(400).json({
      EM: "ID_NGUOI_DUNG is missing",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Cập nhật thông tin người dùng trong database
    const [result] = await pool.query(
      `UPDATE NGUOI_DUNG 
         SET MAT_KHAU = ?, 
             EMAIL = ?, 
             VAI_TRO = ?, 
             HO_TEN = ?, 
             SO_DIEN_THOAI = ?, 
             DIA_CHI = ?, 
             TRANG_THAI_USER = ?, 
             NGAY_CAP_NHAT_USER = ?, 
             AVATAR = ? 
         WHERE ID_NGUOI_DUNG = ?`,
      [
        MAT_KHAU,
        EMAIL,
        VAI_TRO,
        HO_TEN,
        SO_DIEN_THOAI,
        DIA_CHI,
        TRANG_THAI_USER,
        NGAY_CAP_NHAT_USER,
        AVATAR,
        ID_NGUOI_DUNG,
      ]
    );

    // Kiểm tra kết quả cập nhật
    if (result.affectedRows === 0) {
      return res.status(404).json({
        EM: "User not found",
        EC: 0,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Cập nhật thông tin người dùng thành công",
      EC: 1,
      DT: { ID_NGUOI_DUNG },
    });
  } catch (error) {
    console.error("Error in updateUserById:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: -1,
      DT: [],
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
          userInfo: {
            ID_NGUOI_DUNG: user.ID_NGUOI_DUNG,
            EMAIL: user.EMAIL,
            HO_TEN: user.HO_TEN,
            VAI_TRO: user.VAI_TRO,
            SO_DIEN_THOAI: user.SO_DIEN_THOAI,
            DIA_CHI: user.DIA_CHI,
            TRANG_THAI_USER: user.TRANG_THAI_USER,
            NGAY_TAO_USER: user.NGAY_TAO_USER,
            NGAY_CAP_NHAT_USER: user.NGAY_CAP_NHAT_USER,
            AVATAR: user.AVATAR,
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
      const [rows] = await pool.query(
        "SELECT * FROM NGUOI_DUNG WHERE EMAIL = ?",
        [email]
      );
      const user = rows[0];
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
          userInfo: {
            ID_NGUOI_DUNG: user.ID_NGUOI_DUNG,
            EMAIL: user.EMAIL,
            VAI_TRO: user.VAI_TRO,
            HO_TEN: user.HO_TEN,
            SO_DIEN_THOAI: user.SO_DIEN_THOAI,
            DIA_CHI: user.DIA_CHI,
            TRANG_THAI_USER: user.TRANG_THAI_USER,
            NGAY_TAO_USER: user.NGAY_TAO_USER,
            NGAY_CAP_NHAT_USER: user.NGAY_CAP_NHAT_USER,
            AVATAR: user.AVATAR,
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

const logoutUser = (req, res) => {
  res.clearCookie("accessToken");
  return res.status(200).json({ message: "Đăng xuất thành công" });
};

module.exports = {
  loginUserGoogle,
  verifyAdmin,
  logoutUser,
  infoUserById,
  updateUserById_Admin,
  getAllUser_Admin,
};
