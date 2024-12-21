import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Divider,
  IconButton,
  Grid,
  Autocomplete,
} from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
const DialogShoes = ({
  openDialog,
  handleCloseDialog,
  currentProduct,
  handleChange,
  handleSave,
  handleFileChange,
  formData,
  //
  thuongHieu,
  danhMuc,
  gioiTinh,
  chatLieu,
  //
  phongCach,
  mauSac,
  mucDichSuDung,
  kichCo,
  option,
  setOption,
}) => {
  console.log("formData", formData);
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth={!option}
    >
      <DialogTitle>
        {currentProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          width: option ? "460px" : "1200px",
          transition: "width 0.4s ease",
        }}
      >
        <Box sx={{ width: "410px" }}>
          {" "}
          <FormControl sx={{ width: "400px" }} margin="dense">
            <InputLabel id="thuong-hieu-label">Thương hiệu</InputLabel>
            <Select
              labelId="thuong-hieu-label"
              id="idThuongHieu"
              name="idThuongHieu"
              label="Thương hiệu"
              value={formData.idThuongHieu}
              onChange={handleChange}
              fullWidth
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
          <FormControl sx={{ width: "400px" }} fullWidth margin="dense">
            <InputLabel id="danh-muc-label">Thể loại</InputLabel>
            <Select
              labelId="danh-muc-label"
              id="idDanhMuc"
              name="idDanhMuc"
              label="Thể loại"
              value={formData.idDanhMuc}
              onChange={handleChange}
              fullWidth
            >
              {danhMuc.map((danhMucItem) => (
                <MenuItem
                  key={danhMucItem.ID_DANH_MUC}
                  value={danhMucItem.ID_DANH_MUC}
                >
                  {danhMucItem.TEN_DANH_MUC}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "400px" }} fullWidth margin="dense">
            <InputLabel id="gioi-tinh-label">Giày dành cho</InputLabel>
            <Select
              labelId="gioi-tinh-label"
              id="gioiTinhId"
              name="gioiTinhId"
              label="Giày dành cho"
              value={formData.gioiTinhId}
              onChange={handleChange}
              fullWidth
            >
              {gioiTinh.map((gioiTinhItem) => (
                <MenuItem
                  key={gioiTinhItem.GIOI_TINH_ID}
                  value={gioiTinhItem.GIOI_TINH_ID}
                >
                  {gioiTinhItem.TEN_GIOI_TINH}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "400px" }} fullWidth margin="dense">
            <InputLabel id="chat-lieu-label">Chất liệu</InputLabel>
            <Select
              labelId="chat-lieu-label"
              id="chatLieuId"
              name="chatLieuId"
              label="Chất liệu"
              value={formData.chatLieuId}
              onChange={handleChange}
              fullWidth
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
          <FormControl sx={{ width: "400px" }}>
            {" "}
            <TextField
              autoFocus
              margin="dense"
              label="Tên sản phẩm"
              type="text"
              fullWidth
              name="tenSanPham"
              value={formData.tenSanPham}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Mô tả"
              type="text"
              fullWidth
              name="moTaSanPham"
              value={formData.moTaSanPham}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Giá tiền"
              type="number"
              fullWidth
              name="gia"
              value={formData.gia}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Số lượng sản phẩm"
              type="number"
              fullWidth
              name="soLuongSanPham"
              value={formData.soLuongSanPham}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ width: "400px" }} fullWidth margin="dense">
            <InputLabel id="trang-thai-label">Trạng thái</InputLabel>
            <Select
              labelId="trang-thai-label"
              label="Trạng thái"
              name="trangThaiSanPham"
              value={formData.trangThaiSanPham}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={1}>Đang sử dụng</MenuItem>
              <MenuItem value={0}>Ngưng sử dụng</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Hình ảnh sản phẩm"
            type="file"
            fullWidth
            name="images"
            sx={{ width: "400px" }}
            InputLabelProps={{ shrink: true }}
            onChange={handleFileChange}
          />
        </Box>

        {!option ? (
          <>
            <Box sx={{ width: "600px", display: "flex" }}>
              <Box sx={{ width: "400px" }}>
                {" "}
                <FormControl sx={{ width: "400px" }} fullWidth margin="dense">
                  <InputLabel id="thuong-hieu-label">Phong Cách</InputLabel>
                  <Select
                    labelId="thuong-hieu-label"
                    id="idThuongHieu"
                    name="phongCachId"
                    label="Phong Cách"
                    value={formData.phongCachId}
                    onChange={handleChange}
                    fullWidth
                  >
                    {phongCach.map((item) => (
                      <MenuItem
                        key={item.ID_PHUONG_CACH}
                        value={item.ID_PHUONG_CACH}
                      >
                        {item.TEN_PHONG_CACH}
                      </MenuItem>
                    ))}
                  </Select>{" "}
                </FormControl>{" "}
                <FormControl sx={{ width: "400px" }} fullWidth margin="dense">
                  <InputLabel id="thuong-hieu-label">
                    Mục đích sử dụng
                  </InputLabel>
                  <Select
                    labelId="thuong-hieu-label"
                    id="idThuongHieu"
                    name="mucDichSuDungId"
                    label="Mục đích sử dụng"
                    value={formData.mucDichSuDungId}
                    onChange={handleChange}
                    fullWidth
                  >
                    {mucDichSuDung.map((item) => (
                      <MenuItem
                        key={item.ID_MUC_DICH_SU_DUNG}
                        value={item.ID_MUC_DICH_SU_DUNG}
                      >
                        {item.TEN_MUC_DICH_SU_DUNG}
                      </MenuItem>
                    ))}
                  </Select>{" "}
                </FormControl>{" "}
                <Autocomplete
                  id="mau-sac-autocomplete"
                  multiple
                  options={mauSac}
                  getOptionLabel={(option) => option.TEN_MAU_SAC || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Màu sắc"
                      variant="outlined"
                      margin="dense"
                    />
                  )}
                  value={
                    mauSac.filter((item) =>
                      formData.mauSacIds?.includes(item.MAU_SAC_ID)
                    ) || []
                  }
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: "mauSacIds",
                        value: newValue.map((item) => item.MAU_SAC_ID),
                      },
                    });
                  }}
                  sx={{ width: "400px" }}
                  isOptionEqualToValue={(option, value) =>
                    option.MAU_SAC_ID === value?.MAU_SAC_ID
                  }
                />
                <Autocomplete
                  id="kich-co-autocomplete"
                  multiple
                  options={kichCo}
                  getOptionLabel={(option) => option.KICH_CO || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Kích cỡ"
                      variant="outlined"
                      margin="dense"
                    />
                  )}
                  value={
                    kichCo.filter((item) =>
                      formData.kichCoIds?.includes(item.ID_KICH_CO)
                    ) || []
                  }
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: "kichCoIds",
                        value: newValue.map((item) => item.ID_KICH_CO),
                      },
                    });
                  }}
                  sx={{ width: "400px" }}
                  isOptionEqualToValue={(option, value) =>
                    option.ID_KICH_CO === value?.ID_KICH_CO
                  }
                />
              </Box>{" "}
              <IconButton
                sx={{
                  color: "#d32a28",
                  ml: 4,
                  mr: 4,
                  width: "40px",
                  height: "100px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setOption(!option)}
              >
                <ChevronLeft />
              </IconButton>
            </Box>
          </>
        ) : (
          <>
            {" "}
            <IconButton
              sx={{
                color: "#d32a28",
                // ml: 4,
                // mr: 4,
                width: "40px",
                height: "100px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setOption(!option)}
            >
              {option ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogShoes;
