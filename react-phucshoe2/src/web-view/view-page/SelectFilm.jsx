import React, { useState } from 'react';
import { Link } from "react-router-dom";

const films = [
    { id: 1, title: "Lật Mặt 6: Tấm Vé Định Mệnh" },
    { id: 2, title: "Vệ Binh Dải Ngân Hà 3" },
    { id: 3, title: "Sisu: Già Gân Báo Thù" },
    { id: 4, title: "Con Nhót Mót Chồng" },
    { id: 5, title: "Cô Bé Cứu Hỏa" },
    { id: 6, title: "Những Kẻ Thao Túng" },
    { id: 7, title: "Cơn Thịnh Nộ Từ Cõi Âm" },
    { id: 8, title: "Fast & Furious 10" },
    { id: 9, title: "Quái Vật Đen" },
    { id: 10, title: "Doraemon: Nobita Và Vùng Đất Lý Tưởng Trên Bầu Trời" },
    { id: 11, title: "Vương Hậu Margot" },
];

const dates = [
    { id: 1, text: '18/05/2023' },
    { id: 2, text: '19/05/2023' },
    { id: 3, text: '20/05/2023' },
    { id: 4, text: '21/05/2023' },
    { id: 5, text: '22/05/2023' },
    { id: 6, text: '23/05/2023' },
];

const timesItems = [
    { id: 1, text: '8:30' },
    { id: 2, text: '10:00' },
    { id: 3, text: '12:30' },
    { id: 4, text: '14:00' },
    { id: 5, text: '16:30' },
    { id: 6, text: '18:00' },
    { id: 7, text: '20:30' },
];

const filmDateTimes = [
    { filmId: 1, dateId: 1, times: [1, 4] },
    { filmId: 1, dateId: 2, times: [] },
    { filmId: 1, dateId: 3, times: [2, 6, 3, 4, 7] },
    { filmId: 1, dateId: 4, times: [1, 2, 6, 4, 5] },
    { filmId: 1, dateId: 5, times: [5, 7, 3, 4] },
    { filmId: 1, dateId: 6, times: [1, 2, 3, 4, 5, 6, 7] },

    { filmId: 2, dateId: 3, times: [1, 4] },
    { filmId: 2, dateId: 4, times: [] },
    { filmId: 2, dateId: 5, times: [2, 6, 3, 4, 7] },
    { filmId: 2, dateId: 6, times: [1, 2, 6, 4, 5] },
    { filmId: 2, dateId: 1, times: [5, 7, 3, 4] },
    { filmId: 2, dateId: 2, times: [1, 2, 3, 4, 5, 6, 7] },

    { filmId: 3, dateId: 2, times: [1, 4] },
    { filmId: 3, dateId: 3, times: [] },
    { filmId: 3, dateId: 4, times: [2, 6, 3, 4, 7] },
    { filmId: 3, dateId: 5, times: [1, 2, 6, 4, 5] },
    { filmId: 3, dateId: 6, times: [5, 7, 3, 4] },
    { filmId: 3, dateId: 1, times: [1, 2, 3, 4, 5, 6, 7] },

    { filmId: 4, dateId: 4, times: [1, 4] },
    { filmId: 4, dateId: 5, times: [] },
    { filmId: 4, dateId: 6, times: [2, 6, 3, 4, 7] },
    { filmId: 4, dateId: 1, times: [1, 2, 6, 4, 5] },
    { filmId: 4, dateId: 2, times: [5, 7, 3, 4] },
    { filmId: 4, dateId: 3, times: [1, 2, 3, 4, 5, 6, 7] },

    { filmId: 5, dateId: 5, times: [1, 4] },
    { filmId: 5, dateId: 6, times: [] },
    { filmId: 5, dateId: 1, times: [2, 6, 3, 4, 7] },
    { filmId: 5, dateId: 2, times: [1, 2, 6, 4, 5] },
    { filmId: 5, dateId: 3, times: [5, 7, 3, 4] },
    { filmId: 5, dateId: 4, times: [1, 2, 3, 4, 5, 6, 7] },

    { filmId: 6, dateId: 6, times: [1, 4] },
    { filmId: 6, dateId: 1, times: [] },
    { filmId: 6, dateId: 2, times: [2, 6, 3, 4, 7] },
    { filmId: 6, dateId: 3, times: [1, 2, 6, 4, 5] },
    { filmId: 6, dateId: 4, times: [5, 7, 3, 4] },
    { filmId: 6, dateId: 5, times: [1, 2, 3, 4, 5, 6, 7] },
];

