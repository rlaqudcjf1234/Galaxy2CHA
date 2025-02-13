// ApplyStudent.js
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/Community.css";

const ApplyStudent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [studentInfo, setStudentInfo] = useState(null);
    const [items, setItems] = useState([]);

    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        jumin: "",
    });

    const handleUserAuth = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("/api/apply/student-info", {
                name: userForm.name,
                email: userForm.email,
                jumin: userForm.jumin,
            });

            if (response.data && response.data.id) {
                setIsAuthenticated(true);
                setStudentInfo(response.data);
                sessionStorage.setItem("studentAuth", "true");
                sessionStorage.setItem("studentInfo", JSON.stringify(response.data));
                fetchStudentData(userForm.email, userForm.name);
            } else {
                setError("입력하신 정보와 일치하는 지원서가 없습니다.");
            }
        } catch (error) {
            setError("조회 중 오류가 발생했습니다. 입력하신 정보를 다시 확인해주세요.");
        } finally {
            setLoading(false);
        }
    };

    const fetchStudentData = async (email, name) => {
        try {
            const response = await axios.get("/api/apply/list");
            if (response.data && Array.isArray(response.data.items)) {
                // 학생 본인의 지원서만 필터링
                const studentItems = response.data.items.filter((item) => item.EMAIL === email && item.NAME === name);
                setItems(studentItems);
            }
        } catch (error) {
            console.error("Error fetching student data:", error);
            setError("데이터 조회 중 오류가 발생했습니다.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleLogout = () => {
        sessionStorage.removeItem("studentAuth");
        sessionStorage.removeItem("studentInfo");
        setIsAuthenticated(false);
        setStudentInfo(null);
        setItems([]);
        setUserForm({ name: "", email: "", jumin: "" });
        navigate("/apply");
    };

    // 초기 인증 상태 확인
    useEffect(() => {
        const authStatus = sessionStorage.getItem("studentAuth");
        const storedInfo = sessionStorage.getItem("studentInfo");

        if (authStatus === "true" && storedInfo) {
            const info = JSON.parse(storedInfo);
            setIsAuthenticated(true);
            setStudentInfo(info);
            fetchStudentData(info.email, info.name);
        }
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-lg">로딩중...</div>
            </div>
        );
    }

    // 인증 전 화면
    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">지원서 조회</h2>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4 mb-4">
                            <div className="flex">
                                <div className="text-red-700">{error}</div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleUserAuth} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    이름
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={userForm.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    이메일
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={userForm.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="jumin" className="block text-sm font-medium text-gray-700">
                                    주민등록번호
                                </label>
                                <input
                                    id="jumin"
                                    name="jumin"
                                    type="password"
                                    required
                                    value={userForm.jumin}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    maxLength="14"
                                    placeholder="000000-0000000"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            {loading ? "처리중..." : "인증하기"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // 인증 후 리스트 화면
    return (
        <div>
            <div className="board-header">
                <div className="text-lg font-medium">{studentInfo?.name}님의 접수 목록</div>
                <button onClick={handleLogout} className="write-button">
                    돌아가기
                </button>
            </div>
            <table className="board-table">
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">성명</th>
                        <th scope="col">이메일</th>
                        <th scope="col">연락처</th>
                        <th scope="col">등록일자</th>
                        <th scope="col">등록여부</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <tr key={item.ID}>
                                <td>{item.RNUM}</td>
                                <td className="title">
                                    <Link to={`/apply/read/${item.ID}`}>{item.NAME}</Link>
                                </td>
                                <td>{item.EMAIL}</td>
                                <td>{item.PHONE}</td>
                                <td>{item.REG_DT}</td>
                                <td>{item.USE_YN}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                데이터가 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ApplyStudent;
