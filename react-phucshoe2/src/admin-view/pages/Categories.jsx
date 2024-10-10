import { useEffect, useState } from "react";
import CategoryModal from "../components/modal/modalCategories";
import { getAllMovieCategories } from "../../service/categoriesService";
import moment from "moment"; // Để định dạng ngày tháng

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [listCategories, setListCategories] = useState([]);
  const [formData, setFormData] = useState();
  const [isDelete, checkDelete] = useState(false);

  useEffect(() => {
    getAllMovieCategory();
  }, []);

  const getAllMovieCategory = async () => {
    const responsive = await getAllMovieCategories();
    console.log("check responsive", responsive);
    setListCategories(responsive.DT);
  };

  const handleOpen = () => {
    setOpen(true);
    setFormData(null);
  };

  // Hàm đóng modal
  const handleClose = async () => {
    setOpen(false);
    setFormData(undefined); // Reset formData về undefined khi đóng modal
    checkDelete(false);
    getAllMovieCategory();
  };

  const handleEditCategory = (category) => {
    setFormData(category);
    setOpen(true);
  };
  const openModalDelete = (category) => {
    setFormData(category);
    checkDelete(true);
    setOpen(true);
  };

  return (
    <div>
      <CategoryModal
        open={open}
        handleClose={handleClose}
        formData={formData}
        isDelete={isDelete}
      />
      <div className="group-header">
        <h2>Danh mục phim</h2>
        <div className="filterGroup">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
      </div>
      <div className="btn-header-table">
        <button
          className="btn btn-sm btn-success mr-2"
          onClick={() => handleOpen()}
        >
          Thêm mới
        </button>
      </div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên danh mục</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Ngày cập nhật</th>
            <th scope="col">Hoạt động</th>
            <th scope="col">Số lượng phim</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listCategories.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.name || "Không có tên"}</td>
              <td>{category.description || "Không có mô tả"}</td>
              <td>{moment(category.createdDate).format("DD/MM/YYYY")}</td>
              <td>{moment(category.updatedDate).format("DD/MM/YYYY")}</td>
              <td>
                <input
                  type="checkbox"
                  checked={category.isActive === 1}
                  disabled
                />
              </td>
              <td>{category.moviesCount}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEditCategory(category)}
                >
                  Chỉnh sửa
                </button>
                <button
                  className="btn btn-sm btn-danger ml-2"
                  onClick={() => openModalDelete(category)}
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

export default Categories;
