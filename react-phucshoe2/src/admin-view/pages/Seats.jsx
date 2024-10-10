import React, { useEffect, useState } from "react";
import {
  getAllSeats,
  createSeat,
  updateSeat,
  deleteSeatById,
} from "../../service/seatsService";
import SeatModal from "../components/modal/modalSeats"; // Nhập component SeatModal
import moment from "moment"; // Để định dạng ngày tháng nếu cần

const Seats = () => {
  const [seats, setSeats] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    row: "",
    number: "",
    isAvailable: true,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSeatId, setSelectedSeatId] = useState(null);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    const response = await getAllSeats();
    setSeats(response.DT);
  };

  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false);
    setFormData({ row: "", number: "", isAvailable: true, theaterId: "" });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSeatId(null);
    fetchSeats();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEdit) {
      await updateSeat(selectedSeatId, formData);
    } else if (!formData.row || !formData.number) {
      alert("Vui lòng điền đầy đủ thông tin ghế."); // Hiển thị thông báo lỗi
      return; // Ngừng thực hiện nếu form không hợp lệ
    } else {
      await createSeat(formData);
    }

    handleClose();
  };

  const handleEdit = (seat) => {
    setFormData(seat);
    setSelectedSeatId(seat.id);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteSeatById(id);
    fetchSeats();
  };

  return (
    <div>
      <SeatModal
        open={open}
        handleClose={handleClose}
        formData={formData}
        setFormData={setFormData}
        isEdit={isEdit}
        handleSubmit={handleSubmit}
      />
      <div className="group-header">
        <h2>Danh sách ghế</h2>
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
            <th scope="col">Hàng</th>
            <th scope="col">Số ghế</th>
            <th scope="col">Có sẵn</th>

            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {seats.map((seat, index) => (
            <tr key={seat.id}>
              <td>{index + 1}</td>
              <td>{seat.row}</td>
              <td>{seat.number}</td>
              <td>{seat.isAvailable ? "Có sẵn" : "Không có sẵn"}</td>

              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEdit(seat)}
                >
                  Chỉnh sửa
                </button>
                <button
                  className="btn btn-sm btn-danger ml-2"
                  onClick={() => handleDelete(seat.id)}
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

export default Seats;
