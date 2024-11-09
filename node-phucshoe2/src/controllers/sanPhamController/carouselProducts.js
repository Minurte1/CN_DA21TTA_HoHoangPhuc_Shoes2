const connection = require("../../config/database");

const getCAROUSEL_PRODUCTS = async (req, res) => {
  try {
    const [results] = await connection.execute(`
        SELECT 
          cp.ID_CAROUSEL, cp.ID_SAN_PHAM, cp.HINH_ANH_NEN_CAROUSEL, cp.HINH_ANH_ICON_CAROUSEL, 
          cp.MO_TA_CAROUSEL, cp.TRANG_THAI_CAROUSEL, cp.NGAY_TAO_CAROUSEL, cp.NGAY_CAP_NHAT_CAROUSEL,
          sp.TEN_SAN_PHAM
        FROM CAROUSEL_PRODUCTS cp
        LEFT JOIN SAN_PHAM sp ON cp.ID_SAN_PHAM = sp.ID_SAN_PHAM
        WHERE cp.TRANG_THAI_CAROUSEL = 1
        ORDER BY cp.NGAY_TAO_CAROUSEL DESC
        LIMIT 7
      `);

    return res.status(200).json({
      EM: "Xem thông tin carousel thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting carousel products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin carousel",
      EC: 0,
      DT: [],
    });
  }
};

const getCAROUSEL_PRODUCT_BY_ID = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      `
        SELECT 
          cp.ID_CAROUSEL, cp.ID_SAN_PHAM, cp.HINH_ANH_NEN_CAROUSEL, cp.HINH_ANH_ICON_CAROUSEL, 
          cp.MO_TA_CAROUSEL, cp.TRANG_THAI_CAROUSEL, cp.NGAY_TAO_CAROUSEL, cp.NGAY_CAP_NHAT_CAROUSEL,
          sp.TEN_SAN_PHAM
        FROM CAROUSEL_PRODUCTS cp
        LEFT JOIN SAN_PHAM sp ON cp.ID_SAN_PHAM = sp.ID_SAN_PHAM
        WHERE cp.ID_CAROUSEL = ?
      `,
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({
        EM: "Không tìm thấy carousel với ID này",
        EC: 0,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Xem thông tin carousel thành công",
      EC: 1,
      DT: results[0],
    });
  } catch (error) {
    console.error("Error getting carousel product by ID:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin carousel",
      EC: 0,
      DT: [],
    });
  }
};

const createCAROUSEL_PRODUCT = async (req, res) => {
  const {
    ID_SAN_PHAM,
    HINH_ANH_NEN_CAROUSEL,
    HINH_ANH_ICON_CAROUSEL,
    MO_TA_CAROUSEL,
    TRANG_THAI_CAROUSEL,
  } = req.body;
  const images = req.file ? path.basename(req.file.path) : null;

  try {
    const [results] = await connection.execute(
      `
        INSERT INTO CAROUSEL_PRODUCTS (ID_SAN_PHAM, HINH_ANH_NEN_CAROUSEL, HINH_ANH_ICON_CAROUSEL, MO_TA_CAROUSEL, TRANG_THAI_CAROUSEL)
        VALUES (?, ?, ?, ?, ?)
      `,
      [
        ID_SAN_PHAM,
        HINH_ANH_NEN_CAROUSEL,
        HINH_ANH_ICON_CAROUSEL,
        MO_TA_CAROUSEL,
        TRANG_THAI_CAROUSEL,
      ]
    );

    return res.status(201).json({
      EM: "Thêm carousel thành công",
      EC: 1,
      DT: { ID_CAROUSEL: results.insertId },
    });
  } catch (error) {
    console.error("Error creating carousel product:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thêm carousel",
      EC: 0,
      DT: [],
    });
  }
};

const updateCAROUSEL_PRODUCT = async (req, res) => {
  const { id } = req.params;
  const {
    HINH_ANH_NEN_CAROUSEL,
    HINH_ANH_ICON_CAROUSEL,
    MO_TA_CAROUSEL,
    TRANG_THAI_CAROUSEL,
  } = req.body;
  try {
    const [results] = await connection.execute(
      `
        UPDATE CAROUSEL_PRODUCTS
        SET HINH_ANH_NEN_CAROUSEL = ?, HINH_ANH_ICON_CAROUSEL = ?, MO_TA_CAROUSEL = ?, TRANG_THAI_CAROUSEL = ?, NGAY_CAP_NHAT_CAROUSEL = CURRENT_TIMESTAMP
        WHERE ID_CAROUSEL = ?
      `,
      [
        HINH_ANH_NEN_CAROUSEL,
        HINH_ANH_ICON_CAROUSEL,
        MO_TA_CAROUSEL,
        TRANG_THAI_CAROUSEL,
        id,
      ]
    );

    if (results.affectedRows === 0) {
      return res.status(404).json({
        EM: "Không tìm thấy carousel với ID này",
        EC: 0,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Cập nhật carousel thành công",
      EC: 1,
      DT: { ID_CAROUSEL: id },
    });
  } catch (error) {
    console.error("Error updating carousel product:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật carousel",
      EC: 0,
      DT: [],
    });
  }
};

const deleteCAROUSEL_PRODUCT = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      `
        DELETE FROM CAROUSEL_PRODUCTS WHERE ID_CAROUSEL = ?
      `,
      [id]
    );

    if (results.affectedRows === 0) {
      return res.status(404).json({
        EM: "Không tìm thấy carousel với ID này",
        EC: 0,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Xóa carousel thành công",
      EC: 1,
      DT: [],
    });
  } catch (error) {
    console.error("Error deleting carousel product:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa carousel",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getCAROUSEL_PRODUCTS,
  getCAROUSEL_PRODUCT_BY_ID,
  createCAROUSEL_PRODUCT,
  updateCAROUSEL_PRODUCT,
  deleteCAROUSEL_PRODUCT,
};
