import React, { useEffect, useState } from "react";
import ModalTheater from "../components/modal/modalTheaters"; // Modal dùng chung cho thêm mới và chỉnh sửa
import {
  getAllTheaters,
  deleteTheaterById,
} from "../../service/theatersService";
import {
  Typography,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Theaters = () => {
  const [open, setOpen] = useState(false);
  const [listTheaters, setListTheaters] = useState([]);
  const [formData, setFormData] = useState(null); // Dữ liệu của theater đang chỉnh sửa
  const [openDelete, setOpenDelete] = useState(false); // Modal xác nhận xóa
  const [selectedTheater, setSelectedTheater] = useState(null); // Theater đang chọn để xóa

  useEffect(() => {
    getAllTheaterData();
  }, []);

  const getAllTheaterData = async () => {
    try {
      const response = await getAllTheaters();
      if (response.EC === 1) {
        setListTheaters(response.DT);
      } else {
        console.error("Failed to fetch theaters");
      }
    } catch (err) {
      console.error("Error occurred", err);
    }
  };

  // Mở modal thêm mới theater
  const handleOpen = () => {
    setOpen(true);
    setFormData(null); // Reset form khi thêm mới
  };

  // Đóng modal và cập nhật danh sách theaters sau khi thêm hoặc chỉnh sửa
  const handleClose = () => {
    setOpen(false);
    setSelectedTheater(null);
    getAllTheaterData(); // Cập nhật danh sách theaters sau khi modal đóng
  };

  // Mở modal để chỉnh sửa theater
  const handleEditTheater = (theater) => {
    setFormData(theater);
    setOpen(true);
  };

  // Mở modal xác nhận xóa theater
  const openModalDelete = (theater) => {
    setOpenDelete(true);
    setSelectedTheater(theater);
  };

  // Đóng modal xóa
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Xử lý xóa theater
  const handleDeleteTheater = async () => {
    try {
      const response = await deleteTheaterById(selectedTheater.id);
      if (response.EC === 1) {
        alert("Xóa thành công!");
        setListTheaters(response.DT);
      } else {
        console.error("Failed to delete theater:", response.EM);
      }
      setOpenDelete(false);
    } catch (error) {
      console.error("Error deleting theater:", error);
      alert("Có lỗi xảy ra khi xóa theater.");
    }
  };

  return (
    <div>
      {/* Modal xác nhận xóa */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Xác nhận xóa rạp</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa rạp "{selectedTheater?.name}" không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDelete}
            color="primary"
            variant="outlined"
          >
            Không
          </Button>
          <Button
            onClick={handleDeleteTheater}
            color="secondary"
            variant="contained"
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal thêm mới/chỉnh sửa theater */}
      <ModalTheater open={open} handleClose={handleClose} formData={formData} />

      <div className="group-header">
        <h2>Danh sách rạp chiếu phim</h2>
        <div className="filterGroup">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm rạp"
          />
        </div>
      </div>

      <div className="btn-header-table">
        <button className="btn btn-sm btn-success mr-2" onClick={handleOpen}>
          Thêm mới
        </button>
      </div>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên rạp</th>
            <th scope="col">Capacity</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listTheaters.length > 0 ? (
            listTheaters.map((theater, index) => (
              <tr key={theater.id}>
                <td>{index + 1}</td>
                <td>{theater.name || "Không có tên"}</td>
                <td>{theater.capacity || "Không có địa chỉ"}</td>

                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEditTheater(theater)}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="btn btn-sm btn-danger ml-2"
                    onClick={() => openModalDelete(theater)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <Typography variant="h6">Không tìm thấy rạp</Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Theaters;
