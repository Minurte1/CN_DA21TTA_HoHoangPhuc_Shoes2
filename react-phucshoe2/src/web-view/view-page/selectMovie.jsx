import { useLocation } from "react-router-dom";
import "../css-page/selectMovie.css"; // Đảm bảo rằng bạn tạo file CSS
import { useEffect } from "react";
import axiosInstance from "../../authentication/axiosInstance.jsx";
const SelectMovie = () => {
  const location = useLocation();
  const movie = location.state?.movie; // Lấy movie từ state

  useEffect(() => {
    if (movie) {
      fetchDataMovie(movie.id);
    }
  }, [movie]);
  const fetchDataMovie = async (id) => {
    try {
      const response = await axiosInstance.post(``);
    } catch (error) {}
  };
  return (
    <div className="background-image-container">
      <img
        src={`http://localhost:3002/api/uploads/${movie?.img}`} // Đặt hình ảnh từ movie.img
        alt={movie?.title}
        className="background-image"
      />

      <div className="overlay"></div>
      <div className="content-selectMovie">
        {/* Nội dung khác của trang */}
        <div className="content-movie">
          <div className="title-movie">
            {" "}
            <img
              src={`http://localhost:3002/api/uploads/${movie?.img}`} // Đặt hình ảnh từ movie.img
              alt={movie?.title}
              className="img-movie"
            />
            <div>
              <p className="movie-time margin-left-10">{movie?.releaseDate}</p>
              <h3 className="margin-left-10">{movie?.title}</h3>
              <span className="margin-left-10">{movie?.duration} minute</span>
              <div className="margin-left-10">
                {" "}
                {[...Array(movie?.rating || 0)].map((_, index) => (
                  <i className="fa fa-star text-danger " key={index}></i>
                ))}
              </div>
              <div>
                <button className="btn btn-danger margin-left-10">
                  Đặt vé
                </button>
              </div>
            </div>
            <p className="movie-synopsis margin-left-30">{movie?.synopsis}</p>
          </div>
        </div>
        <div className="lich-chieu">
          <p>Thông tin chi tiết</p>
          <p className="margin-left-10">Lịch chiếu</p>
        </div>
      </div>
    </div>
  );
};

export default SelectMovie;
