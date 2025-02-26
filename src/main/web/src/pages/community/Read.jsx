import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { authenticatedRequest as axios } from "../../plugins/axios";
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
    const [tableType, setTableType] = useState(null);

    // URL 경로에서 타입 추출
    useEffect(() => {
        const path = location.pathname;
        let type, tblType;

        if (path.includes("/class/")) {
            type = "class";
            tblType = "CLASS";
        } else if (path.includes("/student/")) {
            type = "student";
            tblType = "STUDENT";
        } else if (path.includes("/postbox/")) {
            type = "postbox";
            tblType = "STUDENT";
        }

        setCommunityType(type);
        setTableType(tblType);
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
                    tableType: tableType,
                });

                // API 경로와 파라미터 수정
                const response = await axios.get(`/api/community/read/${seq}`, {
                    params: {
                        tableType: tableType,
                    },
                });

                console.log("서버 응답 원본:", response.data);

                // 응답 데이터 처리
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setPost(response.data[0]);
                } else {
                    setPost(response.data);
                }
            } catch (error) {
                console.error("Error details:", error);
                setError("게시글을 불러오는 중 오류가 발생했습니다");
            } finally {
                setLoading(false);
            }
        };

        if (seq && tableType) {
            fetchPost();
        }
    }, [seq, tableType]);

    const handleGoBack = () => {
        navigate(`/community/${communityType}`);
    };

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            // 단순화된 삭제 API 호출
            await axios.delete(`/api/community/delete/${seq}`, {
                params: { tableType },
            });

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
                    <h3 style={{ margin: "0", fontSize: "1.3rem" }}>{post?.TITLE || post?.title || "제목 없음"}</h3>
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
