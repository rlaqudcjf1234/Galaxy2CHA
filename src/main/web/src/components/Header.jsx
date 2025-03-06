import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

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

    const [cookies, setCookie, removeCookie] = useCookies(["guest"]);

    return (
        <header className="d-flex flex-wrap align-items-center justify-content-center p-3 border-bottom">
            {/* 로고를 중앙에 놓고 싶다면 */}
            {/* <div className="d-flex flex-wrap align-items-center justify-content-center col-md-3 mb-2 mb-md-0"> */}
            <div className="col-md-3 mb-2 mb-md-0">
                <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                    <img src={Logo} alt="Desktop Logo" className="logo-desktop" style={{ height: "70px" }} />
                    <img src={Logo2} alt="Mobile Logo" className="logo-mobile" style={{ height: "70px" }} />
                </Link>
            </div>

            {(val && !cookies.guest) ? (
                <nav id="menu" className="nav col-md-4 col-md-auto mb-2 justify-content-center mb-md-0">
                    <div className="menu-item">
                        <div className="menu-text">
                            <Link to="/calendar" className="nav-link px-2">
                                출석 및 시간표
                            </Link>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-text">
                            <Link to="/survey" className="nav-link px-2">
                                설문평가
                            </Link>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-text">
                            <Link to="/community/class" className="nav-link px-2">
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
            ) : (
                <nav id="menu" className="nav col-md-4 col-md-auto mb-2 justify-content-center mb-md-0"></nav>
            )}
            {val ? (
                <div className="col-md-3 text-end">
                    {!cookies.guest ? (
                        <Link to="/student/mypage" className="btn btn-outline-primary me-2">
                            My Page
                        </Link>
                    ) : (
                        <Link to="/apply" className="btn btn-outline-primary me-2">
                            접수현황
                        </Link>
                    )}
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
