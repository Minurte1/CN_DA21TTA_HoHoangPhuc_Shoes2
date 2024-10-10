
const MovieConfirmation = () => {
    return (
        <div className="container shadow-movie bg-white mt-3">
            <div>
                <div className="row mx-0 pt-5 pb-5">
                    <div className="col-3">
                        <div className="detail-feat-img">
                            <img
                                src="https://cdn.galaxycine.vn/media/2023/5/10/300x450_1683702253803.jpg"
                                className="loaded img-hover"
                                alt="Movie poster"
                                style={{ width: '100%', height: 'auto' }} // Áp dụng style trực tiếp vào thẻ img
                            />
                        </div>
                    </div>
                    <div className="col-5 text-secondary">
                        <div style={{ background: '#f26b38', fontSize: "20px" }}>
                            <h3 className="text-white bg-movie py-2 text-center" style={{ color: 'white', fontSize: "20px", marginBottom: '0px' }}>
                                XÁC NHẬN ĐẶT VÉ
                            </h3>
                        </div>
                        <hr className="text-movie" />
                        <div className="detail-rating border border-2 p-3">
                            <div className="mt-2">
                                <table>
                                    <thead>
                                        <tr style={{ height: '39px' }}>
                                            <th className="text-secondary align-top" style={{ width: '120px' }}>Tên phim: </th>
                                            <td>THE BLACK DEMON (QUÁI VẬT ĐEN)</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ height: '39px' }}>
                                            <th className="text-secondary">Rạp: </th>
                                            <td>SCRN02</td>
                                        </tr>
                                        <tr style={{ height: '39px' }}>
                                            <th className="text-secondary">Ngày chiếu :</th>
                                            <td style={{ fontFamily: 'Roboto' }}>12/05/2023</td>
                                        </tr>
                                        <tr style={{ height: '39px' }}>
                                            <th className="text-secondary">Giờ chiếu: </th>
                                            <td>08:20</td>
                                        </tr>
                                        <tr style={{ height: '39px' }}>
                                            <th className="text-secondary">Ghế: </th>
                                            <td>B8-B9-B10-C10</td>
                                        </tr>
                                        <tr style={{ height: '39px' }}>
                                            <th className="text-secondary">Số lượng: </th>
                                            <td>4</td>
                                        </tr>
                                        <tr className="align-top">
                                            <th className="text-secondary">Giá: </th>
                                            <td>
                                                B8 : 45.000 đ <br />
                                                B9 : 45.000 đ <br />
                                                B10 : 45.000 đ <br />
                                                B11 : 45.000 đ <br />
                                            </td>
                                        </tr>
                                        <tr style={{ height: '50px' }}>
                                            <th className="text-secondary">Tổng: </th>
                                            <td style={{ width: '150px', color: 'lightcoral' }}>180.000 đ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span
                                                    type="button"
                                                    className="button-movie h-100"
                                                    style={{ width: '120px', background: 'rgb(242, 107, 56)', color: 'white', textAlign: 'center' }}
                                                >
                                                    Xác nhận
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 text-secondary">
                        <div style={{ background: "rgb(242, 107, 56)" }}>
                            <h3 className="text-white bg-movie py-2  text-center" style={{ fontSize: "20px", marginBottom: "0px" }} >
                                THÔNG TIN THÀNH VIÊN
                            </h3>
                        </div>
                        <hr className="text-movie" />
                        <div className="detail-rating border border-2 p-3 ">
                            <div>
                                <table>
                                    <thead>
                                        <tr style={{ height: '39px' }}>
                                            <th className="text-secondary">Mã thành viên: </th>
                                            <td>TV0000012</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ height: '39px' }}>
                                            <th className="text-secondary">CMND: </th>
                                            <td>191683823</td>
                                        </tr>
                                        <tr style={{ height: '39px' }}>
                                            <th className="text-secondary">Họ và tên: </th>
                                            <td>Hoàng Thị Như Quỳnh</td>
                                        </tr>
                                        <tr style={{ height: '39px' }}>
                                            <th className="text-secondary" style={{ width: '150px' }}>
                                                Điểm thành viên:
                                            </th>
                                            <td>280000</td>
                                        </tr>
                                        <tr style={{ height: '39px' }}>
                                            <th className="text-secondary">Đổi vé: </th>
                                            <td>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="inlineRadioOptions"
                                                        id="inlineRadio1"
                                                        defaultValue="option1"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="inlineRadio1"
                                                    >
                                                        0
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="inlineRadioOptions"
                                                        id="inlineRadio2"
                                                        defaultValue="option2"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="inlineRadio2"
                                                    >
                                                        1
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="inlineRadioOptions"
                                                        id="inlineRadio3"
                                                        defaultValue="option3"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="inlineRadio3"
                                                    >
                                                        2
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr style={{ verticalAlign: 'top' }}>
                                            <th className="text-secondary">Số điện thoại: </th>
                                            <td>0909333222</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieConfirmation;
