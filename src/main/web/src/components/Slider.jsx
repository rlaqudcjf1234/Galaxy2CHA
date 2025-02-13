import React, { useState, useEffect } from 'react';
import '../css/Slider.css';

const Slider = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const totalSlides = items.length;

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isAnimating) {
                nextSlide();
            }
        }, 3000);

        return () => clearInterval(timer);
    }, [currentIndex, isAnimating]);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const getVisibleSlides = () => {
        const slides = [];
        for (let i = 0; i < 4; i++) {
            const index = (currentIndex + i) % totalSlides;
            slides.push(items[index]);
        }
        return slides;
    };

    return (
        <div className="slider-container">
            <button className="slider-button prev" onClick={prevSlide}>
                ←
            </button>
            <div className="slider-wrapper">
                <div 
                    className="slider-content"
                    style={{
                        transform: `translateX(0%)`,
                        transition: isAnimating ? 'transform 0.5s ease-in-out' : 'none'
                    }}
                >
                    {getVisibleSlides().map((item, index) => (
                        <div className="slide" key={`${item.id}-${index}`}>
                            <div className="slide-inner">
                                <img src={item.imageUrl} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>{item.date} · {item.organization}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="slider-button next" onClick={nextSlide}>
                →
            </button>
        </div>
    );
};

export default Slider;