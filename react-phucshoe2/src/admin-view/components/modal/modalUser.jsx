/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import {
  createUser,
  updateUserById,
  deleteUserById,
} from "../../../service/userAccountService"; // Thay đổi tên API cho phù hợp

const UserModal = ({
  open,
  handleClose,
  formData: initialFormData,
  isDelete: isDelete,
}) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    score: "",
    isActive: false,
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData); // Gán giá trị mới cho form khi nhận dữ liệu từ cha
    } else {
      // Reset formData khi không có initialFormData
      setFormData({
        userName: "",
        email: "",
        score: "",
        isActive: false,
      });
    }
  }, [initialFormData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialFormData != null) {
        // eslint-disable-next-line react/prop-types
        console.log(initialFormData )
        handleUpdateUser(initialFormData.id, formData);
      } else {
        const response = await createUser(formData); // Tạo người dùng mới
        console.log("response", response);
        alert("Tạo người dùng thành công");
        handleClose(); // Đóng modal sau khi tạo thành công
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Đã xảy ra lỗi");
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      const response = await updateUserById(id, userData); // Cập nhật người dùng
      console.log("response", response);
      alert("Cập nhật người dùng thành công");
      handleClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await deleteUserById(id); // Xóa người dùng
      console.log("response", response);
      alert("Xóa người dùng thành công");
      handleClose();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      {!isDelete && (
        <>
          <DialogTitle id="userModalLabel">
            {initialFormData ? "Cập nhật người dùng" : "Tạo mới người dùng"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="dense"
                label="Tên người dùng"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                margin="dense"
                label="Điểm tích luỹ"
                type="tel"
                name="score"
                value={formData.score}
                onChange={handleChange}
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="isActive"
                    checked={Boolean(formData.isActive)}
                    onChange={handleChange}
                  />
                }
                label="Hoạt động"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmit}
              variant="outlined"
              color="primary"
              size="small"
            >
              Lưu thay đổi
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Đóng
            </Button>
          </DialogActions>
        </>
      )}
      {isDelete && (
        <>
          <DialogTitle id="userModalLabel">
            {initialFormData ? `Xóa người dùng ${initialFormData.userName}` : "Xóa người dùng"}
          </DialogTitle>
          <DialogContent>
            <div className="content-delete">
              <img
                src="https://cfagame9999.store/assets/popup/X-Png-136.png"
                alt=""
                width={230}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleDeleteUser(initialFormData.id)}
              variant="outlined"
              color="primary"
              size="small"
            >
              Xóa
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Đóng
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default UserModal;
