import React, { useEffect, useState } from "react";
import ModalMovies from "../components/modal/modalMovies";
import { getAllMovies } from "../../service/moviesServices";
import moment from "moment";
import {
  Typography,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { deleteMoviesyById } from "../../service/moviesServices";
const apiUrl = process.env.REACT_APP_URL_SERVER;

const apiImage = apiUrl + "/uploads/";

const Movies = () => {
  const [open, setOpen] = useState(false);
  const [listMovies, setListMovies] = useState([]);
  const [formData, setFormData] = useState();
  const [isDelete, checkDelete] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [searchTerm, setSearchTerm] = useState(""); // State cho từ khóa tìm kiếm
  const moviesPerPage = 10; // Số phim hiển thị mỗi trang

  useEffect(() => {
    getAllMovieData();
  }, []);

  const getAllMovieData = async () => {
    try {
      const response = await getAllMovies();
      if (response.EC === 1) {
        setListMovies(response.DT);
      } else {
        console.error("Failed to fetch movies");
      }
    } catch (err) {
      console.error("Error occurred", err);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setFormData(null);
  };

  const handleClose = async () => {
    setOpen(false);
    setSelectedMovie(null);
    setFormData(undefined);
    checkDelete(false);
    getAllMovieData();
  };

  const handleEditMovie = (movie) => {
    setFormData(movie);
    setSelectedMovie(movie);
    setOpen(true);
  };

  const openModalDelete = (movie) => {
    checkDelete(true);
    setOpenDelete(true);
    setSelectedMovie(movie);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteMovie = async () => {
    try {
      const responsive = await deleteMoviesyById(selectedMovie);
      if (responsive.EC === 1) {
        alert("Phim đã được xóa thành công!");
        setListMovies(responsive.DT);
      } else {
        console.log(responsive.EM);
      }
      setOpenDelete(false);
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Đã xảy ra lỗi khi xóa phim.");
    }
  };

  // Tính toán số trang
  const totalPages = Math.ceil(listMovies.length / moviesPerPage);

  // Lọc danh sách phim dựa trên từ khóa tìm kiếm
  const filteredMovies = listMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lấy danh sách phim của trang hiện tại
  const currentMovies = filteredMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  // Chuyển đến trang trước
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Chuyển đến trang sau
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Xác nhận xóa phim</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa phim "{selectedMovie?.title}" không?
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
            onClick={handleDeleteMovie}
            color="secondary"
            variant="contained"
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>

      <ModalMovies
        open={open}
        handleClose={handleClose}
        formData={formData}
        isDelete={isDelete}
        selectedMovies={selectedMovie}
        getAllMovieData={getAllMovieData}
      />

      <div className="group-header">
        <h2>Danh sách phim</h2>
        <div className="filterGroup">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm tên phim"
            value={searchTerm}
            onChange={handleSearch}
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
            <th scope="col">Tiêu đề</th>
            <th scope="col">Thể loại</th>
            <th scope="col">Tóm tắt</th>
            <th scope="col">Đạo diễn</th>
            <th scope="col">Thời lượng</th>
            <th scope="col">Ngày phát hành</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentMovies.length > 0 ? (
            currentMovies.map((movie, index) => (
              <tr key={movie.id}>
                <td>{(currentPage - 1) * moviesPerPage + index + 1}</td>
                <td>{movie.title || "Không có tiêu đề"}</td>
                <td>{movie.movieCategoryName || "Không có thể loại"}</td>
                <td>{movie.synopsis || "Không có tóm tắt"}</td>
                <td>{movie.director || "Không có đạo diễn"}</td>
                <td>
                  {movie.duration
                    ? `${movie.duration} phút`
                    : "Không có thời lượng"}
                </td>
                <td>
                  {moment(movie.releaseDate).format("DD/MM/YYYY") ||
                    "Không có ngày phát hành"}
                </td>
                <td>
                  <img
                    width={`50px`}
                    src={apiImage + (movie.img || "")}
                    alt={movie.title || "Hình ảnh phim"}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEditMovie(movie)}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="btn btn-sm btn-danger ml-2"
                    onClick={() => openModalDelete(movie)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">
                <Typography variant="h6">Không tìm thấy phim</Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Trang trước
        </Button>
        <span variant="body1" className="mx-2">
          Trang {currentPage} / {totalPages}
        </span>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Trang sau
        </Button>
      </div>
    </div>
  );
};

export default Movies;
