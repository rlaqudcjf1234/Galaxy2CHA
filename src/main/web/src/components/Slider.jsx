import React from 'react';
import Slick from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Slider.css';
import Sweng from '../img/SwEng.png';
import BigData from '../img/BIGDATA.png';
import ITsystem from '../img/ITSYSTEM.png';

function Slider({ items, type }) {
    const navigate = useNavigate();
    const itemsArray = items ? (Array.isArray(items) ? items : [items]) : [];

    const getDefaultTitle = (type) => {
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
            case 'IT시스템관리':
                return ITsystem;
            case '빅데이터분석':
                return BigData;
            case '응용SW엔지니어링':
                return Sweng;
            default:
                return '/images/default-course.jpg';
        }
    };

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
        navigate(`/class/${item.LECTURE_SEQ}/${item.SEQ}`);
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
                        <div className="slide-image-wrapper">
                            <img
                                src={getLectureImage(item.DIVISION)}
                                alt={item.DIVISION || '강의 이미지'}
                                className="slide-image"
                            />
                        </div>
                        <div className="slide-content">
                            <div className="content-title">
                                <h3>{item.DIVISION || 'No Division'}</h3>
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