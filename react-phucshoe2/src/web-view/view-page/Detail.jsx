import {Link} from "react-router-dom";

const Detail = () => {
    return (
        <>
            <div className="container">
                <div className="row mx-0" style={{marginTop: '50px'}}>
                    <div className="col-3 mt-2">
                        <div className="detail-feat-img">
                            <img
                                src="https://cdn.galaxycine.vn/media/2023/5/10/300x450_1683702253803.jpg"
                                className="loaded img-hover"
                                data-was-processed="true"
                                style={{boxShadow: '2px 2px 5px #f26b38',width: '267px',height: '272px'}}
                            />
                            <a
                                href="https://youtu.be/DAjHDmR6jec"
                                target="_blank"
                                className="play-button"
                                style={{
                                    color: '#f9f9f9',
                                    textDecoration: 'none',
                                    fontSize: '80px',
                                    opacity: 0.6,
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <i className="bi bi-play-circle"/>
                            </a>
                        </div>
                        <section className="mt-5 text-secondary border border-2 p-3 section-movie"
                                 style={{fontFamily: "'Arial'"}}>
                            <h4 style={{fontSize: '18px'}}>NHẬN KHUYẾN MÃI</h4>
                            <div className="box-promotion mt-3">
                                <form className="">
                                    <input
                                        placeholder="Nhập Email Của Bạn"
                                        className="input-movie w-100 form-control"
                                        style={{border: '1px solid #f26b38', borderRadius: '0', height: '40px'}}
                                    />
                                    <button className="button-movie-1 mt-2" style={{
                                        backgroundColor: '#f26b38',
                                        color: '#ffffff',
                                        border: '1px solid',
                                        fontSize: '12px',
                                        width: '100%',
                                        height: '30px'
                                    }}>Đăng Ký
                                    </button>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div className="col-6" style={{boxShadow: '0px 0px 10px 3px #f26b38',height:"650px",marginBottom: '50px'}}>
                        <div>
                            <h3 className="text-secondary" style={{fontSize: '18px', marginTop:'10px'}} >THE BLACK DEMON (QUÁI VẬT ĐEN)</h3>
                        </div>

                        <div className="detail-rating">
                            <div className="mt-2">
                                <hr className="text-movie"/>
                                <table>
                                    <thead>
                                    <tr style={{height: 39}}>
                                        <th className="text-secondary">Thể Loại :</th>
                                        <td> Giả Tưởng, Giật Gân</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr style={{height: 39}}>
                                        <th className="text-secondary">Quốc Gia :</th>
                                        <td> Mỹ</td>
                                    </tr>
                                    <tr style={{height: 39}}>
                                        <th className="text-secondary">Đạo diễn :</th>
                                        <td> Adrian Grunberg</td>
                                    </tr>
                                    <tr style={{height: 39}}>
                                        <th className="text-secondary">Diễn viên :</th>
                                        <td> Josh Lucas, Julio Cesar</td>
                                    </tr>
                                    <tr style={{height: 39}}>
                                        <th className="text-secondary">Nhà sản xuất :</th>
                                        <td> Buzzfeed Studios</td>
                                    </tr>
                                    <tr style={{height: 40, width: 250}}>
                                        <th className="text-secondary" style={{width: 136}}>
                                            Ngày khởi chiếu :
                                        </th>
                                        <td> 12/05/2023</td>
                                    </tr>
                                    <tr style={{height: 39}}>
                                        <th className="text-secondary">Nhà sản xuất :</th>
                                        <td> Buzzfeed Studios</td>
                                    </tr>
                                    <tr style={{height: 46}}>
                                        <th className="">
                  <Link to='/selectPosition' type="button" className="button-movie" style={{ height: "30px", background: "rgb(242, 107, 56)", color: 'white', display: "inline-block", textAlign: "center", width: "100px", padding: "0", borderRadius: "5px", lineHeight: "30px" }}>
  Đặt vé
</Link>

                                        </th>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr className="text-movie"/>
                            <div className="mt-4 text-secondary">
                                <div>
                                    <h3 style={{fontSize: '18px'}}>NỘI DUNG PHIM</h3>
                                </div>
                                <div>
                                    <p style={{color: 'black'}}>
                                        Quái Vật Đen xoay quanh câu chuyện khi kỳ nghỉ bình dị của gia
                                        đình Oilman Paul Sturges biến thành cơn ác mộng. Bởi họ đã gặp
                                        phải một con cá mập Megalodon hung dữ, không từ bất kỳ khoảnh
                                        khắc nào để bảo vệ lãnh thổ của mình. Bị mắc kẹt và tấn công
                                        liên tục, Paul và gia đình của mình phải tìm cách để an toàn sống
                                        sót trở về bờ trước khi con cá mập khát máu này tấn công lần nữa.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 text-secondary">
                        <div>
                            <h3 style={{fontSize: '18px'}}>PHIM ĐANG CHIẾU</h3>
                        </div>
                        <div className="article-movie-home">
                            <img
                                src="https://cdn.galaxycine.vn/media/2023/4/17/450wx300h_1681703427699.jpg"
                                className="loaded"
                                data-was-processed="true"
                            />
                            <a href="/dat-ve/lat-mat-6-tam-ve-dinh-menh">
                                <div className="decription-hover overlay">
                                    <div className="movies-content">
                                        <div className="group">
                                            <div className="secondary-white">Chi tiết</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div className="mt-2">
                                <div>
                                    <h6 className="text-secondary" style={{fontSize: '14px'}}>LẬT MẶT 6 : TẤM VÉ ĐỊNH MỆNH</h6>
                                </div>
                            </div>
                        </div>
                        <div className="article-movie-home">
                            <img
                                src="https://cdn.galaxycine.vn/media/2023/4/27/450x300_1682565516691.jpg"
                                className="loaded"
                                data-was-processed="true"
                            />
                            <a href="/dat-ve/lat-mat-6-tam-ve-dinh-menh">
                                <div className="decription-hover overlay">
                                    <div className="movies-content">
                                        <div className="group">
                                            <div className="secondary-white">Chi tiết</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div className="mt-2">
                                <div>
                                    <h6 className="text-secondary" style={{fontSize: '14px'}}>CON NHÓT MÓT CHỒNG</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Detail