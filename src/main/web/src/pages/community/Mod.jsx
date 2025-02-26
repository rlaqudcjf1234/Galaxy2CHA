import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { authenticatedRequest as axios } from "../../plugins/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Community.css";

function Mod() {
    const navigate = useNavigate();
    const { seq } = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [communityType, setCommunityType] = useState(null);
    const [formData, setFormData] = useState({
        seq: seq,
        title: "",
        division: "",
        detail: "",
        tableType: "",
    });

    // URL 경로에서 타입 추출
    useEffect(() => {
        const path = location.pathname;
        let type, tableType;

        if (path.includes("/class/")) {
            type = "class";
            tableType = "CLASS";
        } else if (path.includes("/student/")) {
            type = "student";
            tableType = "STUDENT";
        } else if (path.includes("/postbox/")) {
            type = "postbox";
            tableType = "STUDENT"; // postbox도 STUDENT 테이블 사용
        }

        setCommunityType(type);
        setFormData((prev) => ({ ...prev, tableType }));
    }, [location]);

    // 사용자 인증 확인
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get("/api/community/auth/me");
                // 성공 - 인증됨
            } catch (error) {
                console.error("인증 오류:", error);
                alert("로그인이 필요합니다");
                navigate("/login");
            }
        };

        checkAuth();
    }, [navigate]);

    // 기존 게시글 데이터 로드
    useEffect(() => {
        const fetchPost = async () => {
            try {
                // tableType 파라미터 추가
                const response = await axios.get(`/api/community/read/${seq}`, {
                    params: { tableType: formData.tableType },
                });

                console.log("게시글 데이터:", response.data);

                const post = Array.isArray(response.data) ? response.data[0] : response.data;

                setFormData((prev) => ({
                    ...prev,
                    title: post.title || post.TITLE || "",
                    division: post.division || post.DIVISION || "",
                    detail: post.detail || post.DETAIL || "",
                }));
                setLoading(false);
            } catch (error) {
                console.error("게시글 로드 오류:", error);
                alert("게시글을 불러오는데 실패했습니다.");
                navigate(-1);
            }
        };

        if (communityType && seq && formData.tableType) {
            fetchPost();
        }
    }, [communityType, seq, formData.tableType, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 토큰 확인 로직 추가
    const checkToken = async () => {
        try {
            const response = await axios.get("/api/community/auth/me");
            console.log("인증 상태:", response.data);
            return true;
        } catch (error) {
            console.error("인증 오류:", error);
            alert("로그인이 필요합니다");
            navigate("/login");
            return false;
        }
    };

    // 제출 처리 함수 수정
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("수정 요청 데이터:", formData);

            // tableType을 URL 쿼리 파라미터로 전달
            await axios.put(`/api/community/read/${seq}?tableType=${formData.tableType}`, {
                seq: formData.seq,
                title: formData.title,
                division: formData.division,
                detail: formData.detail,
            });

            alert("게시글이 수정되었습니다.");
            navigate(`/community/${communityType}/read/${seq}`);
        } catch (error) {
            console.error("게시글 수정 오류:", error);
            alert("게시글 수정에 실패했습니다.");
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (loading) {
        return <div className="text-center p-4">로딩 중...</div>;
    }

    return (
        <div className="board-container">
            <div className="board-header">
                <h2>게시글 수정</h2>
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
                                    {communityType === "class" && (
                                        <>
                                            <option value="공지">공지</option>
                                            <option value="일반">일반</option>
                                            <option value="질문">질문</option>
                                        </>
                                    )}
                                    {communityType === "student" && (
                                        <>
                                            <option value="공지">공지</option>
                                            <option value="일반">일반</option>
                                            <option value="유머">유머</option>
                                        </>
                                    )}
                                    {communityType === "postbox" && (
                                        <>
                                            <option value="건의">건의</option>
                                            <option value="문의">문의</option>
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
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="button" onClick={handleCancel} className="btn btn-danger">
                        취소
                    </button>
                    <button type="submit" className="btn btn-primary">
                        완료
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Mod;
