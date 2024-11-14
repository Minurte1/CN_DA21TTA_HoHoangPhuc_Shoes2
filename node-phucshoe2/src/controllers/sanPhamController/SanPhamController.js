const connection = require("../../config/database.js");

const fs = require("fs");
const path = require("path");

// Lấy danh sách sản phẩm
const getSAN_PHAM = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT 
        sp.ID_SAN_PHAM, sp.ID_THUONG_HIEU, sp.ID_DANH_MUC, sp.GIOI_TINH_ID, sp.CHAT_LIEU_ID_,
        sp.TEN_SAN_PHAM, sp.GIA, sp.MO_TA_SAN_PHAM, sp.HINH_ANH_SANPHAM, sp.TRANG_THAI_SANPHAM, 
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, sp.SO_LUONG_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC,
        cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU,
        th.TEN_THUONG_HIEU,
        
        -- Additional fields from PHONG_CACH, MAU_SAC, MUC_DICH_SU_DUNG, and KICH_CO tables
        pc.ID_PHUONG_CACH, pc.TEN_PHONG_CACH, pc.CREATED_PHONG_CACH, pc.UPDATE_PHONG_CACH, pc.TRANG_THAI_PHONG_CACH,
        ms.MAU_SAC_ID, ms.TEN_MAU_SAC, ms.CREATE_MAU_SAC, ms.UPDATE_MAU_SAC, ms.TRANG_THAI_MAU_SAC,
        mdsd.ID_MUC_DICH_SU_DUNG, mdsd.TEN_MUC_DICH_SU_DUNG, mdsd.CREATE_MUC_DICH_SU_DUNG, mdsd.UPDATE_MUC_DICH_SU_DUNG, mdsd.TRANG_THAI_MUC_DICH_SU_DUNG,
        kc.ID_KICH_CO, kc.KICH_CO, kc.TRANG_THAI_KICH_CO, kc.CREATED_KICH_CO, kc.UPDATE_KICH_CO

      FROM SAN_PHAM sp
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU

      -- Joins to retrieve additional details
      LEFT JOIN PHONG_CACH_SAN_PHAM pcs ON sp.ID_SAN_PHAM = pcs.ID_SAN_PHAM
      LEFT JOIN PHONG_CACH pc ON pcs.ID_PHUONG_CACH = pc.ID_PHUONG_CACH
      
      LEFT JOIN MAU_SAC_SAN_PHAM mss ON sp.ID_SAN_PHAM = mss.ID_SAN_PHAM
      LEFT JOIN MAU_SAC ms ON mss.MAU_SAC_ID = ms.MAU_SAC_ID

      LEFT JOIN MUC_DICH_SU_DUNG_SAN_PHAM mdsds ON sp.ID_SAN_PHAM = mdsds.ID_SAN_PHAM
      LEFT JOIN MUC_DICH_SU_DUNG mdsd ON mdsds.ID_MUC_DICH_SU_DUNG = mdsd.ID_MUC_DICH_SU_DUNG

      LEFT JOIN CO_KICH_CO ckc ON sp.ID_SAN_PHAM = ckc.ID_SAN_PHAM
      LEFT JOIN KICH_CO kc ON ckc.ID_KICH_CO = kc.ID_KICH_CO

      ORDER BY sp.NGAY_TAO_SANPHAM DESC
    `);

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

const getSAN_PHAM_Use_ById = async (req, res) => {
  const { id } = req.params; // Lấy id từ tham số URL

  try {
    const [results] = await connection.execute(
      `
      SELECT 
        sp.ID_SAN_PHAM, sp.ID_THUONG_HIEU, sp.ID_DANH_MUC, sp.GIOI_TINH_ID, sp.CHAT_LIEU_ID_,
        sp.TEN_SAN_PHAM, sp.GIA, sp.MO_TA_SAN_PHAM, sp.HINH_ANH_SANPHAM, sp.TRANG_THAI_SANPHAM, 
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, sp.SO_LUONG_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC,
        cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU,
        th.TEN_THUONG_HIEU,

        -- Additional fields from PHONG_CACH, MAU_SAC, MUC_DICH_SU_DUNG, and KICH_CO tables
        pc.ID_PHUONG_CACH, pc.TEN_PHONG_CACH, pc.CREATED_PHONG_CACH, pc.UPDATE_PHONG_CACH, pc.TRANG_THAI_PHONG_CACH,
        ms.MAU_SAC_ID, ms.TEN_MAU_SAC, ms.CREATE_MAU_SAC, ms.UPDATE_MAU_SAC, ms.TRANG_THAI_MAU_SAC,
        mdsd.ID_MUC_DICH_SU_DUNG, mdsd.TEN_MUC_DICH_SU_DUNG, mdsd.CREATE_MUC_DICH_SU_DUNG, mdsd.UPDATE_MUC_DICH_SU_DUNG, mdsd.TRANG_THAI_MUC_DICH_SU_DUNG,
        kc.ID_KICH_CO, kc.KICH_CO, kc.TRANG_THAI_KICH_CO, kc.CREATED_KICH_CO, kc.UPDATE_KICH_CO

      FROM SAN_PHAM sp
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU

      -- Joins to retrieve additional details
      LEFT JOIN PHONG_CACH_SAN_PHAM pcs ON sp.ID_SAN_PHAM = pcs.ID_SAN_PHAM
      LEFT JOIN PHONG_CACH pc ON pcs.ID_PHUONG_CACH = pc.ID_PHUONG_CACH
      LEFT JOIN MAU_SAC_SAN_PHAM mss ON sp.ID_SAN_PHAM = mss.ID_SAN_PHAM
      LEFT JOIN MAU_SAC ms ON mss.MAU_SAC_ID = ms.MAU_SAC_ID
      LEFT JOIN MUC_DICH_SU_DUNG_SAN_PHAM mdsds ON sp.ID_SAN_PHAM = mdsds.ID_SAN_PHAM
      LEFT JOIN MUC_DICH_SU_DUNG mdsd ON mdsds.ID_MUC_DICH_SU_DUNG = mdsd.ID_MUC_DICH_SU_DUNG
      LEFT JOIN CO_KICH_CO ckc ON sp.ID_SAN_PHAM = ckc.ID_SAN_PHAM
      LEFT JOIN KICH_CO kc ON ckc.ID_KICH_CO = kc.ID_KICH_CO

      WHERE sp.TRANG_THAI_SANPHAM = 1 AND sp.ID_SAN_PHAM = ?
    `,
      [id]
    ); // Thêm ? vào query để sử dụng tham số id

    if (results.length === 0) {
      return res.status(404).json({
        EM: "Sản phẩm không tìm thấy",
        EC: 0,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: results[0], // Chỉ trả về sản phẩm đầu tiên (nếu có)
    });
  } catch (error) {
    console.error("Error getting san pham by id:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

const getSAN_PHAM_Use = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT 
        sp.ID_SAN_PHAM, sp.ID_THUONG_HIEU, sp.ID_DANH_MUC, sp.GIOI_TINH_ID, sp.CHAT_LIEU_ID_,
        sp.TEN_SAN_PHAM, sp.GIA, sp.MO_TA_SAN_PHAM, sp.HINH_ANH_SANPHAM, sp.TRANG_THAI_SANPHAM, 
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, sp.SO_LUONG_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC,
        cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU,
        th.TEN_THUONG_HIEU,

        -- Additional fields from PHONG_CACH, MAU_SAC, MUC_DICH_SU_DUNG, and KICH_CO tables
        pc.ID_PHUONG_CACH, pc.TEN_PHONG_CACH, pc.CREATED_PHONG_CACH, pc.UPDATE_PHONG_CACH, pc.TRANG_THAI_PHONG_CACH,
        ms.MAU_SAC_ID, ms.TEN_MAU_SAC, ms.CREATE_MAU_SAC, ms.UPDATE_MAU_SAC, ms.TRANG_THAI_MAU_SAC,
        mdsd.ID_MUC_DICH_SU_DUNG, mdsd.TEN_MUC_DICH_SU_DUNG, mdsd.CREATE_MUC_DICH_SU_DUNG, mdsd.UPDATE_MUC_DICH_SU_DUNG, mdsd.TRANG_THAI_MUC_DICH_SU_DUNG,
        kc.ID_KICH_CO, kc.KICH_CO, kc.TRANG_THAI_KICH_CO, kc.CREATED_KICH_CO, kc.UPDATE_KICH_CO

      FROM SAN_PHAM sp
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU

      -- Joins to retrieve additional details
      LEFT JOIN PHONG_CACH_SAN_PHAM pcs ON sp.ID_SAN_PHAM = pcs.ID_SAN_PHAM
      LEFT JOIN PHONG_CACH pc ON pcs.ID_PHUONG_CACH = pc.ID_PHUONG_CACH
      
      LEFT JOIN MAU_SAC_SAN_PHAM mss ON sp.ID_SAN_PHAM = mss.ID_SAN_PHAM
      LEFT JOIN MAU_SAC ms ON mss.MAU_SAC_ID = ms.MAU_SAC_ID

      LEFT JOIN MUC_DICH_SU_DUNG_SAN_PHAM mdsds ON sp.ID_SAN_PHAM = mdsds.ID_SAN_PHAM
      LEFT JOIN MUC_DICH_SU_DUNG mdsd ON mdsds.ID_MUC_DICH_SU_DUNG = mdsd.ID_MUC_DICH_SU_DUNG

      LEFT JOIN CO_KICH_CO ckc ON sp.ID_SAN_PHAM = ckc.ID_SAN_PHAM
      LEFT JOIN KICH_CO kc ON ckc.ID_KICH_CO = kc.ID_KICH_CO

      WHERE sp.TRANG_THAI_SANPHAM = 1
    `);

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

