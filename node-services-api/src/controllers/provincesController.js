const pool = require("../config/database");

const getProvincesAll = async (req, res) => {
  try {
    // Kết nối và thực thi query
    const [rows] = await pool.query("SELECT * FROM provinces");

    // Trả dữ liệu cho client
    res.status(200).json({
      status: "success",
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching provinces:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch provinces",
    });
  }
};
module.exports = { getProvincesAll };
