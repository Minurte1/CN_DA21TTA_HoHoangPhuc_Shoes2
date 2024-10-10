import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Danh sách vị trí ghế và trạng thái tương ứng
const positions = [
    {
        rowLabel: "A",
        positions: [0, 1, 2, 1, 2, 2, 1, 0, 1, 1, 2, 0, 0, 0],
    },
    {
        rowLabel: "B",
        positions: [0, 1, 2, 1, 2, 2, 1, 0, 1, 1, 2, 0, 0, 0],
    },
    {
        rowLabel: "C",
        positions: [0, 1, 2, 1, 2, 2, 1, 0, 1, 1, 2, 0, 0, 0],
    },
    {
        rowLabel: "D",
        positions: [0, 1, 2, 1, 2, 2, 1, 0, 1, 1, 2, 0, 0, 0],
    },
    {
        rowLabel: "E",
        positions: [0, 1, 2, 1, 2, 2, 1, 0, 1, 1, 2, 0, 0, 0],
    },
    {
        rowLabel: "F",
        positions: [0, 1, 2, 1, 2, 2, 1, 0, 1, 1, 2, 0, 0, 0],
    },
    {
        rowLabel: "G",
        positions: [0, 1, 2, 1, 2, 2, 1, 0, 1, 1, 2, 0, 0, 0],
    },
    {
        rowLabel: "H",
        positions: [0, 1, 2, 1, 2, 2, 1, 0, 1, 1, 2, 0, 0, 0],
    },
    {
        rowLabel: "I",
        positions: [0, 1, 2, 1, 2, 2, 1, 0, 1, 1, 2, 0, 0, 0],
    },
];

const positionStatus = {
    0: "unavailable",
    1: "available",
    2: "sell",
};

const SelectPosition = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (positionIndex) => {
        setSelectedSeats((prevSelectedSeats) => {
            const isSelected = prevSelectedSeats.includes(positionIndex);
            if (isSelected) {
                return prevSelectedSeats.filter((seat) => seat !== positionIndex);
            } else {
                return [...prevSelectedSeats, positionIndex];
            }
        });
    };

    useEffect(() => {
        // Code xử lý khi component được mount
    }, []);

    return (
        <div className="container-lg" style={{
            marginTop: "20px"
        }}>
            <div className="select-position-wrapper" style={{ background: "#ff5000c7", padding: "15px" }}>
                <h3 className="title" style={{ color: "#fff", marginBottom: "20px" }}>Chọn ghế</h3>
                <div className="d-flex" style={{ marginBottom: "20px" }}>
                    <label className="text-light" style={{ marginRight: "10px" }}>Số lượng ghế:</label>
                    <input type="text" style={{ width: "60px" }} className="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
                </div>
                <h4 className="title" style={{ color: "#fff", marginBottom: "20px" }}>Bạn đã chọn</h4>
                <div className="position-pick" style={{ background: "#fff", padding: "15px" }}>
                    {positions.map((row, rowIndex) => (
                        <div key={rowIndex} className="d-flex justify-content-around" style={{ marginBottom: "10px" }}>
                            <div className="row-label" style={{ border: "solid black 1px", width: "28px", height: "28px", display: "flex", justifyContent: "center", alignItems: "center" }}>{row.rowLabel}</div>
                            <div className="row-positions d-flex" style={{ gap: "6px" }}>
                                {row.positions.map((status, index) => (
                                    <div key={index} className={`position-item ${positionStatus[status]}`} onClick={() => handleSeatClick(index)}
                                        style={{
                                            width: "28px",
                                            height: "28px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "#fff",
                                            cursor: "pointer",
                                            borderRadius: "3px",
                                            backgroundColor: status === 1 ? "rgba(147, 155, 136, 0.5)" : status === 2 ? "red" : "rgb(44, 152, 215)",
                                            fontWeight: selectedSeats.includes(index) ? "bold" : "normal"
                                        }}>
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                            <div className="row-label" style={{ border: "solid black 1px", width: "28px", height: "28px", display: "flex", justifyContent: "center", alignItems: "center" }}>{row.rowLabel}</div>
                        </div>
                    ))}
                    <div className="col-4 m-auto text-center screen" style={{ borderBottom: "solid rgb(155, 168, 137) 4px" }}>Màn hình</div>
                    <div className="position-info row d-flex justify-content-center" style={{ marginTop: "32px !important" }}>
                        <div className="col-8 col-md-12 col-sm-12">
                            <div className="row" style={{ marginLeft: "100px" }}>
                                <div className="col-12 col-md-3 col-sm-6 d-flex align-items-center">
                                    <div className="selecting label" style={{ height: "20px", width: "20px", marginRight: "4px", background: "rgb(107, 165, 20)", borderRadius: "3px" }}></div>
                                    <span>Ghế đang chọn</span>
                                </div>
                                <div className="col-12 col-md-3 col-sm-6 d-flex align-items-center">
                                    <div className="sell label" style={{ height: "20px", width: "20px", marginRight: "4px", background: "red", borderRadius: "3px" }}></div>
                                    <span>Ghế đã bán</span>
                                </div>
                                <div className="col-12 col-md-3 col-sm-6 d-flex align-items-center">
                                    <div className="available label" style={{ height: "20px", width: "20px", marginRight: "4px", background: "rgba(147, 155, 136, 0.5)", borderRadius: "3px" }}></div>
                                    <span>Có thể chọn</span>
                                </div>
                                <div className="col-12 col-md-3 col-sm-6 d-flex align-items-center">
                                    <div className="unavailable label" style={{ height: "20px", width: "20px", marginRight: "4px", background: "rgb(44, 152, 215)", borderRadius: "3px" }}></div>
                                    <span>Không thể chọn</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4 mb-4 gap-2">
                <Link className="button-back d-flex btn btn btn-primary" to="./select-film.html" role="button">Quay lại</Link>
                <Link to='/ticker' className="d-flex btn btn-primary" type="button">Tiếp tục</Link>
            </div>
        </div>
    );
};

export default SelectPosition;
