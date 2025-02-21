import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Community.css";

function Read() {
    const { seq } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [communityType, setCommunityType] = useState(null);

    // URL 경로에서 타입 추출
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/class/")) {
            setCommunityType("class");
        } else if (path.includes("/student/")) {
            setCommunityType("student");
        }
    }, [location]);

    useEffect(() => {
        const fetchPost = async () => {
            if (!seq) {
                setLoading(false);
                setError("게시글 ID가 없습니다");
                return;
            }

            try {
                console.log("게시글 조회 요청:", {
                    seq: seq,
                    type: communityType,
                });

                // API 호출 경로 수정 - /api 추가
                const response = await axios.get(`/api/community/${communityType}/read/${seq}`, {
                    params: {
                        type: communityType,
                        tableType: communityType?.toUpperCase(),
                    },
                });

                console.log("서버 응답 원본:", response.data);
                console.log("응답 데이터 타입:", typeof response.data);
                // 배열인 경우 첫 번째 항목 확인
                if (Array.isArray(response.data) && response.data.length > 0) {
                    console.log("첫 번째 항목:", response.data[0]);
                    setPost(response.data[0]); // 배열의 첫 번째 항목을 사용
                } else {
                    setPost(response.data);
                }
                // if (response.data) {
                //     setPost(response.data);
                // } else {
                //     setError("게시글이 존재하지 않습니다");
                // }
            } catch (error) {
                console.error("Error details:", error);
                console.error("Response data:", error.response?.data);
                setError("게시글을 불러오는 중 오류가 발생했습니다");
            } finally {
                setLoading(false);
            }
        };

        if (communityType) {
            fetchPost();
        }
    }, [seq, communityType]);

    const handleGoBack = () => {
        if (communityType === "class") {
            navigate(-1);
        } else if (communityType === "student") {
            navigate("/community/student");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`/api/community/${communityType}/read/${seq}`);
            alert("게시글이 삭제되었습니다.");
            handleGoBack();
        } catch (error) {
            console.error("Error:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    const handleMod = () => {
        navigate(`/community/${communityType}/edit/${seq}`);
    };

    if (loading) {
        return <div className="text-center p-4">로딩 중...</div>;
    }

    if (error || !post) {
        return <div className="text-center p-4">{error || "게시글을 찾을 수 없습니다."}</div>;
    }

    return (
        <div className="board-container">
            <div className="board-header">
                <h2>게시글 상세</h2>
            </div>

            <div className="post-detail" style={{ border: "1px solid #ddd", borderRadius: "4px" }}>
                <div
                    style={{
                        borderBottom: "2px solid #0066cc",
                        padding: "20px",
                        backgroundColor: "#f8f9fa",
                    }}
                >
                    <h3 style={{ margin: "0", fontSize: "1.3rem" }}>
                        {Array.isArray(post) && post.length > 0
                            ? post[0].TITLE || post[0].title
                            : post?.TITLE || post?.title || "제목 없음"}
                    </h3>
                </div>

                <div
                    style={{
                        display: "flex",
                        padding: "15px 20px",
                        borderBottom: "1px solid #ddd",
                        backgroundColor: "#fff",
                        fontSize: "1rem",
                        color: "#666",
                    }}
                >
                    <div style={{ marginRight: "20px" }}>
                        <strong>구분:</strong> {post.DIVISION || post.division || "미분류"}
                    </div>
                    <div style={{ marginRight: "20px" }}>
                        <strong>작성자:</strong> {post.AUTHOR || post.author || "이름 정보 없음"}
                    </div>
                    <div>
                        <strong>작성일:</strong> {post.REG_DT || post.regDt || post.reg_dt || "날짜 정보 없음"}
                    </div>
                </div>

                <div
                    style={{
                        padding: "30px 20px",
                        minHeight: "400px",
                        backgroundColor: "#fff",
                        whiteSpace: "pre-wrap",
                        fontSize: "17px",
                    }}
                >
                    {post.DETAIL || post.detail}
                </div>
            </div>

            <div className="d-flex justify-content-center gap-2 mt-4" style={{ gap: "0.5rem" }}>
                <button className="btn btn-dark" onClick={handleGoBack}>
                    목록
                </button>
                <button className="btn btn-primary" onClick={handleMod}>
                    수정
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                    삭제
                </button>
            </div>
        </div>
    );
}

export default Read;
