import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Community.css";
import { authenticatedRequest as axios } from "../../plugins/axios";

function Add({ type }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [communityType, setCommunityType] = useState(type || "student");
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        division: "",
        detail: "",
        tableType: type?.toUpperCase() || "STUDENT",
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("/api/community/auth/me");
                console.log("인증 정보:", response.data);
                // 성공 - 로그인됨
            } catch (error) {
                console.error("인증 오류:", error);
                alert("로그인이 필요합니다");
                navigate("/login");
            }
        };
        checkAuth();
    }, []);

    // 사용자 정보 조회
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("/api/community/auth/me");
                setUserInfo(response.data);
                console.log("사용자 정보:", response.data);
            } catch (error) {
                console.error("사용자 정보 조회 오류:", error);
                alert("사용자 정보를 불러오지 못했습니다.");
                navigate("/community");
            }
        };
        fetchUserInfo();
    }, [navigate]);

    // 커뮤니티 타입 설정
    useEffect(() => {
        const path = location.pathname;
        let newType;

        if (path.includes("/class")) {
            newType = "class";
            setCommunityType("class");
            setFormData((prev) => ({ ...prev, tableType: "CLASS" }));
        } else if (path.includes("/postbox")) {
            newType = "postbox";
            setCommunityType("postbox");
            setFormData((prev) => ({ ...prev, tableType: "STUDENT" }));
        } else {
            newType = "student";
            setCommunityType("student");
            setFormData((prev) => ({ ...prev, tableType: "STUDENT" }));
        }

        console.log("커뮤니티 타입 설정:", newType);
    }, [location.pathname, type]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            console.log("게시글 등록 요청 데이터:", formData);

            const response = await axios.post("/api/community/add", formData);

            alert("게시글이 성공적으로 등록되었습니다.");
            navigate(`/community/${communityType}`);
        } catch (error) {
            console.error("게시글 등록 오류:", error);
            alert(error.response?.data || "게시글 등록 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="ms-3">처리 중입니다...</p>
            </div>
        );
    }

    return (
        <div className="board-container">
            <div className="board-header">
                <h4>
                    {communityType === "class" ? "반 별" : communityType === "postbox" ? "건의함" : "학생 게시판"}{" "}
                    글쓰기
                </h4>
                {userInfo && <p>작성자: {userInfo.name} </p>}
            </div>

            <form onSubmit={handleSubmit}>
                <table className="board-table">
                    <tbody>
                        <tr>
                            <th>구분</th>
                            <td>
                                <select
                                    name="division"
                                    value={formData.division}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    style={{ width: "200px" }}
                                    required
                                >
                                    <option value="">선택해주세요</option>
                                    {communityType === "postbox" ? (
                                        <>
                                            <option value="건의">건의</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="일반">일반</option>
                                            {communityType === "class" && <option value="질문">질문</option>}
                                            {communityType === "student" && <option value="유머">유머</option>}
                                        </>
                                    )}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="제목을 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea
                                    name="detail"
                                    value={formData.detail}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    rows="10"
                                    placeholder="내용을 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="button" onClick={handleGoBack} className="btn btn-secondary">
                        이전으로
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                처리중...
                            </>
                        ) : (
                            "등록하기"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Add;