const SelectFilm = () => {
    const [selectedFilm, setSelectedFilm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const renderAllFilm = () => {
        return films.map(it => (
            <div
                key={it.id}
                className={`item ${selectedFilm === it.id ? 'selected' : ''}`}
                onClick={() => onSelectFilm(it.id)}
            >
                {it.title}
            </div>
        ));
    };

    const renderDates = () => {
        return dates.map(it => (
            <div
                key={it.id}
                className={`item ${selectedDate === it.id ? 'selected' : ''}`}
                onClick={() => onSelectDate(it.id)}
            >
                {it.text}
            </div>
        ));
    };

    const renderTimes = () => {
        let times = [];
        if (selectedDate && selectedFilm) {
            times = filmDateTimes.find(item => item.filmId === selectedFilm && item.dateId === selectedDate)?.times || [];
        }
        return times.length ? (
            times.map(it => (
                <div
                    key={it}
                    className={`time-item ${selectedTime === it ? 'selected' : ''}`}
                    onClick={() => onSelectTime(it)}
                >
                    {timesItems.find(time => time.id === it).text}
                </div>
            ))
        ) : (
            <div className="no-times">Không có suất chiếu</div>
        );
    };

    const onSelectFilm = (filmId) => {
        setSelectedTime('');
        setSelectedFilm(filmId);
    };

    const onSelectDate = (dateId) => {
        setSelectedTime('');
        setSelectedDate(dateId);
    };

    const onSelectTime = (timeId) => {
        setSelectedTime(timeId);
    };

    return (
        <div className="container-lg" style={{
            marginTop: "20px"
        }}>
            <div className="select-film-wrapper" style={{ background: '#ff5000c7', padding: '15px' }}>
                <h3 className="title" style={{ color: '#fff', marginBottom: '20px' }}>Đặt vé</h3>
                <div className="row">
                    <div className="col-12 col-md-4 select-card">
                        <div className="content" style={{ background: '#fff', border: 'solid black 1px', paddingTop: '0px', height: '400px' }}>
                            <div className="title" style={{ borderBottom: 'solid black 1px', padding: '8px', color: 'white', marginBottom: 'unset', background: '#a5762aa1' }}>CHỌN PHIM</div>
                            <div className="option-items" style={{ padding: '12px', height: '300px', overflowY: 'auto', marginTop: '12px' }}>
                                {renderAllFilm()}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 select-card">
                        <div className="content" style={{ background: '#fff', border: 'solid black 1px', paddingTop: '0px', height: '400px' }}>
                            <div className="title" style={{ borderBottom: 'solid black 1px', padding: '8px', color: 'white', marginBottom: 'unset', background: '#a5762aa1' }}>CHỌN NGÀY CHIẾU</div>
                            <div className="option-items" style={{ padding: '12px', height: '300px', overflowY: 'auto', marginTop: '12px' }}>
                                {renderDates()}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 select-card">
                        <div className="content" style={{ background: '#fff', border: 'solid black 1px', paddingTop: '0px', height: '400px' }}>
                            <div className="title" style={{ borderBottom: 'solid black 1px', padding: '8px', color: 'white', marginBottom: 'unset', background: '#a5762aa1' }}>CHỌN SUẤT CHIẾU</div>
                            <div className="option-items" style={{ padding: '12px', height: '300px', overflowY: 'auto', marginTop: '12px' }}>
                                {renderTimes()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link className="d-flex m-auto mt-4 mb-4 btn" to="/selectPosition" style={{
                justifyContent: 'center', background: "rgba(255, 80, 0, 0.78)"
            }}>Đặt vé</Link>
        </div>
    );
};

export default SelectFilm;
