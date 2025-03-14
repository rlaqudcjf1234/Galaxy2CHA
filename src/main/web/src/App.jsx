import "./App.css";

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Loding from "./components/Loding";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import { Container, PrivateCotainer } from "./components/Container";

import MyPage from "./pages/mypage/Mypage";

import ApplyAdd from "./pages/student/ApplyAdd";
import ApplyList from "./pages/student/ApplyList";
import ApplyRead from "./pages/student/ApplyRead";
import SlideDetail from "../src/components/slidedetail"; // 추가된 부분

import CommunityList from "./pages/community/List";
import CommunityAdd from "./pages/community/Add";
import CommunityRead from "./pages/community/Read";
import CommunityMod from "./pages/community/Mod";

import ClassDetail from "./pages/class/Detail";

import Calendar from "./pages/calendar/Calendar";

const SurveyList = lazy(() => import("./pages/survey/List"));
const SurveyRead = lazy(() => import("./pages/survey/Read"));

function App() {
    return (
        <Router>
            <Suspense fallback={<Loding />}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index="index" element={<Home />} />

                        <Route path="class/:lecture_seq/:seq" element={<Container />}>
                            <Route index="index" element={<ClassDetail />} />
                            <Route path="add" element={<ApplyAdd />} />
                        </Route>

                        <Route path="login" element={<Container />}>
                            <Route index="index" element={<Login />} />
                        </Route>
                        <Route path="apply" element={<PrivateCotainer />}>
                            <Route index="index" element={<ApplyList />} />

                            <Route path="read/:id" element={<ApplyRead />} />
                        </Route>

                        <Route path="calendar" element={<PrivateCotainer />}>
                            <Route index="index" element={<Calendar />} />
                        </Route>

                        <Route path="student">
                            <Route path="mypage" element={<PrivateCotainer />}>
                                <Route index element={<MyPage />} />
                            </Route>
                        </Route>

                        <Route path="community" element={<PrivateCotainer />}>
                            <Route index="index" element={<CommunityList />} /> {/* 클래스 커뮤니티 관련 라우트 */}
                            <Route path="class" element={<CommunityList type="class" />} />
                            <Route path="class/add" element={<CommunityAdd type="class" />} />
                            <Route path="class/read/:seq" element={<CommunityRead />} />
                            <Route path="class/edit/:seq" element={<CommunityMod />} />
                            {/* 학생 커뮤니티 관련 라우트 */}
                            <Route path="student" element={<CommunityList type="student" />} />
                            <Route path="student/add" element={<CommunityAdd type="student" />} />
                            <Route path="student/read/:seq" element={<CommunityRead />} />
                            <Route path="student/edit/:seq" element={<CommunityMod />} /> {/* 건의사항 POSTBOX */}
                            <Route path="postbox" element={<CommunityList type="postbox" />} />
                            <Route path="postbox/add" element={<CommunityAdd type="postbox" />} />
                            <Route path="postbox/read/:seq" element={<CommunityRead />} />
                            <Route path="postbox/edit/:seq" element={<CommunityMod />} />
                        </Route>

                        <Route path="survey" element={<PrivateCotainer />}>
                            <Route index="index" element={<SurveyList />} />
                            <Route path="read/:question_seq" element={<SurveyRead />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
