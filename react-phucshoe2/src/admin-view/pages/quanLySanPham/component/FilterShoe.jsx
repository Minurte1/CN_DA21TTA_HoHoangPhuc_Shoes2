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
} from "@mui/icons-material";

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
}) => {
  return (
    <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
      {/* Thương hiệu */}
      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel
          sx={{ display: "flex", alignItems: "center", color: "#c9d1d9" }}
        >
          <Apartment sx={{ mr: 1 }} /> Thương hiệu
        </InputLabel>
        <Select
          value={selectedThuongHieu}
          label="Apart Thương hiệu"
          onChange={(e) => setSelectedThuongHieu(e.target.value)}
          sx={{ color: "#c9d1d9" }}
        >
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
      <FormControl sx={{ mb: 2, minWidth: 200, ml: 2 }}>
        <InputLabel
          sx={{ display: "flex", alignItems: "center", color: "#c9d1d9" }}
        >
          <FormatListBulleted sx={{ mr: 1 }} /> Chất liệu
        </InputLabel>
        <Select
          value={selectedChatLieu}
          onChange={(e) => setSelectedChatLieu(e.target.value)}
          sx={{ color: "#c9d1d9" }}
          label="Icon Chất liệu"
        >
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
      <FormControl sx={{ mb: 2, minWidth: 200, ml: 2 }}>
        <InputLabel
          sx={{ display: "flex", alignItems: "center", color: "#c9d1d9" }}
        >
          <ToggleOn sx={{ mr: 1 }} /> Trạng thái
        </InputLabel>
        <Select
          value={selectedTrangThai}
          label="Icon Trạng thái"
          onChange={(e) => setSelectedTrangThai(e.target.value)}
          sx={{ color: "#c9d1d9" }}
        >
          <MenuItem value={1}>Đang hoạt động</MenuItem>
          <MenuItem value={0}>Ngưng hoạt động</MenuItem>
        </Select>
      </FormControl>

      {/* Tìm kiếm tên sản phẩm */}
      <FormControl sx={{ mb: 2, minWidth: 200, ml: 2 }}>
        <TextField
          value={searchTerm}
          label="Tìm kiếm tên sản phẩm"
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#c9d1d9" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            color: "#c9d1d9", // Text color for input value
            width: "100%",
            "& .MuiInputBase-input": {
              color: "#c9d1d9",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#c9d1d9", // Placeholder color
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: "#c9d1d9", // Border color when not focused
            },
            "& .Mui-focused .MuiInputLabel-root": {
              color: "#c9d1d9", // Focused label color
            },
            "& .MuiInputLabel-root": {
              color: "#c9d1d9", // Default label color
            },
          }}
        />
      </FormControl>
    </Box>
  );
};

export default FilterShoes;
