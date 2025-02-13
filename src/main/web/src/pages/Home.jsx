import React from 'react';
import Slider from '../components/Slider';
import CardSection from '../components/CardSection';
import TabMenu from '../components/TabMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css';

const mainSliderData = [
    { id: 1, title: 'Main Slide 1', date: '2025년 01월', organization: 'Main', imageUrl: '/api/placeholder/1200/400' },
    { id: 2, title: 'Main Slide 2', date: '2025년 02월', organization: 'Main', imageUrl: '/api/placeholder/1200/400' },
    { id: 3, title: 'Main Slide 3', date: '2025년 03월', organization: 'Main', imageUrl: '/api/placeholder/1200/400' },
    { id: 4, title: 'Main Slide 4', date: '2025년 04월', organization: 'Main', imageUrl: '/api/placeholder/1200/400' },
    { id: 5, title: 'Main Slide 5', date: '2025년 05월', organization: 'Main', imageUrl: '/api/placeholder/1200/400' },
];

const courseSliderData = [
    { id: 1, title: 'RedHat/AWS 하이브리드 클라우드 [5기]', date: '04월 29일 개강', organization: '중흥본원', imageUrl: '/api/placeholder/300/200' },
    { id: 2, title: 'GPT-JAVA 풀스택 [12기]', date: '02월 25일 개강', organization: '중흥본원', imageUrl: '/api/placeholder/300/200' },
    { id: 3, title: 'React.js 프론트엔드 개발자 과정 [3기]', date: '05월 20일 개강', organization: '중흥본원', imageUrl: '/api/placeholder/300/200' },
    { id: 4, title: 'Spring Boot 실전 개발자 과정 [8기]', date: '05월 15일 개강', organization: '중흥본원', imageUrl: '/api/placeholder/300/200' },
    { id: 5, title: 'Python 데이터 분석 [6기]', date: '06월 10일 개강', organization: '중흥본원', imageUrl: '/api/placeholder/300/200' },
    { id: 6, title: 'AI 딥러닝 전문가 과정 [2기]', date: '07월 05일 개강', organization: '중흥본원', imageUrl: '/api/placeholder/300/200' },
];

const classSliderData = [
    { id: 1, title: 'RedHat/AWS 하이브리드 클라우드 [5기]', date: '04월 29일 개강', organization: '중흥본원', imageUrl: '/api/placeholder/300/200' },
    { id: 2, title: 'GPT-JAVA 풀스택 [12기]', date: '02월 25일 개강', organization: '중흥본원', imageUrl: '/api/placeholder/300/200' },
    { id: 3, title: 'React.js 프론트엔드 개발자 과정 [3기]', date: '05월 20일 개강', organization: '중흥본원', imageUrl: '/api/placeholder/300/200' },
    { id: 4, title: 'Spring Boot 실전 개발자 과정 [8기]', date: '05월 15일 개강', organization: '중흥본원', imageUrl: '/api/placeholder/300/200' },
    { id: 5, title: 'Python 데이터 분석 [6기]', date: '06월 10일 개강', organization: '중흥본원', imageUrl: '/api/placeholder/300/200' },
    { id: 6, title: 'AI 딥러닝 전문가 과정 [2기]', date: '07월 05일 개강', organization: '중흥본원', imageUrl: '/api/placeholder/300/200' },
];

function Home() {
    return (
        <div className="home-container">
            <section className="main-slider">
                <h2 className="text-center mb-4">메인 슬라이더</h2>
                <Slider items={mainSliderData} />
            </section>
            <section className="course-slider">
                <h2 className="text-center mb-4">강좌 슬라이더</h2>
                <Slider items={courseSliderData} />
            </section>
            <section className="course-slider">
                <h2 className="text-center mb-4">강의 슬라이더</h2>
                <Slider items={classSliderData} />
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
