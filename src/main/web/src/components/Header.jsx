import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/Header.css';

function Header() {





  
    return (
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-3 mb-4 border-bottom">
            <div className="col-md-3 mb-2 mb-md-0">
                <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none" style={{ fontSize: "2rem", marginLeft: "50px"}}>
                    {"홈페이지 제목인데 미정이임 ㅇㅇ"}
                </Link>
            </div>
            

            <nav id="menu" className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/notice" className="nav-link px-2">학습안내</Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {[
                                { label: "공지사항", path: "Notice" },
                                { label: "상담(분리? 몰?루)", path: "Counsel" },
                                { label: "강의계획서", path: "Lecture_Plan" },
                                { label: "과정신청", path: "Apply" }
                            ].map((item, index) => (
                                <Link key={index} to={`/${item.path}`}>{item.label}</Link>
                            ))}
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/Lec_Notice" className="nav-link px-2">과정정보</Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {[
                                { label: "공지사항", path: "Lec_Notice" },
                                { label: "출석현황", path: "Chulseog" },
                                { label: "자격증 안내", path: "Qualification_Info" },
                                { label: "시간표 조회", path: "Timetable" }
                            ].map((item, index) => (
                                <Link key={index} to={`/${item.path}`}>{item.label}</Link>
                            ))}
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/Stats_Analysis" className="nav-link px-2">사후관리</Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {[
                                { label: "통계 및 분석", path: "Stats_Analysis" },
                                { label: "사후관리 신청", path: "Aftercare_Apply" },
                                { label: "진행 현황", path: "Aftercare_Progress" },
                                { label: "사후관리 결과", path: "Aftercare_Results" }
                            ].map((item, index) => (
                                <Link key={index} to={`/${item.path}`}>{item.label}</Link>
                            ))}
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/Survey_YN" className="nav-link px-2">설문평가</Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {[
                                { label: "설문 참여내역", path: "Survey_YN" },
                                { label: "교원평가", path: "Admin_Survey" },
                                { label: "설문 결과", path: "Survey_Results" }
                            ].map((item, index) => (
                                <Link key={index} to={`/${item.path}`}>{item.label}</Link>
                            ))}
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <Link to="/Class_Community" className="nav-link px-2">게시판</Link>
                    </div>
                    <div className="sub-menu">
                        <div className="box">
                            {[
                                { label: "과정별 게시판", path: "Class_Community" },
                                { label: "공지사항", path: "Community_Notice" },
                                { label: "Q&A", path: "QNA" }
                            ].map((item, index) => (
                                <Link key={index} to={`/${item.path}`}>{item.label}</Link>
                            ))}
                        </div>
                        <div className="sub-menu-holder"></div>
                    </div>
                </div>
            </nav>

            <div className="col-md-3 text-end">
                <button type="button" className="btn btn-outline-primary me-2">Login</button>
                <button type="button" className="btn btn-primary">Sign-up</button>
            </div>
        </header>
    );
}

export default Header;