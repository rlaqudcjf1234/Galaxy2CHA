// pages/Home.jsx
import React from 'react';
import ImageSlide from '../components/ImageSlide';
import CardSection from '../components/CardSection';
import TabMenu from '../components/TabMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css'; 

function Home() {
    return (
        <div className="home-container">
            <h2 className="text-center mb-4">Home Page</h2>
            
            <div className="slide-container">
                <ImageSlide />
            </div>
            
            <div className="card-container">
                <CardSection />
            </div>

            <div className="TabMenu-container">
                <TabMenu />
            </div>
        </div>
    );
}

export default Home;