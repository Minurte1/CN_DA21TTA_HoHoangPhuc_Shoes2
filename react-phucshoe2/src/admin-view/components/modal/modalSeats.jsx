// src/components/SeatModal.js
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const SeatModal = ({
  open,
  handleClose,
  formData,
  setFormData,
  isEdit,
  handleSubmit,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEdit ? "Chỉnh sửa ghế" : "Thêm mới ghế"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Hàng"
          value={formData.row}
          onChange={(e) => setFormData({ ...formData, row: e.target.value })}
          fullWidth
          required
          sx={{ mt: 2 }}
        />
        <TextField
          label="Số"
          type="number"
          value={formData.number}
          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
          fullWidth
          required
          sx={{ mt: 2 }}
        />
        <label className="mt-4">Có sẵn?</label>
        <FormControlLabel
          sx={{ ml: 2 }}
          control={
            <Checkbox
              checked={formData.isAvailable}
              onChange={(e) =>
                setFormData({ ...formData, isAvailable: e.target.checked })
              }
            />
          }
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleSubmit}>{isEdit ? "Cập nhật" : "Thêm"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SeatModal;
