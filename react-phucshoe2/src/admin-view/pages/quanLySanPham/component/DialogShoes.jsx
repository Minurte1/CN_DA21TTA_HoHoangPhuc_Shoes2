import React from "react";
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
} from "@mui/material";

const DialogShoes = ({
  openDialog,
  handleCloseDialog,
  currentProduct,
  handleChange,
  handleSave,
  handleFileChange,
  formData,
  thuongHieu,
  danhMuc,
  gioiTinh,
  chatLieu,
}) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>
        {currentProduct ? "Edit Product" : "Add Product"}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
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

        <FormControl fullWidth margin="dense">
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

        <FormControl fullWidth margin="dense">
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

        <FormControl fullWidth margin="dense">
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

        <FormControl fullWidth margin="dense">
          <InputLabel id="trang-thai-label">Trạng thái</InputLabel>
          <Select
            labelId="trang-thai-label"
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
          InputLabelProps={{ shrink: true }}
          onChange={handleFileChange}
        />
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
