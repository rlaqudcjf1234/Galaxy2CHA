import React from 'react';
import Slick from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Slider({ items, type }) {
    const navigate = useNavigate();
    // items가 객체이거나 undefined인 경우를 처리
    const itemsArray = items ? (Array.isArray(items) ? items : [items]) : [];

    const settings = {
        dots: true,
        infinite: itemsArray.length > 3,
        speed: 500,
        slidesToShow: type === 'main' ? 1 : 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: type === 'main' ? 1 : 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handleSlideClick = (item) => {
        navigate(`/slide/${type}/${item.LECTURE_SEQ}`);
    };

    return (
        <div className={`slider-container ${type}-slider`}>
            <Slick {...settings}>
                {itemsArray.map((item, index) => (
                    <div 
                        key={index} 
                        className="slide-item"
                        onClick={() => handleSlideClick(item)}
                    >
                        <div className="slide-content">
                            <h3>{item.DIVISION || 'No Division'}</h3>
                            <p className="round">Round: {item.ROUND || 'N/A'}</p>
                            <p className="lecture-seq">Lecture Seq: {item.LECTURE_SEQ || 'N/A'}</p>
                        </div>
                    </div>
                ))}
            </Slick>
        </div>
    );
}

export default Slider;