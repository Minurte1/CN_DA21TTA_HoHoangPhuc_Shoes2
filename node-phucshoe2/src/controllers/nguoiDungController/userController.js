const pool = require("../../config/database"); // Đảm bảo `pool` được import từ tệp kết nối cơ sở dữ liệu của bạn
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

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
const getUser_ById = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the user already exists in the database

    const [rows] = await pool.query(
      "SELECT * FROM NGUOI_DUNG where ID_NGUOI_DUNG =? ",
      [id]
    );
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

const updateUserById_User = async (req, res) => {
  const {
    EMAIL,
    HO_TEN,
    SO_DIEN_THOAI,
    NGAY_SINH,

    DIA_CHI_Provinces,
    DIA_CHI_Districts,
    DIA_CHI_Wards,
  } = req.body;

  const { id } = req.params;

  // Kiểm tra xem ID người dùng có hợp lệ không
  if (!id) {
    return res.status(400).json({
      EM: "ID người dùng bị thiếu",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Kiểm tra xem người dùng có tồn tại không
    const [existingUser] = await pool.execute(
      "SELECT * FROM NGUOI_DUNG WHERE ID_NGUOI_DUNG = ?",
      [id]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        EM: "Không tìm thấy người dùng",
        EC: 0,
        DT: [],
      });
    }

    // Cập nhật các trường không phải null
    let updateFields = [];
    let updateValues = [];

    if (EMAIL !== undefined && EMAIL !== null) {
      updateFields.push("EMAIL = ?");
      updateValues.push(EMAIL);
    }
    if (HO_TEN !== undefined && HO_TEN !== null) {
      updateFields.push("HO_TEN = ?");
      updateValues.push(HO_TEN);
    }
    if (SO_DIEN_THOAI !== undefined && SO_DIEN_THOAI !== null) {
      updateFields.push("SO_DIEN_THOAI = ?");
      updateValues.push(SO_DIEN_THOAI);
    }
    if (NGAY_SINH !== undefined && NGAY_SINH !== null) {
      const formattedNgaySinh = dayjs(NGAY_SINH).format("YYYY-MM-DD"); // Sử dụng dayjs để chuyển đổi
      updateFields.push("NGAY_SINH = ?");
      updateValues.push(formattedNgaySinh);
    }
    if (DIA_CHI_Provinces !== undefined && DIA_CHI_Provinces !== null) {
      updateFields.push("DIA_CHI_Provinces = ?");
      updateValues.push(DIA_CHI_Provinces);
    }
    if (DIA_CHI_Districts !== undefined && DIA_CHI_Districts !== null) {
      updateFields.push("DIA_CHI_Districts = ?");
      updateValues.push(DIA_CHI_Districts);
    }
    if (DIA_CHI_Wards !== undefined && DIA_CHI_Wards !== null) {
      updateFields.push("DIA_CHI_Wards = ?");
      updateValues.push(DIA_CHI_Wards);
    }

    // Thêm trường ngày cập nhật
    const ngayCapNhat = new Date();
    updateFields.push("NGAY_CAP_NHAT_USER = ?");
    updateValues.push(ngayCapNhat);

    // Nếu không có gì cần cập nhật, trả về lỗi
    if (updateFields.length === 0) {
      return res.status(400).json({
        EM: "Không có thông tin cần cập nhật",
        EC: 0,
        DT: [],
      });
    }

    // Cập nhật thông tin người dùng
    const updateQuery = `
      UPDATE NGUOI_DUNG 
      SET ${updateFields.join(", ")}
      WHERE ID_NGUOI_DUNG = ?
    `;

    // Thêm ID người dùng vào cuối giá trị để xác định người dùng cần cập nhật
    updateValues.push(id);

    const [updateResult] = await pool.execute(updateQuery, updateValues);

    if (updateResult.affectedRows > 0) {
      // Lấy lại thông tin mới nhất của người dùng sau khi cập nhật
      const [updatedUser] = await pool.execute(
        "SELECT * FROM NGUOI_DUNG WHERE ID_NGUOI_DUNG = ?",
        [id]
      );

      return res.status(200).json({
        EM: "Cập nhật thông tin thành công",
        EC: 1,
        DT: updatedUser,
      });
    } else {
      return res.status(400).json({
        EM: "Cập nhật không thành công",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Lỗi trong updateUserById_User:", error);
    return res.status(500).json({
      EM: `Lỗi hệ thống: ${error.message}`,
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
          SO_DIEN_THOAI: user.SO_DIEN_THOAI,
          DIA_CHI: user.DIA_CHI,
          TRANG_THAI_USER: user.TRANG_THAI_USER,
          NGAY_TAO_USER: user.NGAY_TAO_USER,
          NGAY_CAP_NHAT_USER: user.NGAY_CAP_NHAT_USER,
          AVATAR: user.AVATAR,
        },
        JWT_SECRET,
        { expiresIn: "5h" }
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
        JWT_SECRET,
        { expiresIn: "5h" }
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
// API thay đổi avatar
const updateAvatarController = async (req, res) => {
  try {
    const { id } = req.params;
    const { avatar } = req.body;
    const ngayCapNhat = new Date();
    const avatarFile = req.file ? path.basename(req.file.path) : avatar;
    const [results] = await pool.execute(
      "SELECT * FROM NGUOI_DUNG WHERE ID_NGUOI_DUNG = ?",
      [id]
    );
    console.log("id user =>", id);
    if (results.length > 0) {
      const [results] = await pool.execute(
        "UPDATE NGUOI_DUNG SET NGAY_CAP_NHAT_USER = ? , AVATAR = ? WHERE ID_NGUOI_DUNG = ?",
        [ngayCapNhat, avatarFile, id]
      );

      return res.status(200).json({
        EM: "Cập nhật avatar thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy người dùng",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error updating avatar:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật avatar",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  loginUserGoogle,
  verifyAdmin,
  logoutUser,

  updateUserById_Admin,
  getAllUser_Admin,
  updateAvatarController,
  getUser_ById,
  updateUserById_User,
};
