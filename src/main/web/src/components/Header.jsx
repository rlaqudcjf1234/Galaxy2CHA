import React from "react";
import { Link } from "react-router-dom";
import { persistor } from "../main";
import { tokenSelector } from "../redux/store";
import "../css/Header.css";
import Logo2 from "../img/Logo_hor1.png";
import Logo from "../img/Logo_hor2.png";

function Header() {
    const { val } = tokenSelector((state) => state.accessToken);
    const handleClick = async () => {
        await persistor.purge();
    };

    return (
        <header className="d-flex flex-wrap align-items-center justify-content-center p-3 mb-4 border-bottom">
            {/* 로고를 중앙에 놓고 싶다면 */}
            {/* <div className="d-flex flex-wrap align-items-center justify-content-center col-md-3 mb-2 mb-md-0"> */}
            <div className="col-md-3 mb-2 mb-md-0">
                <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                    <img src={Logo} alt="Desktop Logo" className="logo-desktop" style={{ height: "70px" }} />
                    <img src={Logo2} alt="Mobile Logo" className="logo-mobile" style={{ height: "70px" }} />
                </Link>
            </div>

            {val ? (
                <nav id="menu" className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <div className="menu-item">
                        <div className="menu-text">
                            <div className="sub-menu-holder"></div>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-text">
                            <Link to="/" className="nav-link px-2">
                                과정등록
                            </Link>
                        </div>
                        <div className="sub-menu">
                            <div className="box">
                                {[
                                    {
                                        label: "교육과정현황",
                                        path: "lecture",
                                    },
                                    {
                                        label: "학습안내서",
                                        path: "",
                                    },
                                    {
                                        label: "강의현황",
                                        path: "class",
                                    },
                                    {
                                        label: "시간표 현황",
                                        path: "",
                                    },
                                ].map((item, index) => (
                                    <Link key={index} to={`/${item.path}`}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="sub-menu-holder"></div>
                        </div>
                    </div>

                    <div className="menu-item">
                        <div className="menu-text">
                            <Link to="/apply" className="nav-link px-2">
                                학적부
                            </Link>
                        </div>
                        <div className="sub-menu">
                            <div className="box">
                                {[
                                    {
                                        label: "접수현황",
                                        path: "apply",
                                    },
                                    {
                                        label: "출석현황",
                                        path: "#",
                                    },
                                    {
                                        label: "자격증 안내",
                                        path: "#",
                                    },
                                    {
                                        label: "시간표 조회",
                                        path: "#",
                                    },
                                ].map((item, index) => (
                                    <Link key={index} to={`/${item.path}`}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="sub-menu-holder"></div>
                        </div>
                    </div>

                    <div className="menu-item">
                        <div className="menu-text">
                            <Link to="/Stats_Analysis" className="nav-link px-2">
                                사후관리
                            </Link>
                        </div>
                        <div className="sub-menu">
                            <div className="box">
                                {[
                                    {
                                        label: "통계 및 분석",
                                        path: "#",
                                    },
                                    {
                                        label: "사후관리 신청",
                                        path: "#",
                                    },
                                    {
                                        label: "진행 현황",
                                        path: "#",
                                    },
                                    {
                                        label: "사후관리 결과",
                                        path: "#",
                                    },
                                ].map((item, index) => (
                                    <Link key={index} to={`/${item.path}`}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="sub-menu-holder"></div>
                        </div>
                    </div>

                    <div className="menu-item">
                        <div className="menu-text">
                            <Link to="/survey" className="nav-link px-2">
                                설문평가
                            </Link>
                        </div>
                        {
                            <div className="sub-menu">
                                <div className="box">
                                    {[
                                        {
                                            label: "설문 참여내역",
                                            path: "#",
                                        },
                                        {
                                            label: "교원평가",
                                            path: "#",
                                        },
                                        {
                                            label: "설문 결과",
                                            path: "#",
                                        },
                                    ].map((item, index) => (
                                        <Link key={index} to={`/${item.path}`}>
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                                <div className="sub-menu-holder"></div>
                            </div>
                        }
                    </div>

                    <div className="menu-item">
                        <div className="menu-text">
                            <Link to="/Class_Community" className="nav-link px-2">
                                게시판
                            </Link>
                        </div>
                        <div className="sub-menu">
                            <div className="box">
                                {[
                                    {
                                        label: "반 별 게시판",
                                        path: "community/class",
                                    },
                                    {
                                        label: "학생 자유 게시판",
                                        path: "community/student",
                                    },
                                    {
                                        label: "건의함",
                                        path: "community/postbox",
                                    },
                                ].map((item, index) => (
                                    <Link
                                        key={index}
                                        to={`/${item.path}`}
                                        onClick={(e) => {
                                            e.preventDefault(); // 기본 Link 동작 방지
                                            window.location.href = `/${item.path}`;
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="sub-menu-holder"></div>
                        </div>
                    </div>
                </nav>
            ) : null}
            {val ? (
                <div className="col-md-3 text-end">
                    <button type="button" className="btn btn-outline-primary me-2" onClick={handleClick}>
                        Logout
                    </button>
                </div>
            ) : (
                <div className="col-md-3 text-end">
                    <Link to="/login" className="btn btn-outline-primary me-2">
                        Login
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;
