import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { tokenDispatch } from "../redux/store";
import { setAccessToken } from "../redux/tokenSlice";

import { request as axios } from "../plugins/axios";

function Login() {
    const dispatch = tokenDispatch();
    const navigate = useNavigate();

    // 로그인 모드 상태 (회원 또는 비회원)
    const [loginMode, setLoginMode] = useState("member");

    // 회원 로그인 폼
    const [user, setUser] = useState({ email: "", password: "", remember: false });

    // 비회원 로그인 폼
    const [guestUser, setGuestUser] = useState({ name: "", email: "", jumin: "" });

    const [errors, setErrors] = useState({}); // 오류 내용
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [cookies, setCookie, removeCookie] = useCookies(["autoStudent", "guest"]);

    useEffect(() => {
        if (cookies.autoStudent !== undefined && loginMode === "member") {
            setUser(cookies.autoStudent);
        }
    }, [cookies.autoStudent, loginMode]);

    // 회원 로그인 처리
    const handleMemberSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const response = await axios.post("/api/user/login", user, { withCredentials: true });

            /** 자동 확인 */
            if (user.remember) {
                setCookie("autoStudent", user, {
                    path: "/",
                    expires: new Date(Date.now() + 604800000),
                });
            } else {
                removeCookie("autoStudent");
            }

            dispatch(setAccessToken(response.headers.authorization));
            removeCookie("guest");
            navigate("/");
        } catch (error) {
            const response = error.response;
            if (response && response.data) {
                setErrors({ member: "일치하는 로그인 정보가 없습니다." });
            } else {
                setErrors({ member: "로그인 처리 중 오류가 발생했습니다." });
            }
        } finally {
            setLoading(false);
        }
    };

    // 비회원 로그인 처리
    const handleGuestSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const formData = new FormData(e.target);
            const response = await axios.post("/api/apply/guest", formData);

            dispatch(setAccessToken(response.headers.authorization));
            // 30분짜리 guest허용
            setCookie("guest", true, {
                path: "/",
                expires: new Date(Date.now() + 1800000),
            });
            navigate("/apply");
        } catch (error) {
            console.error("비회원 로그인 오류:", error);
            if (error.response?.status === 404) {
                setErrors({ guest: "입력하신 정보와 일치하는 지원서가 없습니다." });
            } else if (error.response?.data) {
                // 백엔드에서 문자열로 오류를 반환할 경우 처리
                if (typeof error.response.data === "string") {
                    setErrors({ guest: error.response.data });
                } else {
                    setErrors({ guest: "인증 처리 중 오류가 발생했습니다. 다시 시도해주세요." });
                }
            } else {
                setErrors({ guest: "인증 처리 중 오류가 발생했습니다. 다시 시도해주세요." });
            }
        } finally {
            setLoading(false);
        }
    };

    // 회원 로그인 입력 처리
    const handleMemberChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // 비회원 로그인 입력 처리
    const handleGuestChange = (e) => {
        setGuestUser({
            ...guestUser,
            [e.target.name]: e.target.value,
        });
    };

    // 자동 로그인 체크박스 처리
    const handleCheck = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.checked,
        });
    };

    // 비회원 로그인 폼 표시
    const showGuestLogin = () => {
        setLoginMode("guest");
        setErrors({});
    };

    // 회원 로그인 폼 표시
    const showMemberLogin = () => {
        setLoginMode("member");
        setErrors({});
    };

    return (
        <div style={{ minHeight: "75vh" }}>
            <div
                style={{
                    backgroundColor: "#f9f9f9",
                    boxShadow: "rgba(0, 0, 0.1, 0.1) 4px 4px 6px",
                    borderRadius: "8px",
                    width: "400px",
                    padding: "20px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                {/* 회원 로그인 폼 */}
                {loginMode === "member" && (
                    <form onSubmit={handleMemberSubmit}>
                        <h2 className="text-center mb-4">회원 로그인</h2>

                        {errors.member && <div className="alert alert-danger">{errors.member}</div>}

                        {/* 이메일 입력 */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                아이디
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={user.email}
                                onChange={handleMemberChange}
                                required
                            />
                        </div>

                        {/* 비밀번호 입력 */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={user.password}
                                onChange={handleMemberChange}
                                required
                            />
                        </div>

                        {/* 로그인 정보 기억하기 */}
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="remember"
                                name="remember"
                                checked={user.remember}
                                onChange={handleCheck}
                            />
                            <label htmlFor="remember" className="form-check-label">
                                로그인 정보 기억하기
                            </label>
                        </div>

                        {/* 버튼들 */}
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? "로그인 중..." : "로그인"}
                            </button>
                            {/* <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={() => alert("비밀번호 찾기 기능 준비 중입니다.")}
                            >
                                비밀번호 찾기
                            </button> */}
                            <button className="btn btn-dark" type="button" onClick={showGuestLogin}>
                                수강신청 조회
                            </button>
                        </div>
                    </form>
                )}

                {/* 비회원 로그인 폼 */}
                {loginMode === "guest" && (
                    <form onSubmit={handleGuestSubmit}>
                        <h2 className="text-center mb-4">비회원 로그인</h2>

                        {errors.guest && <div className="alert alert-danger">{errors.guest}</div>}

                        {/* 이름 입력 */}
                        <div className="mb-3">
                            <label htmlFor="guest-name" className="form-label">
                                이름
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="guest-name"
                                name="name"
                                value={guestUser.name}
                                onChange={handleGuestChange}
                                placeholder="지원서에 등록한 이름"
                                required
                            />
                        </div>

                        {/* 이메일 입력 */}
                        <div className="mb-3">
                            <label htmlFor="guest-email" className="form-label">
                                이메일
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="guest-email"
                                name="email"
                                value={guestUser.email}
                                onChange={handleGuestChange}
                                placeholder="지원서에 등록한 이메일"
                                required
                            />
                        </div>

                        {/* 주민등록번호 입력 */}
                        <div className="mb-3">
                            <label htmlFor="guest-jumin" className="form-label">
                                주민등록번호
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="guest-jumin"
                                name="jumin"
                                value={guestUser.jumin}
                                onChange={handleGuestChange}
                                placeholder="'-' 없이 입력 (예: 0001013456789)"
                                maxLength="13"
                                required
                            />
                            <div className="form-text">지원서에 입력한 주민등록번호를 입력하세요.</div>
                        </div>

                        {/* 버튼들 */}
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? "인증 중..." : "지원서 조회하기"}
                            </button>
                            <button className="btn btn-secondary" type="button" onClick={showMemberLogin}>
                                회원 로그인으로
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;
