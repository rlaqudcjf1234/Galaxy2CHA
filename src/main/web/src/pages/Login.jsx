import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

import {tokenDispatch} from "../redux/store"
import {setAccessToken} from "../redux/tokenSlice"

import {request as axios} from '../plugins/axios';

function Login() {
    const dispatch = tokenDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({email: "", password: "", remember: false});
    const [errors, setErrors] = useState({}); // 오류 내용

    const [loading, setLoading] = useState(false); // 로딩 상태

    const [cookies, setCookie, removeCookie] = useCookies(["autoStudent"]);

    useEffect(() => {
        if (cookies.autoStudent !== undefined) {
            setUser(cookies.autoStudent);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("/api/user/login", user, {withCredentials:true});

            /** 자동 확인 */
            if (user.remember) {
                setCookie("autoStudent", user, {
                    path: "/",
                    expires: new Date(Date.now() + 604800000)
                })
            } else {
                removeCookie("autoStudent");
            }
            
            dispatch(setAccessToken(response.headers.authorization));

            navigate("/");
        } catch (error) {
            const response = error.response;
            if (response && response.data) {
                setErrors(response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleCheck = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.checked
        })
    }

    return (
        <div style={{minHeight: "75vh"}}>
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
                    transform: "translate(-50%, -50%)"
                }}>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center mb-4">로그인</h2>

                    {/* 이메일 입력 */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            이메일
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required="required"/>
                        <div className="invalid-feedback">
                            {errors.email}
                        </div>
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
                            onChange={handleChange}
                            required="required"/>
                        <div className="invalid-feedback">
                            {errors.password}
                        </div>
                    </div>

                    {/* 로그인 정보 기억하기 */}
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="remember"
                            name="remember"
                            checked={user.remember}
                            onChange={handleCheck}/>
                        <label htmlFor="remember" className="form-check-label">
                            로그인 정보 기억하기
                        </label>
                    </div>

                    {/* 버튼들 */}
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="submit">
                            로그인
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => alert("비밀번호 찾기 기능 준비 중입니다.")}>
                            비밀번호 찾기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
