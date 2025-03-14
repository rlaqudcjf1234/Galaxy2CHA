import React, { useState, useEffect } from 'react';
import "../css/HeroSlider.css";
import heroslider1 from '../img/heroslider1.jpg';
import heroslider2 from '../img/heroslider2.jpg';
import heroslider3 from '../img/heroslider3.jpg';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            bgColor: '#4A90E2',
            image: heroslider1,
            // title: 'SOLDESK deepracer',
            // subtitle: '솔데스크 전경보기 →'
        },
        {
            id: 2,
            bgColor: '#50C878',
            image: heroslider2, 
            // title: '전문가 과정',
            // subtitle: '실무 중심 커리큘럼'
        },
        {
            id: 3,
            bgColor: '#E6A817',
            image: heroslider3, 
            // title: '취업 연계',
            // subtitle: '취업 성공을 위한 완벽한 준비'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 7000);

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    return (
        <div className="hero-slider-container">
            <div className="hero-slider-wrapper">
                <div 
                    className="hero-slider-track" 
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide) => (
                        <div 
                            key={slide.id} 
                            className="hero-slider-slide"
                            style={{ 
                                backgroundColor: slide.bgColor,
                                backgroundImage: `url(${slide.image})`, // 이미지 추가
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                        </div>
                    ))}
                </div>

                <button className="hero-slider-nav-button hero-slider-prev" onClick={goToPrevSlide}>
                    ‹
                </button>
                <button className="hero-slider-nav-button hero-slider-next" onClick={goToNextSlide}>
                    ›
                </button>

                <div className="hero-slider-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`hero-slider-indicator ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;