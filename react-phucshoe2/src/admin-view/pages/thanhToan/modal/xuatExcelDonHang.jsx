import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const ExportExcelModal = ({ open, onClose, onExport }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const handleExport = () => {
    if (startDate && endDate && status) {
      onExport(startDate, endDate, status);
    } else {
      alert("Vui lòng nhập đầy đủ thông tin.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chọn Khoảng Thời Gian và Trạng Thái</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <TextField
          label="Ngày Bắt Đầu"
          type="date"
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2, mt: 2 }}
        />
        <TextField
          label="Ngày Kết Thúc"
          type="date"
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="status-label">Trạng Thái</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Trạng Thái"
          >
            <MenuItem value="Đang chờ thanh toán">Đang chờ thanh toán</MenuItem>
            <MenuItem value="Đã thanh toán thành công và đang chờ giao hàng">
              Đã thanh toán thành công và đang chờ giao hàng
            </MenuItem>
            <MenuItem value="Đơn hàng đang giao">Đơn hàng đang giao</MenuItem>{" "}
            <MenuItem value="Đã hủy">Đã hủy</MenuItem>{" "}
            <MenuItem value="Giao dịch thành công">
              Giao dịch thành công
            </MenuItem>
            {/* Thêm các trạng thái khác nếu cần */}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleExport} color="primary">
          Xuất Excel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportExcelModal;
