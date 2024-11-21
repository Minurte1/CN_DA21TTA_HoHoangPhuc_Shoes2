const connection = require("../../config/database");
const getChiTietHoaDon = async (req, res) => {
  const { id } = req.params;
  try {
    // Truy vấn bảng DON_HANG
    const [donHangResults] = await connection.execute(
      `SELECT 
          dh.ID_ODER, 
          dh.ID_NGUOI_DUNG, 
          dh.ID_THANH_TOAN, 
          dh.ID_DON_HANG,
          dh.TONG_TIEN, 
          dh.TRANG_THAI_DON_HANG, 
          dh.GHI_CHU_DONHANG, 
          dh.NGAY_CAP_NHAT_DONHANG, 
          dh.NGAY_TAO_DONHANG,
          tt.PHUONG_THUC_THANH_TOAN, 
          nd.EMAIL, 
          nd.VAI_TRO, 
          nd.HO_TEN, 
          nd.SO_DIEN_THOAI, 
          nd.DIA_CHI, 
          nd.TRANG_THAI_USER, 
          nd.NGAY_TAO_USER, 
          nd.NGAY_CAP_NHAT_USER, 
          nd.AVATAR, 
          nd.NGAY_SINH, 
          nd.DIA_CHI_Provinces, 
          nd.DIA_CHI_Districts, 
          nd.DIA_CHI_Wards, 
          nd.THEMES, 
          nd.LANGUAGE
        FROM 
          DON_HANG dh
        LEFT JOIN 
          THANH_TOAN tt ON dh.ID_THANH_TOAN = tt.ID_THANH_TOAN
        LEFT JOIN 
          NGUOI_DUNG nd ON dh.ID_NGUOI_DUNG = nd.ID_NGUOI_DUNG
        WHERE 
          dh.ID_DON_HANG = ?`,
      [id]
    );

    // Truy vấn bảng CHI_TIET_HOA_DON
    const [chiTietHoaDonResults] = await connection.execute(
      `
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
    
    -- Additional fields from PHONG_CACH, MAU_SAC, MUC_DICH_SU_DUNG, and KICH_CO tables
    pc.ID_PHUONG_CACH, 
    pc.TEN_PHONG_CACH, 
    pc.CREATED_PHONG_CACH, 
    pc.UPDATE_PHONG_CACH, 
    pc.TRANG_THAI_PHONG_CACH,
    ms.MAU_SAC_ID, 
    ms.TEN_MAU_SAC, 
    ms.CREATE_MAU_SAC, 
    ms.UPDATE_MAU_SAC, 
    ms.TRANG_THAI_MAU_SAC,
    mdsd.ID_MUC_DICH_SU_DUNG, 
    mdsd.TEN_MUC_DICH_SU_DUNG, 
    mdsd.CREATE_MUC_DICH_SU_DUNG, 
    mdsd.UPDATE_MUC_DICH_SU_DUNG, 
    mdsd.TRANG_THAI_MUC_DICH_SU_DUNG,
    kc.ID_KICH_CO, 
    kc.KICH_CO, 
    kc.TRANG_THAI_KICH_CO, 
    kc.CREATED_KICH_CO, 
    kc.UPDATE_KICH_CO,
    
    -- Fields from CHI_TIET_HOA_DON
    cthd.ID_CHI_TIET_HOA_DON, 
    cthd.SO_LUONG_SP, 
    cthd.GIA_SAN_PHAM_CHI_TIET
    
FROM 
    SAN_PHAM sp
LEFT JOIN 
    GIOI_TINH gt ON sp.GIOI_TINH_ID = gt.GIOI_TINH_ID
LEFT JOIN 
    LOAI_DANH_MUC dm ON sp.ID_DANH_MUC = dm.ID_DANH_MUC
LEFT JOIN 
    CHAT_LIEU cl ON sp.CHAT_LIEU_ID_ = cl.CHAT_LIEU_ID_
LEFT JOIN 
    THUONG_HIEU th ON sp.ID_THUONG_HIEU = th.ID_THUONG_HIEU

-- Joins to retrieve additional details
LEFT JOIN 
    PHONG_CACH_SAN_PHAM pcs ON sp.ID_SAN_PHAM = pcs.ID_SAN_PHAM
LEFT JOIN 
    PHONG_CACH pc ON pcs.ID_PHUONG_CACH = pc.ID_PHUONG_CACH
    
LEFT JOIN 
    MAU_SAC_SAN_PHAM mss ON sp.ID_SAN_PHAM = mss.ID_SAN_PHAM
LEFT JOIN 
    MAU_SAC ms ON mss.MAU_SAC_ID = ms.MAU_SAC_ID

LEFT JOIN 
    MUC_DICH_SU_DUNG_SAN_PHAM mdsds ON sp.ID_SAN_PHAM = mdsds.ID_SAN_PHAM
LEFT JOIN 
    MUC_DICH_SU_DUNG mdsd ON mdsds.ID_MUC_DICH_SU_DUNG = mdsd.ID_MUC_DICH_SU_DUNG

LEFT JOIN 
    CO_KICH_CO ckc ON sp.ID_SAN_PHAM = ckc.ID_SAN_PHAM
LEFT JOIN 
    KICH_CO kc ON ckc.ID_KICH_CO = kc.ID_KICH_CO

-- Adding CHI_TIET_HOA_DON details
LEFT JOIN 
    CHI_TIET_HOA_DON cthd ON cthd.ID_SAN_PHAM = sp.ID_SAN_PHAM

WHERE 
    cthd.ID_DON_HANG = ?;



        `,
      [id]
    );

    // Ghép kết quả lại với nhau
    if (donHangResults.length > 0) {
      const result = {
        ...donHangResults[0], // Thông tin đơn hàng
        chiTietHoaDon: chiTietHoaDonResults, // Thông tin chi tiết hóa đơn
      };

      return res.status(200).json({
        EM: "Lấy chi tiết hóa đơn thành công",
        EC: 1,
        DT: result,
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy đơn hàng này",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error fetching chi tiet hoa don:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy chi tiết hóa đơn",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = { getChiTietHoaDon };
