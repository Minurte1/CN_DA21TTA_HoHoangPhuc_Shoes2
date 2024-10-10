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
  createMovieCategory,
  updateMovieCategoryById,
  deleteMovieCategoryById,
} from "../../../service/categoriesService";

// eslint-disable-next-line react/prop-types
const CategoryModal = ({
  open,
  handleClose,
  formData: initialFormData,
  isDelete: isDelete,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: false,
    moviesCount: 0,
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData); // Gán giá trị mới cho form khi nhận dữ liệu từ cha
    } else {
      // Reset formData khi không có initialFormData
      setFormData({
        name: "",
        description: "",
        isActive: false,
        moviesCount: 0,
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
        console.log(initialFormData);
        // eslint-disable-next-line react/prop-types
        handleUpdateCategory(initialFormData.id, formData);
      } else {
        const resposive = await createMovieCategory(formData);
        console.log("resposive", resposive);
        alert("Tạo danh mục thành công");
        // Đóng modal sau khi tạo thành công
        handleClose();
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Đã xảy ra lỗi");
    }
  };
  const handleUpdateCategory = async (id, categoryData) => {
    try {
      const resposive = await updateMovieCategoryById(id, categoryData);
      console.log("resposive", resposive);
      alert("Cập Nhật danh mục thành công");
      handleClose();
    } catch (error) {
      console.error("Error updating movie category:", error);
    }
  };
  const handleDeleteCategory = async (id) => {
    try {
      const resposive = await deleteMovieCategoryById(id);
      console.log("resposive", resposive);
      alert("Xoá danh mục thành công");
      handleClose();
    } catch (error) {
      console.error("Error deleting movie category:", error);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      {!isDelete && (
        <>
          <DialogTitle id="categoryModalLabel">
            {initialFormData ? "Cập nhật danh mục" : "Tạo mới danh mục"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="dense"
                label="Tên danh mục"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                margin="dense"
                label="Mô tả"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
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
              <TextField
                margin="dense"
                label="Số lượng phim"
                type="number"
                name="moviesCount"
                value={formData.moviesCount}
                onChange={handleChange}
                fullWidth
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
              Save changes
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Close
            </Button>
          </DialogActions>
        </>
      )}
      {isDelete && (
        <>
          <DialogTitle id="categoryModalLabel">
            {initialFormData
              ? `Xoá danh mục ${initialFormData.name}`
              : "Xoá danh mục"}
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
              onClick={() => handleDeleteCategory(initialFormData.id)}
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
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default CategoryModal;
