import React from "react";
import { Box } from "@mui/material";
import FilterShoes from "../../admin-view/pages/quanLySanPham/component/FilterShoe";

const WishlistFilters = ({
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

  setSelectPhongCach,
  setSelectMucDichSuDung,
  setSelectKichCo,

  phongCach,
  mauSac,
  mucDichSuDung,
  kichCo,
  currentTheme,
}) => (
  <Box
    sx={{
      backgroundColor: currentTheme.backgroundColor,
      p: 2,
      borderRadius: 2,
      color: "white",
    }}
  >
    <FilterShoes
      thuongHieu={thuongHieu}
      chatLieu={chatLieu}
      selectedThuongHieu={selectedThuongHieu}
      selectedChatLieu={selectedChatLieu}
      selectedTrangThai={selectedTrangThai}
      selectedMauSac={selectedMauSac}
      selectKichCo={selectKichCo}
      selectPhongCach={selectPhongCach}
      selectMucDichSuDung={selectMucDichSuDung}
      setSelectedTrangThai={setSelectedTrangThai}
      setSelectedChatLieu={setSelectedChatLieu}
      setSelectedThuongHieu={setSelectedThuongHieu}
      setSelectedMauSac={setSelectedMauSac}
      setSelectPhongCach={setSelectPhongCach}
      setSelectMucDichSuDung={setSelectMucDichSuDung}
      setSelectKichCo={setSelectKichCo}
      searchTerm={searchTerm}
      handleSearchChange={handleSearchChange}
      phongCach={phongCach}
      mauSac={mauSac}
      mucDichSuDung={mucDichSuDung}
      kichCo={kichCo}
      offStatus={true}
    />
  </Box>
);

export default WishlistFilters;
