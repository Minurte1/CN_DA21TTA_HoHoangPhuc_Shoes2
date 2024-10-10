import { useEffect, useState } from "react";
import ScreeningModal from "../components/modal/modalScreening"; // Import modal component
import {
  getAllScreenings,
  createScreening,
  updateScreening,
  deleteScreeningById,
} from "../../service/screeningService"; // Import service
import moment from "moment"; // Để định dạng ngày tháng

const ScreeningList = () => {
  const [open, setOpen] = useState(false);
  const [screenings, setScreenings] = useState([]);
  const [formData, setFormData] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    fetchScreenings();
  }, []);

  const fetchScreenings = async () => {
    const data = await getAllScreenings();
    setScreenings(data.DT);
  };

  const handleOpen = () => {
    setOpen(true);
    setFormData(null);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(null); // Reset formData khi đóng modal
    setIsDelete(false);
    fetchScreenings();
  };

  const handleEditScreening = (screening) => {
    setFormData(screening);
    setOpen(true);
  };

  const openModalDelete = (screening) => {
    setFormData(screening);
    setIsDelete(true);
    setOpen(true);
  };

  return (
    <div>
      <ScreeningModal
        open={open}
        handleClose={handleClose}
        formData={formData}
        isDelete={isDelete}
      />
      <div className="group-header">
        <h2>Danh sách chiếu phim</h2>
        <div className="filterGroup">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm..."
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
            <th scope="col">Thời gian bắt đầu</th>
            <th scope="col">Thời gian kết thúc</th>
            <th scope="col">Tên phim</th>
            <th scope="col">Tên rạp</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {screenings.map((screening, index) => (
            <tr key={screening.id}>
              <td>{index + 1}</td>
              <td>{moment(screening.startTime).format("DD/MM/YYYY HH:mm")}</td>
              <td>{moment(screening.endTime).format("DD/MM/YYYY HH:mm")}</td>
              <td>{screening.title}</td>
              <td>{screening.name}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEditScreening(screening)}
                >
                  Chỉnh sửa
                </button>
                <button
                  className="btn btn-sm btn-danger ml-2"
                  onClick={() => openModalDelete(screening)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScreeningList;
