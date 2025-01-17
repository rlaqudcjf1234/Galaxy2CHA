import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Container from './components/Container';
import Notice from './pages/student/Notice';
import Counsel from './pages/student/Counsel';
import Lecture_Plan from './pages/student/Lecture_Plan';
import Apply from './pages/student/Apply';
import Lec_Notice from './pages/student/Lec_Notice';
import Chulseog from './pages/student/Chulseog';
import Qualification_Info from './pages/student/Qualification_Info';
import Timetable from './pages/student/Timetable';
import Stats_Analysis from './pages/student/Stats_Analysis';
import Aftercare_Apply from './pages/student/Aftercare_Apply';
import Aftercare_Progress from './pages/student/Aftercare_Progress';
import Aftercare_Results from './pages/student/Aftercare_Results';
import Survey_YN from './pages/student/Survey_YN';
import Admin_Survey from './pages/student/Admin_Survey';
import Survey_Results from './pages/student/Survey_Results';
import Class_Community from './pages/student/Class_Community';
import Community_Notice from './pages/student/Community_Notice';
import QNA from './pages/student/QNA';
import WritePost from './pages/student/WritePost';
import {PostProvider} from './contexts/PostContext';

function App() {
    return (

        <PostProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />}/>
                        <Route path="/Notice" element={<Notice />}/>
                        <Route path="/Counsel" element={<Counsel />}/>
                        <Route path="/Lecture_Plan" element={<Lecture_Plan />}/>
                        <Route path="/Apply" element={<Apply />}/>
                        <Route path="/Lec_Notice" element={<Lec_Notice />}/>
                        <Route path="/Chulseog" element={<Chulseog />}/>
                        <Route path="/Qualification_Info" element={<Qualification_Info />}/>
                        <Route path="/Timetable" element={<Timetable />}/>
                        <Route path="/Stats_Analysis" element={<Stats_Analysis />}/>
                        <Route path="/Aftercare_Apply" element={<Aftercare_Apply />}/>
                        <Route path="/Aftercare_Progress" element={<Aftercare_Progress />}/>
                        <Route path="/Aftercare_Results" element={<Aftercare_Results />}/>
                        <Route path="/Survey_YN" element={<Survey_YN />}/>
                        <Route path="/Admin_Survey" element={<Admin_Survey />}/>
                        <Route path="/Survey_Results" element={<Survey_Results />}/>
                        <Route path="/Class_Community" element={<Class_Community />}/>
                        <Route path="/WritePost" element={<WritePost />}/>
                        <Route path="/Community_Notice" element={<Community_Notice />}/>
                        <Route path="/QNA" element={<QNA />}/>
                    </Route>
                </Routes>
            </Router>
        </PostProvider>
    );
}

export default App;