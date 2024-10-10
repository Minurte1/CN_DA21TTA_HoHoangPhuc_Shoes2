import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Header = () => {
  const navigate = useNavigate();

  const onNavigateRouter = (routerName) => {
    window.scrollTo({top: 0,left: 0,behavior: 'instant' });
    navigate(routerName);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  const handleScroll = () => {
    const navbarSticky = document.getElementById('navbar_sticky');
    if (navbarSticky) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      var sticky ;
      if(navbarSticky.offsetTop != null){
        sticky = navbarSticky.offsetTop;
      }

      if (window.pageYOffset >= sticky + navbarHeight) {
        navbarSticky.classList.add('sticky');
        document.body.style.paddingTop = navbarHeight + 'px';
      } else {
        if( navbarSticky.classList.contains('sticky')){
          navbarSticky.classList.remove('sticky');
        }
       
        document.body.style.paddingTop = '0';
      }
    }
  };

 
  return (
    <div>
      <section id="top">
        <div className="container">
          <div className="row top_1">
            <div className="col-md-3">
              <div className="top_1l pt-1">
                <h3 className="mb-0">
                  <a className="text-white" href="/" onClick={(e) => { e.preventDefault(); onNavigateRouter('/'); }}>
                    <i className="fa fa-video-camera col_red me-1"></i> Planet
                  </a>
                </h3>
              </div>
            </div>
            <div className="col-md-5">
              <div className="top_1m">
                <div className="input-group">
                  <input type="text" className="form-control bg-black" placeholder="Search Site..." />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="top_1r text-end">
                <ul className="social-network social-circle mb-0">
                  <li><a href="#" className="icoRss" title="Rss"><i className="fa fa-instagram"></i></a></li>
                  <li><a href="#" className="icoFacebook" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                  <li><a href="#" className="icoTwitter" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                  <li><a href="#" className="icoGoogle" title="Google +"><i className="fa fa-youtube"></i></a></li>
                  <li><a href="#" className="icoLinkedin" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="header" style={{background: "#191a1d"}}>
        <nav className="navbar navbar-expand-md navbar-light" id="navbar_sticky">
          <div className="container">
            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
              <ul className="navbar-nav mb-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/" onClick={(e) => { e.preventDefault(); onNavigateRouter('/'); }}>Trang Chủ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => onNavigateRouter('/movie')}>Phim</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sự kiện
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Ưu đãi</a></li>
                    <li><a className="dropdown-item" href="#">Phim hay tháng</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownFilmCorner" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Góc điện ảnh
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownFilmCorner">
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onNavigateRouter('/film-corner/type'); }}>Loại phim</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onNavigateRouter('/film-corner/director'); }}>Đạo diễn</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onNavigateRouter('/film-corner/actor'); }}>Diễn viên</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onNavigateRouter('/film-corner/review'); }}>Bình luận phim</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onNavigateRouter('/film-corner/blog'); }}>Blog</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => onNavigateRouter('/theater-tickets')}>Rạp/Gíá vé</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default Header;
