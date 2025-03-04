import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import Slider from '../components/Slider';
import CardSection from '../components/CardSection';
import TabMenu from '../components/TabMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css';

function Home() {
    const [slideData, setSlideData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // API를 호출하여 슬라이더 데이터를 가져옵니다
        fetch('/api/slide/read')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('서버 응답 데이터:', data);
                setSlideData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!slideData) return <div>No data available</div>;

    // 우리는 이제 데이터베이스에서 제목을 가져오므로, type prop은 단순히 슬라이더 스타일과 레이아웃을 위해서만 사용됩니다
    return (
        <div className="home-container">
            <HeroSlider />
            <div className="slider-wrapper px-2">
                <section className="main-slider">
                    <Slider items={slideData} type="main" />
                </section>
            </div>
            <div className="slider-wrapper px-2">
                <section className="course-slider">
                    <Slider items={slideData} type="course" />
                </section>
            </div>
            <div className="slider-wrapper px-2">
                <section className="course-slider">
                    <Slider items={slideData} type="class" />
                </section>
            </div>
        </div >
    );
}

export default Home;