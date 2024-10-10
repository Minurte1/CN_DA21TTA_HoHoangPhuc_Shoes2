import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../authentication/axiosInstance";
import "../css-page/movie.css";
import { getAllMovies } from "../../service/moviesServices";
import { useNavigate } from "react-router-dom";
const Movie = () => {
  const [movieList, setMovieList] = useState([]);
  const [showAll, setShowAll] = useState(false); // State để kiểm soát hiển thị
  const navigate = useNavigate();
  useEffect(() => {
    fetchMovies();
  }, []);
  const fetchMovies = async () => {
    const response = await getAllMovies();
    console.log(response);
    if (response.EC === 1) {
      setMovieList(response.DT);
    }
  };

  // Hàm để chuyển đổi trạng thái hiển thị
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Số lượng phim tối đa hiển thị
  const displayedMovies = showAll ? movieList : movieList.slice(0, 4);
  const handleSelectMovie = (movie) => {
    console.log(movie);
    navigate(`/selectMovie/${movie.id}`, {
      state: { movie },
      replace: true, // Thêm thuộc tính này
    });
  };

  return (
    <>
      <section className="banner-img"></section>
      <section className="pt-4 pb-5 red-boder">
        <div className="container">
          <div className="row trend_1">
            <div className="col-md-6 col-6">
              <div className="trend_1l">
                <h4 className="mb-0">
                  <i className="fa fa-youtube-play align-middle col_red me-1"></i>
                  Upcoming <span className="col_red">Movies</span>
                </h4>
              </div>
            </div>
            <div className="col-md-6 col-6">
              <div className="trend_1r text-end">
                <h6 className="mb-0">
                  {movieList.length > 4 && (
                    <button
                      href=""
                      className="button focus-ring"
                      onClick={toggleShowAll}
                    >
                      {showAll ? "Show Less" : "View All"}
                    </button>
                  )}
                </h6>
              </div>
            </div>
          </div>
          {/* ---start---render */}
          <div className="row trend_2 mt-4 ">
            {displayedMovies.map((movie) => (
              <div
                className="col-md-3 col-6  mt-2"
                key={movie.id}
                onClick={() => handleSelectMovie(movie)}
              >
                <div className="trend_2im clearfix position-relative">
                  <div className="trend_2im1 clearfix ">
                    <div className="grid">
                      <figure className="effect-jazz mb-0">
                        <div>
                          <img
                            src={`http://localhost:3002/api/uploads/${movie.img}`} // Thay đổi đường dẫn để hiển thị ảnh
                            className="w-100"
                            height={250}
                            alt={movie.title} // Sử dụng tiêu đề phim làm alt text
                          />
                        </div>
                      </figure>
                    </div>
                  </div>
                  <div className="trend_2im2 clearfix text-center position-absolute w-100 top-0">
                    <span className="fs-1">
                      <a className="col_red" href="#">
                        <i className="fa fa-youtube-play"></i>
                      </a>
                    </span>
                  </div>
                </div>
                <div className="trend_2ilast bg_grey p-3 clearfix ">
                  <h5 className="movie-item-title">
                    <a className="col_red" href="#">
                      {movie.title} {/* Hiển thị tiêu đề phim */}
                    </a>
                  </h5>
                  <p className="mb-2 movie-item-synopsis">
                    {movie.synopsis} {/* Hiển thị nội dung tóm tắt phim */}
                  </p>
                  <span className="col_red">
                    {/* Hiển thị số sao */}
                    {[...Array(movie.rating)].map((_, index) => (
                      <i className="fa fa-star" key={index}></i>
                    ))}
                  </span>
                  <p className="mb-0">{movie.views || "1 Views"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ---end---render */}
      </section>
      <section className="pt-4 pb-5">
        <div className="container">
          <div className="row trend_1">
            <div className="col-md-6 col-6">
              <div className="trend_1l">
                <h4 className="mb-0">
                  <i className="fa fa-youtube-play align-middle col_red me-1"></i>
                  Upcoming <span className="col_red">Movies</span>
                </h4>
              </div>
            </div>
            <div className="col-md-6 col-6">
              <div className="trend_1r text-end">
                <h6 className="mb-0">
                  <a className="button" href="#">
                    {" "}
                    View All
                  </a>
                </h6>
              </div>
            </div>
          </div>
          <div className="row trend_2 mt-4">
            <div className="col-md-3 col-6">
              <div className="trend_2im clearfix position-relative">
                <div className="trend_2im1 clearfix">
                  <div className="grid">
                    <figure className="effect-jazz mb-0">
                      <div>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjPxpT77erdldCn1LWTe-GII9xstrVM9TlyA&s"
                          className="w-100"
                          height={250}
                          alt="img25"
                        />
                      </div>
                    </figure>
                  </div>
                </div>
                <div className="trend_2im2 clearfix text-center position-absolute w-100 top-0">
                  <span className="fs-1">
                    <a className="col_red" href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                  </span>
                </div>
              </div>
              <div className="trend_2ilast bg_grey p-3 clearfix">
                <h5>
                  <a className="col_red" href="#">
                    Semper
                  </a>
                </h5>
                <p className="mb-2">
                  A father travels from Oklahoma to France to help his...
                </p>
                <span className="col_red">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </span>
                <p className="mb-0">1 Views</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="trend_2im clearfix position-relative">
                <div className="trend_2im1 clearfix">
                  <div className="grid">
                    <figure className="effect-jazz mb-0">
                      <a href="#">
                        <img
                          src="https://designercomvn.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2017/08/26015850/nhan-thiet-ke-poster-phim-hoat-hinh-gia-re-tai-ha-noi3.jpg"
                          className="w-100"
                          height={250}
                          alt="img25"
                        />
                      </a>
                    </figure>
                  </div>
                </div>
                <div className="trend_2im2 clearfix text-center position-absolute w-100 top-0">
                  <span className="fs-1">
                    <a className="col_red" href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                  </span>
                </div>
              </div>
              <div className="trend_2ilast bg_grey p-3 clearfix">
                <h5>
                  <a className="col_red" href="#">
                    Dapibus
                  </a>
                </h5>
                <p className="mb-2">
                  A father travels from Oklahoma to France to help his...
                </p>
                <span className="col_red">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </span>
                <p className="mb-0">1 Views</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="trend_2im clearfix position-relative">
                <div className="trend_2im1 clearfix">
                  <div className="grid">
                    <figure className="effect-jazz mb-0">
                      <a href="#">
                        <img
                          src="https://d1j8r0kxyu9tj8.cloudfront.net/images/1566809340Y397jnilYDd15KN.jpg"
                          className="w-100"
                          height={250}
                          alt="img25"
                        />
                      </a>
                    </figure>
                  </div>
                </div>
                <div className="trend_2im2 clearfix text-center position-absolute w-100 top-0">
                  <span className="fs-1">
                    <a className="col_red" href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                  </span>
                </div>
              </div>
              <div className="trend_2ilast bg_grey p-3 clearfix">
                <h5>
                  <a className="col_red" href="#">
                    Ipsum
                  </a>
                </h5>
                <p className="mb-2">
                  A father travels from Oklahoma to France to help his...
                </p>
                <span className="col_red">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </span>
                <p className="mb-0">1 Views</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="trend_2im clearfix position-relative">
                <div className="trend_2im1 clearfix">
                  <div className="grid">
                    <figure className="effect-jazz mb-0">
                      <a href="#">
                        <img
                          src="https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg"
                          className="w-100"
                          height={250}
                          alt="img25"
                        />
                      </a>
                    </figure>
                  </div>
                </div>
                <div className="trend_2im2 clearfix text-center position-absolute w-100 top-0">
                  <span className="fs-1">
                    <a className="col_red" href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                  </span>
                </div>
              </div>
              <div className="trend_2ilast bg_grey p-3 clearfix">
                <h5>
                  <a className="col_red" href="#">
                    Lorem
                  </a>
                </h5>
                <p className="mb-2">
                  A father travels from Oklahoma to France to help his...
                </p>
                <span className="col_red">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </span>
                <p className="mb-0">1 Views</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Movie;
