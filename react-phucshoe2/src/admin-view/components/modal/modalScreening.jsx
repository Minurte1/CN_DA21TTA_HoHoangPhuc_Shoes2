/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  createScreening,
  updateScreening,
  deleteScreeningById,
} from "../../../service/screeningService"; // Import service cho screening

// eslint-disable-next-line react/prop-types
const ScreeningModal = ({
  open,
  handleClose,
  formData: initialFormData,
  isDelete,
}) => {
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    movieId: "",
    theaterId: "",
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData); // Gán giá trị cho form nếu có dữ liệu
    } else {
      // Reset formData nếu không có initialFormData
      setFormData({
        startTime: "",
        endTime: "",
        movieId: "",
        theaterId: "",
      });
    }
  }, [initialFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialFormData != null) {
        await handleUpdateScreening(initialFormData.id, formData);
      } else {
        await createScreening(formData);
        alert("Tạo lịch chiếu thành công");
        handleClose(); // Đóng modal sau khi tạo thành công
      }
    } catch (error) {
      console.error("Error creating/updating screening:", error);
      alert("Đã xảy ra lỗi");
    }
  };

  // const handleUpdateScreening = async (id, screeningData) => {
  //   try {
  //     await updateScreeningById(id, screeningData);
  //     alert("Cập nhật lịch chiếu thành công");
  //     handleClose();
  //   } catch (error) {
  //     console.error("Error updating screening:", error);
  //   }
  // };

  const handleDeleteScreening = async (id) => {
    try {
      await deleteScreeningById(id);
      alert("Xóa lịch chiếu thành công");
      handleClose();
    } catch (error) {
      console.error("Error deleting screening:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      {!isDelete && (
        <>
          <DialogTitle id="screeningModalLabel">
            {initialFormData ? "Cập nhật lịch chiếu" : "Tạo mới lịch chiếu"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="dense"
                label="Thời gian bắt đầu"
                name="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                margin="dense"
                label="Thời gian kết thúc"
                name="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                margin="dense"
                label="ID phim"
                name="movieId"
                value={formData.movieId}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                margin="dense"
                label="ID rạp"
                name="theaterId"
                value={formData.theaterId}
                onChange={handleChange}
                fullWidth
                required
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
          <DialogTitle id="screeningModalLabel">
            {initialFormData
              ? `Xoá lịch chiếu ${initialFormData.movieId}`
              : "Xoá lịch chiếu"}
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
              onClick={() => handleDeleteScreening(initialFormData.id)}
              variant="outlined"
              color="primary"
              size="small"
            >
              Xác nhận xóa
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

export default ScreeningModal;
