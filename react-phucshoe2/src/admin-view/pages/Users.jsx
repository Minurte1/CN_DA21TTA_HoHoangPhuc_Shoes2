import { useEffect, useState } from "react";

import moment from "moment"; // For formatting dates

const Users = () => {
  const [open, setOpen] = useState(false);
  const [listUsers, setListUsers] = useState([]); // To store the list of users
  const [formData, setFormData] = useState(null); // To handle data for adding/editing users
  const [isDelete, checkDelete] = useState(false); // Flag to check if it's delete action

  // useEffect(() => {
  //   getAllUsersList();
  // }, []);

  // const getAllUsersList = async () => {
  //   const response = await getAllUsers(); // Fetch users from API
  //   console.log("Users fetched", response);
  //   setListUsers(response || []); // Set the list of users
  // };

  // Function to open modal for adding a new user
  const handleOpen = () => {
    setOpen(true);
    setFormData(null); // Reset form data for a new user
  };

  // Function to close the modal
  const handleClose = async () => {
    setOpen(false);
    setFormData(undefined); // Reset formData when closing modal
    checkDelete(false);
  };

  // Function to handle editing a user
  const handleEditUser = (user) => {
    setFormData(user); // Set the user data for editing
    setOpen(true);
  };

  // Function to handle delete modal
  const openModalDelete = (user) => {
    setFormData(user);
    checkDelete(true); // Mark as delete action
    setOpen(true);
  };

  return (
    <div>
      {/* User Modal Component */}
      {/* <UserModal
        open={open}
        handleClose={handleClose}
        formData={formData}
        isDelete={isDelete}
      /> */}

      {/* Header Section */}
      <div className="group-header">
        <h2>Danh sách người dùng</h2>
        <div className="filterGroup">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm người dùng"
          />
        </div>
      </div>

      {/* Add New User Button */}
      <div className="btn-header-table">
        <button
          className="btn btn-sm btn-success mr-2"
          onClick={() => handleOpen()}
        >
          Thêm mới
        </button>
      </div>

      {/* Users Table */}
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên người dùng</th>
            <th scope="col">Email</th>
            <th scope="col">Điểm tích luỹ</th>
            <th scope="col">Ngày tạo</th>
            {/* <th scope="col">Ngày cập nhật</th> */}
            <th scope="col">Hoạt động</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.userName || "Không có tên"}</td>
              <td>{user.email || "Không có email"}</td>
              <td>{user.score}</td>
              <td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
              {/* <td>{moment(user.updatedDate).format("DD/MM/YYYY")}</td> */}
              <td>
                {/* <input
                  type="checkbox"
                  checked={user.isActive === 1}
                  disabled
                /> */}
                {user.role != -1 ? "Đang hoạt động" : "Tạm Khoá"}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEditUser(user)}
                >
                  Chỉnh sửa
                </button>
                <button
                  className="btn btn-sm btn-danger ml-2"
                  onClick={() => openModalDelete(user)}
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

export default Users;
