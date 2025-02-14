import React from 'react';
import Slick from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Slider.css';

function Slider({ items, type }) {
    const navigate = useNavigate();
    const itemsArray = items ? (Array.isArray(items) ? items : [items]) : [];

    const getDefaultTitle = (type) => {
        switch(type) {
            case 'main':
                return 'K디지털트레이닝';
            case 'course':
                return '국가기간전략사업직종훈련';
            case 'class':
                return '근로자직업능력개발훈련';
            default:
                return '';
        }
    };

    // 수정된 제목 가져오기 로직
    const getSliderTitle = () => {
        const categoryMap = {
            'main': 'k_digital',
            'course': 'k_training',
            'class': 'k_worker'
        };
        const matchingItem = itemsArray.find(item => item.CATEGORY === categoryMap[type]);
        return matchingItem?.SLIDER_TITLE || getDefaultTitle(type);
    };

    const sliderTitle = getSliderTitle();

    const settings = {
        dots: true,
        infinite: itemsArray.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
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
            <h2 className="text-center mb-4">{sliderTitle}</h2>
            <Slick {...settings}>
                {itemsArray.map((item, index) => (
                    <div 
                        key={`${item.LECTURE_SEQ}-${index}`}
                        className="slide-item"
                        onClick={() => handleSlideClick(item)}
                    >
                        <div className="slide-content">
                            <h3>{item.DIVISION || 'No Division'}</h3>
                            <p className="round">{item.ROUND || 'N/A'} 회차 강의 입니다.</p>
                            <p className="lecture-seq">Lecture Seq: {item.LECTURE_SEQ || 'N/A'}</p>
                        </div>
                    </div>
                ))}
            </Slick>
        </div>
    );
}

export default Slider;