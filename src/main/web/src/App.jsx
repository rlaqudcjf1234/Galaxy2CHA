import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Container from "./components/Container";

import Aftercare from './pages/aftercare/Aftercare';

import MyPage from "./pages/mypage/Mypage";

import ApplyStudent from "./pages/student/ApplyStudent";
import ApplyAdd from "./pages/student/ApplyAdd";
import ApplyList from "./pages/student/ApplyList";
import ApplyRead from "./pages/student/ApplyRead";
import SlideDetail from "../src/components/slidedetail"; // 추가된 부분

import ClassDetail from "./pages/class/Detail";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index="index" element={<Home />} />
                    <Route path="apply" element={<Container />}>
                        <Route index="index" element={<ApplyList />} />
                        <Route path="add" element={<ApplyAdd />} />
                        <Route path="read/:id" element={<ApplyRead />} />
                        <Route path="student" element={<ApplyStudent />} />
                    </Route>

                    <Route path="class/:lecture_seq/:seq" element={<Container />}>
                        <Route index="index" element={<ClassDetail />} />
                    </Route>
                        
                    <Route path="student">
                        <Route path="aftercare/:seq" element={<Container />}>
                            <Route index="index" element={<Aftercare />} />
                        </Route>
                    </Route>


                        <Route path="mypage" element={<Container />}>
                        <Route index="index" element={<MyPage />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;