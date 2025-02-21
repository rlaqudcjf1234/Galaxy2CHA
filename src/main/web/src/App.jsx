import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Container from "./components/Container";

import MyPage from "./pages/mypage/Mypage";

import ApplyStudent from "./pages/student/ApplyStudent";
import ApplyAdd from "./pages/student/ApplyAdd";
import ApplyList from "./pages/student/ApplyList";
import ApplyRead from "./pages/student/ApplyRead";
import SlideDetail from "../src/components/slidedetail"; // 추가된 부분

import CommunityList from "./pages/community/List";
import CommunityAdd from "./pages/community/Add";
import CommunityRead from "./pages/community/Read";
import CommunityModify from "./pages/community/Mod";

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
                        <Route path="mypage/:seq" element={<Container />}>
                            <Route index="index" element={<MyPage />} />
                        </Route>
                    </Route>
                    <Route path="community" element={<Container />}>
                        <Route index="index" element={<CommunityList />} />

                        {/* 클래스 커뮤니티 관련 라우트 */}
                        <Route path="class/:classSeq" element={<CommunityList type="class" />} />
                        <Route path="class/:classSeq/add/:studentSeq" element={<CommunityAdd type="class" />} />
                        <Route path="class/read/:seq" element={<CommunityRead />} />
                        <Route path="class/edit/:seq" element={<CommunityModify />} />

                        {/* 학생 커뮤니티 관련 라우트 */}
                        <Route path="student" element={<CommunityList type="student" />} />
                        <Route path="student/add/:seq" element={<CommunityAdd type="student" />} />
                        <Route path="student/read/:seq" element={<CommunityRead />} />
                        <Route path="student/edit/:seq" element={<CommunityModify />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
