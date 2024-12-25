const connection = require("../../config/database.js");

const fs = require("fs");
const path = require("path");

// Lấy danh sách sản phẩm
const getSAN_PHAM = async (req, res) => {
  try {
    const [results] = await connection.execute(`
   SELECT 
    sp.ID_SAN_PHAM, 
    sp.ID_THUONG_HIEU, 
    sp.ID_DANH_MUC, 
    sp.GIOI_TINH_ID, 
    sp.CHAT_LIEU_ID_,
    sp.TEN_SAN_PHAM, 
    sp.GIA, 
    sp.MO_TA_SAN_PHAM, 
    sp.HINH_ANH_SANPHAM, 
    sp.TRANG_THAI_SANPHAM, 
    sp.NGAY_TAO_SANPHAM, 
    sp.NGAY_CAP_NHAT_SANPHAM, 
    sp.SO_LUONG_SANPHAM,
    gt.TEN_GIOI_TINH,
    dm.TEN_DANH_MUC, 
    dm.MO_TA_LOAI_DANH_MUC,
    cl.TEN_CHAT_LIEU_, 
    cl.MO_TA_CHAT_LIEU,
    th.TEN_THUONG_HIEU,
    mdsd.ID_MUC_DICH_SU_DUNG,
    mdsd.TEN_MUC_DICH_SU_DUNG,
    mdsd.CREATE_MUC_DICH_SU_DUNG,
    mdsd.UPDATE_MUC_DICH_SU_DUNG, 
    mdsd.TRANG_THAI_MUC_DICH_SU_DUNG,
    pc.ID_PHUONG_CACH, 
    pc.TEN_PHONG_CACH, 
    pc.CREATED_PHONG_CACH, 
    pc.UPDATE_PHONG_CACH, 
    pc.TRANG_THAI_PHONG_CACH,
    GROUP_CONCAT(DISTINCT CONCAT(ms.TEN_MAU_SAC, ' - ', kc.KICH_CO) ORDER BY ms.TEN_MAU_SAC SEPARATOR ', ') AS CHI_TIET_SAN_PHAM
FROM SAN_PHAM sp
LEFT JOIN PHONG_CACH_SAN_PHAM pcsp ON sp.ID_SAN_PHAM = pcsp.ID_SAN_PHAM
LEFT JOIN PHONG_CACH pc ON pcsp.ID_PHUONG_CACH = pc.ID_PHUONG_CACH
LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
LEFT JOIN SAN_PHAM_CHI_TIET spct ON sp.ID_SAN_PHAM = spct.ID_SAN_PHAM
LEFT JOIN MAU_SAC ms ON spct.MAU_SAC_ID = ms.MAU_SAC_ID
LEFT JOIN KICH_CO kc ON spct.ID_KICH_CO = kc.ID_KICH_CO
LEFT JOIN MUC_DICH_SU_DUNG_SAN_PHAM mdsdsp ON sp.ID_SAN_PHAM = mdsdsp.ID_SAN_PHAM
LEFT JOIN MUC_DICH_SU_DUNG mdsd ON mdsdsp.ID_MUC_DICH_SU_DUNG = mdsd.ID_MUC_DICH_SU_DUNG
GROUP BY 
    sp.ID_SAN_PHAM, 
    gt.TEN_GIOI_TINH, 
    dm.TEN_DANH_MUC, 
    dm.MO_TA_LOAI_DANH_MUC, 
    cl.TEN_CHAT_LIEU_, 
    cl.MO_TA_CHAT_LIEU, 
    th.TEN_THUONG_HIEU, 
    mdsd.ID_MUC_DICH_SU_DUNG, 
    mdsd.TEN_MUC_DICH_SU_DUNG, 
    mdsd.CREATE_MUC_DICH_SU_DUNG, 
    mdsd.UPDATE_MUC_DICH_SU_DUNG, 
    mdsd.TRANG_THAI_MUC_DICH_SU_DUNG, 
    pc.ID_PHUONG_CACH, 
    pc.TEN_PHONG_CACH, 
    pc.CREATED_PHONG_CACH, 
    pc.UPDATE_PHONG_CACH, 
    pc.TRANG_THAI_PHONG_CACH
ORDER BY sp.NGAY_TAO_SANPHAM DESC;

    `);
    // Loop through each product to get detailed information
    for (let product of results) {
      const [detailResults] = await connection.execute(
        `
      SELECT 
        spct.ID_SAN_PHAM_CHI_TIET,
        ms.MAU_SAC_ID, ms.TEN_MAU_SAC, ms.MA_MAU,
          spct.SOLUONG_SANPHAM_CHITIET,
        kc.ID_KICH_CO, kc.KICH_CO
      FROM SAN_PHAM_CHI_TIET spct
      LEFT JOIN MAU_SAC ms ON spct.MAU_SAC_ID = ms.MAU_SAC_ID
      LEFT JOIN KICH_CO kc ON spct.ID_KICH_CO = kc.ID_KICH_CO
      WHERE spct.ID_SAN_PHAM = ?  AND spct.TRANGTHAI_SANPHAM_CHITIET = 1
    `,
        [product.ID_SAN_PHAM]
      );

      product.CHI_TIET_SAN_PHAMM = detailResults;
    }
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
  const { id } = req.params;

  try {
    // Query 1: Get main product information
    const [productResults] = await connection.execute(
      `SELECT 
    sp.*, 
    gt.TEN_GIOI_TINH, gt.CREATED_GIOI_TINH, gt.UPDATE_GIOI_TINH, gt.TRANG_THAI_GIOI_TINH,
    dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC, dm.TRANG_THAI_DANHMUC, 
    dm.CREATED_DANH_MUC, dm.UPDATE_DANH_MUC,
    cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU, cl.TRANG_THAI_CHAT_LIEU,
    cl.CREATED_TEN_CHAT_LIEU_, cl.UPDATE_CHAT_LIEU,
    th.TEN_THUONG_HIEU, th.CREATE_THUONG_HIEU, th.UPDATE_THUONG_HIEU, 
    th.TRANG_THAI_THUONG_HIEU,
    GROUP_CONCAT(DISTINCT pc.TEN_PHONG_CACH) as PHONG_CACH,
    GROUP_CONCAT(DISTINCT mdsd.TEN_MUC_DICH_SU_DUNG) as MUC_DICH_SU_DUNG
FROM SAN_PHAM sp
LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
LEFT JOIN PHONG_CACH_SAN_PHAM pcsp ON sp.ID_SAN_PHAM = pcsp.ID_SAN_PHAM
LEFT JOIN PHONG_CACH pc ON pcsp.ID_PHUONG_CACH = pc.ID_PHUONG_CACH
LEFT JOIN MUC_DICH_SU_DUNG_SAN_PHAM mdsdsp ON sp.ID_SAN_PHAM = mdsdsp.ID_SAN_PHAM
LEFT JOIN MUC_DICH_SU_DUNG mdsd ON mdsdsp.ID_MUC_DICH_SU_DUNG = mdsd.ID_MUC_DICH_SU_DUNG
WHERE sp.TRANG_THAI_SANPHAM = 1 AND sp.ID_SAN_PHAM = ?
GROUP BY sp.ID_SAN_PHAM, gt.TEN_GIOI_TINH, gt.CREATED_GIOI_TINH, gt.UPDATE_GIOI_TINH, gt.TRANG_THAI_GIOI_TINH,
         dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC, dm.TRANG_THAI_DANHMUC, dm.CREATED_DANH_MUC, dm.UPDATE_DANH_MUC,
         cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU, cl.TRANG_THAI_CHAT_LIEU, cl.CREATED_TEN_CHAT_LIEU_, cl.UPDATE_CHAT_LIEU,
         th.TEN_THUONG_HIEU, th.CREATE_THUONG_HIEU, th.UPDATE_THUONG_HIEU, th.TRANG_THAI_THUONG_HIEU;
`,
      [id]
    );

    if (productResults.length === 0) {
      return res.status(404).json({
        EM: "Sản phẩm không tìm thấy",
        EC: 0,
        DT: [],
      });
    }

    // Query 2: Get product details
    const [detailResults] = await connection.execute(
      `SELECT 
        spct.ID_SAN_PHAM_CHI_TIET,
        spct.SOLUONG_SANPHAM_CHITIET,
        ms.MAU_SAC_ID,
        ms.TEN_MAU_SAC,
        ms.MA_MAU,
        kc.ID_KICH_CO,
        kc.KICH_CO
      FROM SAN_PHAM_CHI_TIET spct
      LEFT JOIN MAU_SAC ms ON spct.MAU_SAC_ID = ms.MAU_SAC_ID
      LEFT JOIN KICH_CO kc ON spct.ID_KICH_CO = kc.ID_KICH_CO
      WHERE spct.ID_SAN_PHAM = ?  AND spct.TRANGTHAI_SANPHAM_CHITIET = 1`,
      [id]
    );

    // Combine results
    const finalResult = {
      ...productResults[0],
      CHI_TIET_SAN_PHAM: detailResults,
    };

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: finalResult,
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
    sp.ID_SAN_PHAM, 
    sp.ID_THUONG_HIEU, 
    sp.ID_DANH_MUC, 
    sp.GIOI_TINH_ID, 
    sp.CHAT_LIEU_ID_,
    sp.TEN_SAN_PHAM, 
    sp.GIA, 
    sp.MO_TA_SAN_PHAM, 
    sp.HINH_ANH_SANPHAM, 
    sp.TRANG_THAI_SANPHAM, 
    sp.NGAY_TAO_SANPHAM, 
    sp.NGAY_CAP_NHAT_SANPHAM, 
    sp.SO_LUONG_SANPHAM,
    gt.TEN_GIOI_TINH,
    dm.TEN_DANH_MUC, 
    dm.MO_TA_LOAI_DANH_MUC,
    cl.TEN_CHAT_LIEU_, 
    cl.MO_TA_CHAT_LIEU,
    th.TEN_THUONG_HIEU,
    GROUP_CONCAT(DISTINCT CONCAT(ms.TEN_MAU_SAC, ' - ', kc.KICH_CO) ORDER BY ms.TEN_MAU_SAC SEPARATOR ', ') AS CHI_TIET_SAN_PHAM

FROM SAN_PHAM sp
LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
LEFT JOIN SAN_PHAM_CHI_TIET spct ON sp.ID_SAN_PHAM = spct.ID_SAN_PHAM
LEFT JOIN MAU_SAC ms ON spct.MAU_SAC_ID = ms.MAU_SAC_ID
LEFT JOIN KICH_CO kc ON spct.ID_KICH_CO = kc.ID_KICH_CO

WHERE sp.TRANG_THAI_SANPHAM = 1

GROUP BY sp.ID_SAN_PHAM;

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
//Search theo sản phẩm
const getSAN_PHAM_Search = async (req, res) => {
  const { query } = req.query; // Nhận từ khóa tìm kiếm từ frontend

  if (!query) {
    return res.status(400).json({
      EM: "Vui lòng cung cấp từ khóa tìm kiếm",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Truy vấn cơ sở dữ liệu với từ khóa tìm kiếm và giới hạn chỉ lấy 5 sản phẩm
    const [results] = await connection.execute(
      `
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
      AND sp.TEN_SAN_PHAM LIKE ?  -- Tìm kiếm theo tên sản phẩm
      LIMIT 5  -- Giới hạn kết quả trả về chỉ 5 sản phẩm
    `,
      [`%${query}%`]
    );

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

const getSAN_PHAM_Use_Nam = async (req, res) => {
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
      AND gt.TEN_GIOI_TINH = 'Nam'  -- Điều kiện phân loại theo giới tính là "Nữ"
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
LEFT JOIN SAN_PHAM_CHI_TIET spct ON sp.ID_SAN_PHAM = spct.ID_SAN_PHAM
LEFT JOIN CHI_TIET_HOA_DON cthd ON spct.ID_SAN_PHAM_CHI_TIET = cthd.ID_SAN_PHAM_CHI_TIET
LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
WHERE sp.TRANG_THAI_SANPHAM = 1
GROUP BY sp.ID_SAN_PHAM
ORDER BY total_sold DESC
LIMIT 5;

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
    // Query 1: Get main product information
    const [results] = await connection.execute(
      `
      SELECT 
        yt.ID_SAN_PHAM, yt.NGAY_YEU_THICH,
        sp.TEN_SAN_PHAM, sp.GIA, sp.HINH_ANH_SANPHAM, sp.MO_TA_SAN_PHAM, sp.TRANG_THAI_SANPHAM, sp.SO_LUONG_SANPHAM,
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM,
        gt.TEN_GIOI_TINH,
        dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC,
        cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU,
        th.TEN_THUONG_HIEU,
        pc.ID_PHUONG_CACH, pc.TEN_PHONG_CACH, pc.CREATED_PHONG_CACH, pc.UPDATE_PHONG_CACH, pc.TRANG_THAI_PHONG_CACH,
        mdsd.ID_MUC_DICH_SU_DUNG, mdsd.TEN_MUC_DICH_SU_DUNG, mdsd.CREATE_MUC_DICH_SU_DUNG, mdsd.UPDATE_MUC_DICH_SU_DUNG, mdsd.TRANG_THAI_MUC_DICH_SU_DUNG,
        GROUP_CONCAT(DISTINCT CONCAT(ms.TEN_MAU_SAC, ' - ', kc.KICH_CO) ORDER BY ms.TEN_MAU_SAC SEPARATOR ', ') AS CHI_TIET_SAN_PHAM
      FROM YEU_THICH yt
      JOIN SAN_PHAM sp ON yt.ID_SAN_PHAM = sp.ID_SAN_PHAM
      LEFT JOIN GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
      LEFT JOIN LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
      LEFT JOIN CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
      LEFT JOIN THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU
      LEFT JOIN PHONG_CACH_SAN_PHAM pcs ON sp.ID_SAN_PHAM = pcs.ID_SAN_PHAM
      LEFT JOIN PHONG_CACH pc ON pcs.ID_PHUONG_CACH = pc.ID_PHUONG_CACH
      LEFT JOIN MUC_DICH_SU_DUNG_SAN_PHAM mdsds ON sp.ID_SAN_PHAM = mdsds.ID_SAN_PHAM
      LEFT JOIN MUC_DICH_SU_DUNG mdsd ON mdsds.ID_MUC_DICH_SU_DUNG = mdsd.ID_MUC_DICH_SU_DUNG
      LEFT JOIN SAN_PHAM_CHI_TIET spct ON sp.ID_SAN_PHAM = spct.ID_SAN_PHAM
      LEFT JOIN MAU_SAC ms ON spct.MAU_SAC_ID = ms.MAU_SAC_ID
      LEFT JOIN KICH_CO kc ON spct.ID_KICH_CO = kc.ID_KICH_CO
      WHERE yt.ID_NGUOI_DUNG = ? AND sp.TRANG_THAI_SANPHAM = 1
      GROUP BY yt.ID_SAN_PHAM, yt.NGAY_YEU_THICH, sp.TEN_SAN_PHAM, sp.GIA, sp.HINH_ANH_SANPHAM, sp.MO_TA_SAN_PHAM, sp.TRANG_THAI_SANPHAM, sp.SO_LUONG_SANPHAM,
        sp.NGAY_TAO_SANPHAM, sp.NGAY_CAP_NHAT_SANPHAM, gt.TEN_GIOI_TINH, dm.TEN_DANH_MUC, dm.MO_TA_LOAI_DANH_MUC, cl.TEN_CHAT_LIEU_, cl.MO_TA_CHAT_LIEU,
        th.TEN_THUONG_HIEU, pc.ID_PHUONG_CACH, pc.TEN_PHONG_CACH, pc.CREATED_PHONG_CACH, pc.UPDATE_PHONG_CACH, pc.TRANG_THAI_PHONG_CACH,
        mdsd.ID_MUC_DICH_SU_DUNG, mdsd.TEN_MUC_DICH_SU_DUNG, mdsd.CREATE_MUC_DICH_SU_DUNG, mdsd.UPDATE_MUC_DICH_SU_DUNG, mdsd.TRANG_THAI_MUC_DICH_SU_DUNG
      ORDER BY yt.NGAY_YEU_THICH DESC
    `,
      [userId]
    );

    if (results.length === 0) {
      return res.status(200).json({
        EM: "Không có sản phẩm yêu thích cho người dùng hoặc sản phẩm không tồn tại",
        EC: 0,
        DT: [],
      });
    }

    // Query 2: Get product details
    const productIds = results.map((product) => product.ID_SAN_PHAM);
    const [detailResults] = await connection.execute(`
      SELECT 
        spct.ID_SAN_PHAM,
        spct.ID_SAN_PHAM_CHI_TIET,
        ms.MAU_SAC_ID,
        ms.TEN_MAU_SAC,
        ms.MA_MAU,
        kc.ID_KICH_CO,
        kc.KICH_CO
      FROM SAN_PHAM_CHI_TIET spct
      LEFT JOIN MAU_SAC ms ON spct.MAU_SAC_ID = ms.MAU_SAC_ID
      LEFT JOIN KICH_CO kc ON spct.ID_KICH_CO = kc.ID_KICH_CO
      WHERE  spct.TRANGTHAI_SANPHAM_CHITIET = 1 AND spct.ID_SAN_PHAM IN (${productIds.join(
        ","
      )})
    `);

    // Combine results
    const finalResults = results.map((product) => ({
      ...product,
      CHI_TIET_SAN_PHAMM: detailResults.filter(
        (detail) => detail.ID_SAN_PHAM === product.ID_SAN_PHAM
      ),
    }));

    return res.status(200).json({
      EM: "Lấy thông tin sản phẩm yêu thích thành công",
      EC: 1,
      DT: finalResults,
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
      phongCachId,
      mauSacId, // Đổi tên từ mauSacIds sang mauSacId
      kichCoId, // Đổi tên từ kichCoIds sang kichCoId
      mucDichSuDungId,
    } = req.body;

    const ngayTaoSanPham = new Date();
    const images = req.file ? path.basename(req.file.path) : null;

    // Logging to debug the incoming data
    // Kiểm tra xem sản phẩm đã tồn tại hay chưa
    const [existingProduct] = await connection.execute(
      "SELECT ID_SAN_PHAM FROM SAN_PHAM WHERE TEN_SAN_PHAM = ?",
      [tenSanPham]
    );

    if (existingProduct.length > 0) {
      return res.status(400).json({
        EM: "Sản phẩm đã tồn tại.",
        EC: 0,
        DT: [],
      });
    }

    // Chuyển chuỗi mauSacId và kichCoId thành mảng số
    const parsedMauSacIds =
      typeof mauSacId === "string" && mauSacId.trim() !== ""
        ? mauSacId.split(",").map(Number)
        : [];
    const parsedKichCoIds =
      typeof kichCoId === "string" && kichCoId.trim() !== ""
        ? kichCoId.split(",").map(Number)
        : [];

    // Kiểm tra nếu mảng rỗng hoặc không hợp lệ
    if (!Array.isArray(parsedMauSacIds) || !Array.isArray(parsedKichCoIds)) {
      return res.status(400).json({
        EM: "Dữ liệu không hợp lệ: mauSacId hoặc kichCoId không phải là mảng.",
        EC: 0,
        DT: [],
      });
    }

    const validMauSacIds = parsedMauSacIds.filter((id) => Number.isInteger(id));
    const validKichCoIds = parsedKichCoIds.filter((id) => Number.isInteger(id));

    if (validMauSacIds.length === 0 || validKichCoIds.length === 0) {
      return res.status(400).json({
        EM: "Dữ liệu không hợp lệ: Mảng mauSacId hoặc kichCoId rỗng hoặc không có giá trị hợp lệ.",
        EC: 0,
        DT: [],
      });
    }

    // Insert product into SAN_PHAM table
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

    // Insert phong cách into PHONG_CACH_SAN_PHAM table
    if (phongCachId) {
      await connection.execute(
        "INSERT INTO PHONG_CACH_SAN_PHAM (ID_SAN_PHAM, ID_PHUONG_CACH) VALUES (?, ?)",
        [newProductId, phongCachId]
      );
    }

    // Insert muc dich su dung into MUC_DICH_SU_DUNG_SAN_PHAM table
    if (mucDichSuDungId) {
      await connection.execute(
        "INSERT INTO MUC_DICH_SU_DUNG_SAN_PHAM (ID_SAN_PHAM, ID_MUC_DICH_SU_DUNG) VALUES (?, ?)",
        [newProductId, mucDichSuDungId]
      );
    }

    // Insert product details into SAN_PHAM_CHI_TIET table
    for (const mauSacId of validMauSacIds) {
      for (const kichCoId of validKichCoIds) {
        await connection.execute(
          "INSERT INTO SAN_PHAM_CHI_TIET (ID_SAN_PHAM, MAU_SAC_ID, ID_KICH_CO) VALUES (?, ?, ?)",
          [newProductId, mauSacId, kichCoId]
        );
      }
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
    const images = req.file ? path.basename(req.file.path) : req.body.images;

    // Kiểm tra sản phẩm có tồn tại hay không
    const [results] = await connection.execute(
      "SELECT * FROM SAN_PHAM WHERE ID_SAN_PHAM = ?",
      [id]
    );

    if (results.length > 0) {
      // Xây dựng câu lệnh SQL động
      const updates = [];
      const values = [];

      if (idThuongHieu) {
        updates.push("ID_THUONG_HIEU = ?");
        values.push(idThuongHieu);
      }
      if (idDanhMuc) {
        updates.push("ID_DANH_MUC = ?");
        values.push(idDanhMuc);
      }
      if (gioiTinhId) {
        updates.push("GIOI_TINH_ID = ?");
        values.push(gioiTinhId);
      }
      if (chatLieuId) {
        updates.push("CHAT_LIEU_ID_ = ?");
        values.push(chatLieuId);
      }
      if (tenSanPham) {
        updates.push("TEN_SAN_PHAM = ?");
        values.push(tenSanPham);
      }
      if (gia) {
        updates.push("GIA = ?");
        values.push(gia);
      }
      if (moTaSanPham) {
        updates.push("MO_TA_SAN_PHAM = ?");
        values.push(moTaSanPham);
      }
      if (images) {
        updates.push("HINH_ANH_SANPHAM = ?");
        values.push(images);
      }
      if (trangThaiSanPham) {
        updates.push("TRANG_THAI_SANPHAM = ?");
        values.push(trangThaiSanPham);
      }
      if (soLuongSanPham) {
        updates.push("SO_LUONG_SANPHAM = ?");
        values.push(soLuongSanPham);
      }

      updates.push("NGAY_CAP_NHAT_SANPHAM = ?");
      values.push(ngayCapNhatSanPham);

      values.push(id);

      const sqlUpdate = `UPDATE SAN_PHAM SET ${updates.join(
        ", "
      )} WHERE ID_SAN_PHAM = ?`;

      await connection.execute(sqlUpdate, values);

      // Xử lý các bảng liên kết nếu `option` là true
      if (option) {
        if (phongCachId) {
          await connection.execute(
            "REPLACE INTO PHONG_CACH_SAN_PHAM (ID_SAN_PHAM, ID_PHUONG_CACH) VALUES (?, ?)",
            [id, phongCachId]
          );
        }

        if (mucDichSuDungId) {
          await connection.execute(
            "REPLACE INTO MUC_DICH_SU_DUNG_SAN_PHAM (ID_SAN_PHAM, ID_MUC_DICH_SU_DUNG) VALUES (?, ?)",
            [id, mucDichSuDungId]
          );
        }

        // ----------------------------
        if (mauSacId && kichCoId) {
          const mauSacIds = mauSacId.split(",");
          const kichCoIds = kichCoId.split(",");

          // Lấy tất cả ID_SAN_PHAM trong SAN_PHAM_CHI_TIET để kiểm tra các bản ghi đã tồn tại
          const [existingRecords] = await connection.execute(
            "SELECT ID_SAN_PHAM, MAU_SAC_ID, ID_KICH_CO FROM SAN_PHAM_CHI_TIET WHERE ID_SAN_PHAM = ?",
            [id]
          );

          const existingMap = new Map();
          existingRecords.forEach((record) => {
            existingMap.set(
              `${record.MAU_SAC_ID}-${record.ID_KICH_CO}`,
              record
            );
          });

          // Kiểm tra các dữ liệu từ frontend và cập nhật hoặc thêm mới
          for (let i = 0; i < mauSacIds.length; i++) {
            const key = `${mauSacIds[i]}-${kichCoIds[i]}`;

            if (existingMap.has(key)) {
              // Nếu bản ghi đã tồn tại, cập nhật trạng thái nếu cần thiết
              await connection.execute(
                "UPDATE SAN_PHAM_CHI_TIET SET TRANGTHAI_SANPHAM_CHITIET = 1 WHERE ID_SAN_PHAM = ? AND MAU_SAC_ID = ? AND ID_KICH_CO = ?",
                [id, mauSacIds[i], kichCoIds[i]]
              );
              // Xóa khỏi danh sách để tránh cập nhật sau này
              existingMap.delete(key);
            } else {
              // Nếu bản ghi chưa tồn tại, thêm mới vào bảng
              await connection.execute(
                "INSERT INTO SAN_PHAM_CHI_TIET (ID_SAN_PHAM, MAU_SAC_ID, ID_KICH_CO, TRANGTHAI_SANPHAM_CHITIET) VALUES (?, ?, ?, 1)",
                [id, mauSacIds[i], kichCoIds[i]]
              );
            }
          }

          // Cập nhật trạng thái 0 cho các bản ghi không có trong frontend (các bản ghi còn lại trong existingMap)
          for (let [key, record] of existingMap) {
            await connection.execute(
              "UPDATE SAN_PHAM_CHI_TIET SET TRANGTHAI_SANPHAM_CHITIET = 0 WHERE ID_SAN_PHAM = ? AND MAU_SAC_ID = ? AND ID_KICH_CO = ?",
              [id, record.MAU_SAC_ID, record.ID_KICH_CO]
            );
          }
        }
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

const getSAN_PHAM_ChiTiet_ById = async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await connection.execute(
      `SELECT spct.ID_SAN_PHAM_CHI_TIET, spct.ID_SAN_PHAM, spct.MAU_SAC_ID, spct.ID_KICH_CO, 
        spct.SOLUONG_SANPHAM_CHITIET,      ms.TEN_MAU_SAC, kc.KICH_CO
       FROM SAN_PHAM_CHI_TIET spct
       JOIN MAU_SAC ms ON spct.MAU_SAC_ID = ms.MAU_SAC_ID
       JOIN KICH_CO kc ON spct.ID_KICH_CO = kc.ID_KICH_CO
       WHERE spct.ID_SAN_PHAM = ? AND spct.TRANGTHAI_SANPHAM_CHITIET = 1`,
      [id]
    );

    return res.status(200).json({
      EM: "Lấy chi tiết sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting chi tiet san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy chi tiết sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

const updateSAN_PHAM_ChiTiet_ById = async (req, res) => {
  const { id } = req.params; // ID của sản phẩm cha
  const { existingDetails, newDetails } = req.body; // Mảng chi tiết sản phẩm gửi từ client

  try {
    // Lặp qua từng chi tiết sản phẩm cũ để cập nhật
    for (let detail of existingDetails) {
      const {
        idSanPhamChiTiet, // Có thể là null nếu là sản phẩm mới
        mauSacId,
        kichCoId,
        soLuongSanPhamChiTiet,
      } = detail;

      // Lấy MAU_SAC_ID từ TEN_MAU_SAC
      const [mauSacResult] = await connection.execute(
        `SELECT MAU_SAC_ID FROM MAU_SAC WHERE TEN_MAU_SAC = ? AND TRANG_THAI_MAU_SAC = 1`,
        [mauSacId] // Tên màu
      );

      // Lấy ID_KICH_CO từ KICH_CO
      const [kichCoResult] = await connection.execute(
        `SELECT ID_KICH_CO FROM KICH_CO WHERE KICH_CO = ? AND TRANG_THAI_KICH_CO = 1`,
        [kichCoId] // Tên kích cỡ
      );

      // Kiểm tra nếu không tìm thấy MAU_SAC_ID hoặc ID_KICH_CO
      if (!mauSacResult[0] || !kichCoResult[0]) {
        return res.status(404).json({
          EM: "Không tìm thấy MAU_SAC_ID hoặc ID_KICH_CO hợp lệ",
          EC: 0,
          DT: [],
        });
      }

      const finalMauSacId = mauSacResult[0].MAU_SAC_ID;
      const finalKichCoId = kichCoResult[0].ID_KICH_CO;

      // Kiểm tra nếu finalMauSacId và finalKichCoId không phải undefined
      if (finalMauSacId === undefined || finalKichCoId === undefined) {
        return res.status(400).json({
          EM: "Lỗi: Không tìm thấy thông tin màu sắc hoặc kích cỡ cũ",
          EC: 0,
          DT: [],
        });
      }

      // Kiểm tra nếu đã tồn tại chi tiết sản phẩm với ID_SAN_PHAM, MAU_SAC_ID và ID_KICH_CO
      const [existingDetail] = await connection.execute(
        `SELECT * FROM SAN_PHAM_CHI_TIET 
         WHERE ID_SAN_PHAM = ? AND MAU_SAC_ID = ? AND ID_KICH_CO = ?`,
        [id, finalMauSacId, finalKichCoId]
      );

      if (existingDetail.length > 0) {
        // Nếu đã tồn tại, thực hiện cập nhật số lượng
        const soLuong = parseInt(soLuongSanPhamChiTiet, 10);
        await connection.execute(
          `UPDATE SAN_PHAM_CHI_TIET 
           SET SOLUONG_SANPHAM_CHITIET = ?
           WHERE ID_SAN_PHAM = ? AND MAU_SAC_ID = ? AND ID_KICH_CO = ?`,
          [soLuong, id, finalMauSacId, finalKichCoId]
        );
      } else {
        // Nếu không tồn tại, thêm mới chi tiết sản phẩm
        const soLuong = parseInt(soLuongSanPhamChiTiet, 10);
        await connection.execute(
          `INSERT INTO SAN_PHAM_CHI_TIET 
           (ID_SAN_PHAM, MAU_SAC_ID, ID_KICH_CO, SOLUONG_SANPHAM_CHITIET, TRANGTHAI_SANPHAM_CHITIET)
           VALUES (?, ?, ?, ?, 1)`,
          [id, finalMauSacId, finalKichCoId, soLuong]
        );
      }
    }

    // Lặp qua các chi tiết sản phẩm mới để thêm vào cơ sở dữ liệu
    for (let newDetail of newDetails) {
      const { mauSacId, kichCoId, soLuongSanPhamChiTiet } = newDetail;

      // Lấy MAU_SAC_ID từ TEN_MAU_SAC
      const [mauSacResult] = await connection.execute(
        `SELECT MAU_SAC_ID FROM MAU_SAC WHERE TEN_MAU_SAC = ? AND TRANG_THAI_MAU_SAC = 1`,
        [mauSacId] // Tên màu
      );

      // Lấy ID_KICH_CO từ KICH_CO
      const [kichCoResult] = await connection.execute(
        `SELECT ID_KICH_CO FROM KICH_CO WHERE KICH_CO = ? AND TRANG_THAI_KICH_CO = 1`,
        [kichCoId] // Tên kích cỡ
      );

      // Kiểm tra nếu không tìm thấy MAU_SAC_ID hoặc ID_KICH_CO
      if (!mauSacResult || !kichCoResult) {
        return res.status(404).json({
          EM: "Không tìm thấy MAU_SAC_ID hoặc ID_KICH_CO hợp lệ",
          EC: 0,
          DT: [],
        });
      }

      const finalMauSacId = mauSacResult[0].MAU_SAC_ID;
      const finalKichCoId = kichCoResult[0].ID_KICH_CO;

      // Kiểm tra nếu finalMauSacId và finalKichCoId không phải undefined
      if (finalMauSacId === undefined || finalKichCoId === undefined) {
        return res.status(400).json({
          EM: "Lỗi: Không tìm thấy thông tin màu sắc hoặc kích cỡ mới",
          EC: 0,
          DT: [],
        });
      }

      // Kiểm tra nếu đã tồn tại chi tiết sản phẩm với ID_SAN_PHAM, MAU_SAC_ID và ID_KICH_CO
      const [existingDetail] = await connection.execute(
        `SELECT * FROM SAN_PHAM_CHI_TIET 
         WHERE ID_SAN_PHAM = ? AND MAU_SAC_ID = ? AND ID_KICH_CO = ?`,
        [id, finalMauSacId, finalKichCoId]
      );

      if (existingDetail.length > 0) {
        // Nếu đã tồn tại, cập nhật số lượng sản phẩm
        const soLuong = parseInt(soLuongSanPhamChiTiet, 10);
        await connection.execute(
          `UPDATE SAN_PHAM_CHI_TIET 
           SET SOLUONG_SANPHAM_CHITIET = ?
           WHERE ID_SAN_PHAM = ? AND MAU_SAC_ID = ? AND ID_KICH_CO = ?`,
          [soLuong, id, finalMauSacId, finalKichCoId]
        );
      } else {
        // Nếu không tồn tại, thêm mới chi tiết sản phẩm
        const soLuong = parseInt(soLuongSanPhamChiTiet, 10);
        await connection.execute(
          `INSERT INTO SAN_PHAM_CHI_TIET 
           (ID_SAN_PHAM, MAU_SAC_ID, ID_KICH_CO, SOLUONG_SANPHAM_CHITIET, TRANGTHAI_SANPHAM_CHITIET)
           VALUES (?, ?, ?, ?, 1)`,
          [id, finalMauSacId, finalKichCoId, soLuong]
        );
      }
    }

    return res.status(200).json({
      EM: "Cập nhật và thêm chi tiết sản phẩm thành công",
      EC: 1,
      DT: [],
    });
  } catch (error) {
    console.error("Error updating/inserting chi tiet san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật hoặc thêm chi tiết sản phẩm",
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
  getSAN_PHAM_Use_Nam,
  getSAN_PHAM_Search,

  getSAN_PHAM_ChiTiet_ById,
  updateSAN_PHAM_ChiTiet_ById,
};
