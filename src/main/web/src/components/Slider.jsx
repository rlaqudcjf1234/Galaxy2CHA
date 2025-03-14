import React from 'react';
import Slick from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Slider.css';
import Sweng from '../img/SwEng.png';
import BigData from '../img/BIGDATA.png';
import ITsystem from '../img/ITSYSTEM.png';
import UiUxEng from '../img/UIUXENG.png'

function Slider({ items, type }) {
    const navigate = useNavigate();

    const sliderTitle = () => {
        switch (type) {
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
    const itemsArray = items.filter((item) => {
        const categoryMap = {
            'main': 'k_digital',
            'course': 'k_training',
            'class': 'k_worker'
        };
        return item?.CATEGORY == categoryMap[type]
    });

    // 날짜 포맷 함수
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const getLectureImage = (division) => {
        switch (division) {
            case 'it_system':
                return ITsystem;
            case 'bigdata':
                return BigData;
            case 'sw_engine':
                return Sweng;
            case 'ux_engine':
                return UiUxEng;
            default:
                return '/images/default-course.jpg';
        }
    };

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
        navigate(`/class/${item.LECTURE_SEQ}/${item.SEQ}`);
    };

    return (
        <div className={`slider-container ${type}-slider`}>
            <h2 className="text-start mb-2"><strong>{sliderTitle()}</strong></h2>
            <Slick {...settings}>
                {itemsArray.map((item, index) => (
                    <div
                        key={`${item.LECTURE_SEQ}-${index}`}
                        className="slide-item"
                        onClick={() => handleSlideClick(item)}
                    >
                        <div className="slide-image-wrapper">
                            <img
                                src={getLectureImage(item.DIVISION)}
                                alt={item.DIVISION_NAME || '강의 이미지'}
                                className="slide-image"
                            />
                        </div>
                        <div className="slide-content">
                            <div className="content-title">
                                <h3>{item.NAME}</h3>
                                <p className="round">{item.ROUND || 'N/A'} 회차</p>
                            </div>
                            <div className="content-details">
                                <p className="start-date">개강일: {formatDate(item.START_DT)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slick>
        </div>
    );
}

export default Slider;