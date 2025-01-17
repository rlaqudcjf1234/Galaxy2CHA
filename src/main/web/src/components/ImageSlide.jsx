// components/ImageSlide.jsx
import React, { useState, useEffect } from 'react';
import '../css/ImageSlide.css';

function ImageSlide() {
    // 슬라이드 데이터 배열을 관리합니다
    const slides = [
        { color: '#FF0000', name: 'Red' },
        { color: '#FFA500', name: 'Orange' },
        { color: '#FFFF00', name: 'Yellow' },
        { color: '#008000', name: 'Green' },
        { color: '#0000FF', name: 'Blue' },
        { color: '#4B0082', name: 'Indigo' },
        { color: '#800080', name: 'Purple' }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => 
                prevSlide === slides.length - 1 ? 0 : prevSlide + 1
            );
        }, 10000);

        return () => clearInterval(timer);
    }, []);

    const changeSlide = (direction) => {
        setCurrentSlide((prevSlide) => {
            if (direction === 'prev') {
                return prevSlide === 0 ? slides.length - 1 : prevSlide - 1;
            }
            return prevSlide === slides.length - 1 ? 0 : prevSlide + 1;
        });
    };

    return (
        <div className="slider-container">
            <button className="slider-button prev" onClick={() => changeSlide('prev')}>
                &larr;
            </button>
            
            <div className="slides-wrapper">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{
                            backgroundColor: slide.color,
                            transform: `translateX(${(index - currentSlide) * 100}%)`
                        }}
                    >
                        <h3>{slide.name}</h3>
                    </div>
                ))}
            </div>

            <button className="slider-button next" onClick={() => changeSlide('next')}>
                &rarr;
            </button>
        </div>
    );
}

export default ImageSlide;