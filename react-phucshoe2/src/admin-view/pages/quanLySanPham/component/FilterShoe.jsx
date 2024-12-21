import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  Apartment,
  FormatListBulleted,
  ToggleOn,
  ColorLens,
  AdsClick,
  FormatSize,
  BorderStyle,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import translations from "../../../../redux/data/translations";
import { getThemeConfig } from "../../../../services/themeService";

const FilterShoes = ({
  thuongHieu,
  chatLieu,
  selectedThuongHieu,
  selectedChatLieu,
  selectedTrangThai,
  searchTerm,

  handleSearchChange,
  setSelectedTrangThai,
  setSelectedChatLieu,
  setSelectedThuongHieu,
  setSelectedMauSac,

  selectKichCo,
  selectPhongCach,
  selectMucDichSuDung,
  selectedMauSac,

  //
  setSelectPhongCach,
  setSelectMucDichSuDung,
  setSelectKichCo,
  //
  phongCach,
  mauSac,
  mucDichSuDung,
  kichCo,

  //
  offStatus,
}) => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language].products;
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  return (
    <>
      {" "}
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        {/* Tìm kiếm tên sản phẩm */}
        <FormControl sx={{ mb: 2, width: 250, ml: 2 }}>
          <TextField
            value={searchTerm}
            label={t.SearchProduct ? t.SearchProduct : "Tìm kiếm sản phẩm"}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: currentTheme.color }} />
                </InputAdornment>
              ),
            }}
            sx={{
              color: currentTheme.color, // Text color for input value
              width: "100%",
              "& .MuiInputBase-input": {
                color: currentTheme.color,
              },
              "& .MuiInputBase-input::placeholder": {
                color: currentTheme.color, // Placeholder color
              },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: currentTheme.color, // Border color when not focused
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: currentTheme.color, // Focused label color
              },
              "& .MuiInputLabel-root": {
                color: currentTheme.color, // Default label color
              },
            }}
          />
        </FormControl>
        {/* Thương hiệu */}
        <FormControl sx={{ mb: 2, width: 250, ml: 2 }}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              color: currentTheme.color,
            }}
          >
            <Apartment sx={{ mr: 1 }} /> {t.brands ? t.brands : "Thương hiệu"}
          </InputLabel>
          <Select
            value={selectedThuongHieu}
            label="Apart Thương hiệu"
            onChange={(e) => setSelectedThuongHieu(e.target.value)}
            sx={{ color: currentTheme.color }}
          >
            {" "}
            <MenuItem value="">{t.SeeAll ? t.SeeAll : "Xem tất cả"}</MenuItem>
            {thuongHieu.map((thuongHieuItem) => (
              <MenuItem
                key={thuongHieuItem.ID_THUONG_HIEU}
                value={thuongHieuItem.ID_THUONG_HIEU}
              >
                {thuongHieuItem.TEN_THUONG_HIEU}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Chất liệu */}
        <FormControl sx={{ mb: 2, width: 250, ml: 2 }}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              color: currentTheme.color,
            }}
          >
            <FormatListBulleted sx={{ mr: 1 }} />{" "}
            {t.material ? t.material : "Chất liệu"}
          </InputLabel>
          <Select
            value={selectedChatLieu}
            onChange={(e) => setSelectedChatLieu(e.target.value)}
            sx={{ color: currentTheme.color }}
            label="Icon Chất liệu"
          >
            {" "}
            <MenuItem value="">{t.SeeAll ? t.SeeAll : "Xem tất cả"}</MenuItem>
            {chatLieu.map((chatLieuItem) => (
              <MenuItem
                key={chatLieuItem.CHAT_LIEU_ID_}
                value={chatLieuItem.CHAT_LIEU_ID_}
              >
                {chatLieuItem.TEN_CHAT_LIEU_}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Trạng thái */}
        {!offStatus ? (
          <>
            {" "}
            <FormControl sx={{ mb: 2, width: 250, ml: 2 }}>
              <InputLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: currentTheme.color,
                }}
              >
                <ToggleOn sx={{ mr: 1 }} /> Trạng thái
              </InputLabel>
              <Select
                value={selectedTrangThai}
                label="Icon Trạng thái"
                onChange={(e) => setSelectedTrangThai(e.target.value)}
                sx={{ color: currentTheme.color }}
              >
                {" "}
                <MenuItem value="">Xem tất cả</MenuItem>
                <MenuItem value={1}>Đang hoạt động</MenuItem>
                <MenuItem value={0}>Ngưng hoạt động</MenuItem>
              </Select>
            </FormControl>{" "}
          </>
        ) : (
          <></>
        )}
      </Box>{" "}
      <Box sx={{ width: "100%", textAlign: "left" }}>
        {/* Thương hiệu */}
        <FormControl sx={{ mb: 2, width: 250, ml: 2 }}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              color: currentTheme.color,
            }}
          >
            <ColorLens sx={{ mr: 1 }} /> {t.Color ? t.Color : "Màu sắc"}
          </InputLabel>
          <Select
            value={selectedMauSac}
            label="Apart Màu Sắc"
            onChange={(e) => setSelectedMauSac(e.target.value)}
            sx={{ color: currentTheme.color }}
          >
            {" "}
            <MenuItem value="">{t.SeeAll ? t.SeeAll : "Xem tất cả"}</MenuItem>
            {mauSac.map((item) => (
              <MenuItem key={item.MAU_SAC_ID} value={item.TEN_MAU_SAC}>
                {item.TEN_MAU_SAC}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Chất liệu */}
        <FormControl sx={{ mb: 2, width: 250, ml: 2 }}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              color: currentTheme.color,
            }}
          >
            <AdsClick sx={{ mr: 1 }} /> {t.purpose ? t.purpose : "Mục đích"}
          </InputLabel>
          <Select
            value={selectMucDichSuDung}
            onChange={(e) => setSelectMucDichSuDung(e.target.value)}
            sx={{ color: currentTheme.color }}
            label="Icon Mục đích"
          >
            {" "}
            <MenuItem value="">{t.SeeAll ? t.SeeAll : "Xem tất cả"}</MenuItem>
            {mucDichSuDung.map((item) => (
              <MenuItem
                key={item.ID_MUC_DICH_SU_DUNG}
                value={item.ID_MUC_DICH_SU_DUNG}
              >
                {item.TEN_MUC_DICH_SU_DUNG}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Trạng thái */}
        <FormControl sx={{ mb: 2, width: 250, ml: 2 }}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              color: currentTheme.color,
            }}
          >
            <FormatSize sx={{ mr: 1 }} /> {t.Size ? t.Size : "Kích cỡ"}
          </InputLabel>
          <Select
            value={selectKichCo}
            label="Icon  Kích cỡ"
            onChange={(e) => setSelectKichCo(e.target.value)}
            sx={{ color: currentTheme.color }}
          >
            <MenuItem value="">{t.SeeAll ? t.SeeAll : "Xem tất cả"}</MenuItem>
            {kichCo.map((item) => (
              <MenuItem key={item.ID_KICH_CO} value={item.KICH_CO}>
                {item.KICH_CO}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Trạng thái */}
        <FormControl sx={{ mb: 2, width: 250, ml: 2 }}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              color: currentTheme.color,
            }}
          >
            <BorderStyle sx={{ mr: 1 }} />
            {t.Style ? t.Style : "Phong cách"}
          </InputLabel>
          <Select
            value={selectPhongCach}
            label="Icon Phong cách"
            onChange={(e) => setSelectPhongCach(e.target.value)}
            sx={{ color: currentTheme.color }}
          >
            {" "}
            <MenuItem value="">{t.SeeAll ? t.SeeAll : "Xem tất cả"}</MenuItem>
            {phongCach.map((item) => (
              <MenuItem key={item.ID_PHUONG_CACH} value={item.ID_PHUONG_CACH}>
                {item.TEN_PHONG_CACH}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default FilterShoes;