//lấy tất cả sản phẩm ĐANG HOẠT ĐỘNG = NỮ
const getSAN_PHAM_Use_Nu = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT 
        sp.ID_SAN_PHAM, sp.ID_THUONG_HIEU, sp.ID_DANH_MUC, sp.GIOI_TINH_ID, sp.CHAT_LIEU_ID_,
        sp.TEN_SAN_PHAM, sp.GIA, sp.MO_TA_SAN_PHAM, sp.HINH_ANH_SANPHAM, sp.TRANG_THAI_SANPHAM, 
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, sp.SO_LUONG_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC,
        cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU,
        th.TEN_THUONG_HIEU
      FROM SAN_PHAM sp
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
      WHERE sp.TRANG_THAI_SANPHAM = 1
      AND gt.TEN_GIOI_TINH = 'Nữ'  -- Điều kiện phân loại theo giới tính là "Nữ"
    `);

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};
const getSAN_PHAM_Use_TreEm = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT 
        sp.ID_SAN_PHAM, sp.ID_THUONG_HIEU, sp.ID_DANH_MUC, sp.GIOI_TINH_ID, sp.CHAT_LIEU_ID_,
        sp.TEN_SAN_PHAM, sp.GIA, sp.MO_TA_SAN_PHAM, sp.HINH_ANH_SANPHAM, sp.TRANG_THAI_SANPHAM, 
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, sp.SO_LUONG_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC,
        cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU,
        th.TEN_THUONG_HIEU
      FROM SAN_PHAM sp
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
      WHERE sp.TRANG_THAI_SANPHAM = 1
      AND gt.TEN_GIOI_TINH = 'Trẻ em' ORDER BY sp.NGAY_TAO_SANPHAM DESC  -- Sắp xếp sản phẩm theo ngày tạo giảm dần
      LIMIT 4 -- Lấy 2 sản phẩm mới nhất  -- Điều kiện phân loại theo giới tính là "Nữ"
    `);

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};
//lấy 2 sản phẩm mới thêm vào
const getLatest2Products = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT 
        sp.ID_SAN_PHAM, sp.ID_THUONG_HIEU, sp.ID_DANH_MUC, sp.GIOI_TINH_ID, sp.CHAT_LIEU_ID_,
        sp.TEN_SAN_PHAM, sp.GIA, sp.MO_TA_SAN_PHAM, sp.HINH_ANH_SANPHAM, sp.TRANG_THAI_SANPHAM, 
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, sp.SO_LUONG_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC,
        cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU,
        th.TEN_THUONG_HIEU
      FROM SAN_PHAM sp
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
      WHERE sp.TRANG_THAI_SANPHAM = 1
      ORDER BY sp.NGAY_TAO_SANPHAM DESC  -- Sắp xếp sản phẩm theo ngày tạo giảm dần
      LIMIT 2  -- Lấy 2 sản phẩm mới nhất
    `);

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};
const get_5CheapestProdcts = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT 
        sp.ID_SAN_PHAM, sp.ID_THUONG_HIEU, sp.ID_DANH_MUC, sp.GIOI_TINH_ID, sp.CHAT_LIEU_ID_,
        sp.TEN_SAN_PHAM, sp.GIA, sp.MO_TA_SAN_PHAM, sp.HINH_ANH_SANPHAM, sp.TRANG_THAI_SANPHAM, 
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, sp.SO_LUONG_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC,
        cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU,
        th.TEN_THUONG_HIEU
      FROM SAN_PHAM sp
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
      WHERE sp.TRANG_THAI_SANPHAM = 1
      ORDER BY sp.GIA ASC
      LIMIT 5
    `);

    return res.status(200).json({
      EM: "Xem 5 sản phẩm giá rẻ nhất thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting cheapest san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin sản phẩm giá rẻ nhất",
      EC: 0,
      DT: [],
    });
  }
};

