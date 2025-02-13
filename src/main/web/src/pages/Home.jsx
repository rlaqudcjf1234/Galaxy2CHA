// Home.jsx
import React, { useState, useEffect } from 'react';
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

    return (
        <div className="home-container">
            <section className="main-slider">
                <h2 className="text-center mb-4">메인 슬라이더</h2>
                <Slider items={slideData} type="main" />
            </section>
            <section className="course-slider">
                <h2 className="text-center mb-4">강좌 슬라이더</h2>
                <Slider items={slideData} type="course" />
            </section>
            <section className="course-slider">
                <h2 className="text-center mb-4">강의 슬라이더</h2>
                <Slider items={slideData} type="class" />
            </section>
            <section className="card-section">
                <CardSection />
            </section>
            <section className="tab-menu-section">
                <TabMenu />
            </section>
        </div>
    );
}

export default Home;