const getTop5BestSellingProducts = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT 
        sp.ID_SAN_PHAM, sp.ID_THUONG_HIEU, sp.ID_DANH_MUC, sp.GIOI_TINH_ID, sp.CHAT_LIEU_ID_,
        sp.TEN_SAN_PHAM, sp.GIA, sp.MO_TA_SAN_PHAM, sp.HINH_ANH_SANPHAM, sp.TRANG_THAI_SANPHAM, 
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, sp.SO_LUONG_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC,
        cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU,
        th.TEN_THUONG_HIEU,
        SUM(cthd.SO_LUONG_SP) AS total_sold
      FROM SAN_PHAM sp
      LEFT JOIN CHI_TIET_HOA_DON cthd ON sp.ID_SAN_PHAM = cthd.ID_SAN_PHAM
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
      WHERE sp.TRANG_THAI_SANPHAM = 1
      GROUP BY sp.ID_SAN_PHAM
      ORDER BY total_sold DESC
      LIMIT 5
    `);

    return res.status(200).json({
      EM: "Xem 5 sản phẩm bán chạy nhất thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting best-selling products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin sản phẩm bán chạy nhất",
      EC: 0,
      DT: [],
    });
  }
};
// Lấy 5 sản phẩm được người ta yêu thích nhiều nhất
const get5TopFavoriteProducts = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT 
        sp.ID_SAN_PHAM, sp.TEN_SAN_PHAM, sp.GIA, sp.HINH_ANH_SANPHAM,
        COUNT(yt.ID_YEU_THICH) AS favorite_count
      FROM SAN_PHAM sp
      LEFT JOIN YEU_THICH yt ON sp.ID_SAN_PHAM = yt.ID_SAN_PHAM
      WHERE sp.TRANG_THAI_SANPHAM = 1
      GROUP BY sp.ID_SAN_PHAM
      ORDER BY favorite_count DESC
      LIMIT 5
    `);

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm được yêu thích nhất thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting favorite products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin sản phẩm yêu thích",
      EC: 0,
      DT: [],
    });
  }
};
// Lấy 5 sản phẩm có giá tiền cao nhất
const getTopExpensiveProducts = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT 
        sp.ID_SAN_PHAM, sp.TEN_SAN_PHAM, sp.GIA, sp.HINH_ANH_SANPHAM, sp.MO_TA_SAN_PHAM
      FROM SAN_PHAM sp
      WHERE sp.TRANG_THAI_SANPHAM = 1
      ORDER BY sp.GIA DESC
      LIMIT 5
    `);

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm có giá cao nhất thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting top expensive products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

// Lấy tất cả sản phẩm trong yêu thích của 1 người dùng
const getFavoriteProductsByUser = async (req, res) => {
  const userId = req.params.id; // Lấy userId từ tham số URL

  try {
    const [results] = await connection.execute(
      `
      SELECT 
        yt.ID_SAN_PHAM, yt.NGAY_YEU_THICH,
        sp.TEN_SAN_PHAM, 
        sp.GIA, 
        sp.HINH_ANH_SANPHAM, 
        sp.MO_TA_SAN_PHAM,
        sp.TRANG_THAI_SANPHAM, 
        sp.SO_LUONG_SANPHAM, 
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC,
        cl.TEN_CHAT_LIEU_,
        th.TEN_THUONG_HIEU
        
      FROM YEU_THICH yt
      JOIN SAN_PHAM sp ON yt.ID_SAN_PHAM = sp.ID_SAN_PHAM
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
      WHERE yt.ID_NGUOI_DUNG = ? AND sp.TRANG_THAI_SANPHAM = 1
      ORDER BY yt.NGAY_YEU_THICH DESC -- Sắp xếp theo ngày yêu thích mới nhất
    `,
      [userId]
    );

    if (results.length === 0) {
      return res.status(404).json({
        EM: "Không có sản phẩm yêu thích cho người dùng hoặc sản phẩm không tồn tại",
        EC: 0,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Lấy thông tin sản phẩm yêu thích thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting favorite products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy sản phẩm yêu thích",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo sản phẩm mới
const createSAN_PHAM = async (req, res) => {
  try {
    const {
      idThuongHieu,
      idDanhMuc,
      gioiTinhId,
      chatLieuId,
      tenSanPham,
      gia,
      moTaSanPham,
      trangThaiSanPham,
      soLuongSanPham,
      option,

      phongCachId,
      mauSacId,
      mucDichSuDungId,
      kichCoId,
    } = req.body;
    const ngayTaoSanPham = new Date();
    const images = req.file ? path.basename(req.file.path) : null;
    const [results] = await connection.execute(
      "INSERT INTO SAN_PHAM (ID_THUONG_HIEU, ID_DANH_MUC, GIOI_TINH_ID, CHAT_LIEU_ID_, TEN_SAN_PHAM, GIA, MO_TA_SAN_PHAM, HINH_ANH_SANPHAM, TRANG_THAI_SANPHAM, NGAY_TAO_SANPHAM, NGAY_CAP_NHAT_SANPHAM, SO_LUONG_SANPHAM) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        idThuongHieu,
        idDanhMuc,
        gioiTinhId,
        chatLieuId,
        tenSanPham,
        gia,
        moTaSanPham,
        images,
        trangThaiSanPham,
        ngayTaoSanPham,
        ngayTaoSanPham,
        soLuongSanPham,
      ]
    );
    const newProductId = results.insertId;
    console.log("option value:", option);

    // Kiểm tra nếu option là boolean false
    if (option === false) {
      console.log("Điều kiện true khi option là false");
      // Tiến hành xử lý khi option là false
    } else {
      console.log("option không phải là false");
    }

    if (option) {
      console.log("newProductId", newProductId);
      // Insert vào bảng PHONG_CACH_SAN_PHAM
      await connection.execute(
        "INSERT INTO PHONG_CACH_SAN_PHAM (ID_SAN_PHAM, ID_PHUONG_CACH) VALUES (?, ?)",
        [newProductId, phongCachId]
      );

      // Insert vào bảng MAU_SAC_SAN_PHAM
      await connection.execute(
        "INSERT INTO MAU_SAC_SAN_PHAM (ID_SAN_PHAM, MAU_SAC_ID) VALUES (?, ?)",
        [newProductId, mauSacId]
      );

      // Insert vào bảng MUC_DICH_SU_DUNG_SAN_PHAM
      await connection.execute(
        "INSERT INTO MUC_DICH_SU_DUNG_SAN_PHAM (ID_SAN_PHAM, ID_MUC_DICH_SU_DUNG) VALUES (?, ?)",
        [newProductId, mucDichSuDungId]
      );

      // Insert vào bảng CO_KICH_CO
      await connection.execute(
        "INSERT INTO CO_KICH_CO (ID_SAN_PHAM, ID_KICH_CO) VALUES (?, ?)",
        [newProductId, kichCoId]
      );
    }
    return res.status(201).json({
      EM: "Thêm sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error creating san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thêm sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

// Cập nhật sản phẩm
const updateSAN_PHAM = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      idThuongHieu,
      idDanhMuc,
      gioiTinhId,
      chatLieuId,
      tenSanPham,
      gia,
      moTaSanPham,
      trangThaiSanPham,
      soLuongSanPham,
      option,
      phongCachId,
      mauSacId,
      mucDichSuDungId,
      kichCoId,
    } = req.body;

    const ngayCapNhatSanPham = new Date();

    // Lấy hình ảnh nếu có tải lên mới, nếu không thì giữ hình ảnh cũ
    const images = req.file ? path.basename(req.file.path) : req.body.images;

    // Kiểm tra sản phẩm có tồn tại hay không
    const [results] = await connection.execute(
      "SELECT * FROM SAN_PHAM WHERE ID_SAN_PHAM = ?",
      [id]
    );

    if (results.length > 0) {
      // Cập nhật bảng SAN_PHAM
      await connection.execute(
        "UPDATE SAN_PHAM SET ID_THUONG_HIEU = ?, ID_DANH_MUC = ?, GIOI_TINH_ID = ?, CHAT_LIEU_ID_ = ?, TEN_SAN_PHAM = ?, GIA = ?, MO_TA_SAN_PHAM = ?, HINH_ANH_SANPHAM = ?, TRANG_THAI_SANPHAM = ?, NGAY_CAP_NHAT_SANPHAM = ?, SO_LUONG_SANPHAM = ? WHERE ID_SAN_PHAM = ?",
        [
          idThuongHieu,
          idDanhMuc,
          gioiTinhId,
          chatLieuId,
          tenSanPham,
          gia,
          moTaSanPham,
          images,
          trangThaiSanPham,
          ngayCapNhatSanPham,
          soLuongSanPham,
          id,
        ]
      );

      // Nếu option là true, cập nhật các bảng liên kết
      if (option) {
        // Cập nhật bảng PHONG_CACH_SAN_PHAM
        await connection.execute(
          "REPLACE INTO PHONG_CACH_SAN_PHAM (ID_SAN_PHAM, ID_PHUONG_CACH) VALUES (?, ?)",
          [id, phongCachId]
        );

        // Cập nhật bảng MAU_SAC_SAN_PHAM
        await connection.execute(
          "REPLACE INTO MAU_SAC_SAN_PHAM (ID_SAN_PHAM, MAU_SAC_ID) VALUES (?, ?)",
          [id, mauSacId]
        );

        // Cập nhật bảng MUC_DICH_SU_DUNG_SAN_PHAM
        await connection.execute(
          "REPLACE INTO MUC_DICH_SU_DUNG_SAN_PHAM (ID_SAN_PHAM, ID_MUC_DICH_SU_DUNG) VALUES (?, ?)",
          [id, mucDichSuDungId]
        );

        // Cập nhật bảng CO_KICH_CO
        await connection.execute(
          "REPLACE INTO CO_KICH_CO (ID_SAN_PHAM, ID_KICH_CO) VALUES (?, ?)",
          [id, kichCoId]
        );
      }

      return res.status(200).json({
        EM: "Cập nhật sản phẩm thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy sản phẩm",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error updating san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};
// Xóa sản phẩm

const deleteSAN_PHAM = async (req, res) => {
  const { id } = req.params;
  try {
    // Bước 1: Lấy thông tin sản phẩm để lấy tên hình ảnh
    const [results] = await connection.execute(
      "SELECT HINH_ANH_SANPHAM FROM SAN_PHAM WHERE ID_SAN_PHAM = ?",
      [id]
    );

    // Kiểm tra xem sản phẩm có tồn tại hay không
    if (results.length > 0) {
      const imageName = results[0].HINH_ANH_SANPHAM; // Tên hình ảnh sản phẩm

      if (imageName) {
        // Bước 2: Xóa hình ảnh khỏi thư mục lưu trữ
        const imagePath = path.resolve(
          __dirname,
          "../../public/images",
          imageName
        );

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Lỗi khi xóa hình ảnh:", err);
          } else {
            console.log("Đã xóa hình ảnh:", imagePath);
          }
        });
      }

      // Xóa tất cả các bản ghi liên quan từ các bảng phụ thuộc
      await connection.execute(
        "DELETE FROM PHONG_CACH_SAN_PHAM WHERE ID_SAN_PHAM = ?",
        [id]
      );
      await connection.execute(
        "DELETE FROM MAU_SAC_SAN_PHAM WHERE ID_SAN_PHAM = ?",
        [id]
      );
      await connection.execute(
        "DELETE FROM MUC_DICH_SU_DUNG_SAN_PHAM WHERE ID_SAN_PHAM = ?",
        [id]
      );
      await connection.execute("DELETE FROM CO_KICH_CO WHERE ID_SAN_PHAM = ?", [
        id,
      ]);

      // Bước 3: Xóa sản phẩm khỏi cơ sở dữ liệu
      await connection.execute("DELETE FROM SAN_PHAM WHERE ID_SAN_PHAM = ?", [
        id,
      ]);

      return res.status(200).json({
        EM: "Xóa sản phẩm thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy sản phẩm để xóa",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error deleting san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getSAN_PHAM,
  createSAN_PHAM,
  updateSAN_PHAM,
  deleteSAN_PHAM,
  getSAN_PHAM_Use,
  getSAN_PHAM_Use_Nu,
  getLatest2Products,
  getSAN_PHAM_Use_TreEm,
  get_5CheapestProdcts,
  getTop5BestSellingProducts,
  get5TopFavoriteProducts,
  getTopExpensiveProducts,

  getFavoriteProductsByUser,
  getSAN_PHAM_Use_ById,
};
