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
    const [isAuthor, setIsAuthor] = useState(false);

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

    // 게시글 데이터 로드
    useEffect(() => {
        const fetchPostData = async () => {
            if (!seq || !tableType) {
                console.log("seq 또는 tableType이 없습니다:", { seq, tableType });
                return; // 아직 초기화 중이므로 리턴
            }

            setLoading(true);
            try {
                console.log("게시글 조회 요청:", { seq, tableType });
                const response = await axios.get(`/api/community/read/${seq}`, {
                    params: { tableType }
                });

                console.log("게시글 응답:", response.data);

                // 응답 데이터 처리
                const postData = Array.isArray(response.data) ? response.data[0] : response.data;
                setPost(postData);

                // 작성자 확인 API 호출은 게시글 데이터가 있는 경우에만
                if (postData) {
                    try {
                        const authorCheckResponse = await axios.get(`/api/community/check-author/${seq}`, {
                            params: { tableType }
                        });
                        setIsAuthor(authorCheckResponse.data.isAuthor);
                    } catch (error) {
                        console.error("작성자 확인 오류:", error);
                        // 작성자 확인 실패 시 기본적으로 false로 설정
                        setIsAuthor(false);
                    }
                }
            } catch (error) {
                console.error("게시글 조회 오류:", error);
                setError("게시글을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        // tableType이 설정된 경우에만 데이터 로드
        if (tableType) {
            fetchPostData();
        }
    }, [seq, tableType]);

    const handleGoBack = () => {
        navigate(`/community/${communityType}`);
    };

    const handleDelete = async () => {
        if (!isAuthor) {
            alert("자신이 작성한 게시글만 삭제할 수 있습니다.");
            return;
        }

        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`/api/community/read/${seq}`, {
                params: { tableType },
            });

            alert("게시글이 삭제되었습니다.");
            handleGoBack();
        } catch (error) {
            console.error("Error:", error);
            if (error.response && error.response.status === 403) {
                alert("자신이 작성한 게시글만 삭제할 수 있습니다.");
            } else {
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    const handleMod = () => {
        if (!isAuthor) {
            alert("자신이 작성한 게시글만 수정할 수 있습니다.");
            return;
        }

        navigate(`/community/${communityType}/edit/${seq}`);
    };

    if (loading) {
        return <div className="text-center p-4">로딩 중...</div>;
    }

    if (error) {
        return <div className="text-center p-4">{error}</div>;
    }

    if (!post) {
        return <div className="text-center p-4">게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="board-container">
            <div className="board-header">
                <h2>게시글 상세</h2>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
                    {/* 디버깅용 정보 (문제 해결 후 삭제) */}
                    <p>seq: {seq}, tableType: {tableType}, isAuthor: {isAuthor ? 'true' : 'false'}</p>
                </div>
            </div>

            <div className="post-detail" style={{ border: "1px solid #ddd", borderRadius: "4px" }}>
                <div
                    style={{
                        borderBottom: "2px solid #0066cc",
                        padding: "20px",
                        backgroundColor: "#f8f9fa",
                    }}
                >
                    <h3 style={{ margin: "0", fontSize: "1.3rem" }}>{post?.title || post?.TITLE || "제목 없음"}</h3>
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
                        <strong>구분:</strong> {post.division || post.DIVISION || "미분류"}
                    </div>
                    <div style={{ marginRight: "20px" }}>
                        <strong>작성자:</strong> {post.author || post.AUTHOR || "이름 정보 없음"}
                    </div>
                    <div>
                        <strong>작성일:</strong> {post.regDt || post.REG_DT || "날짜 정보 없음"}
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
                    {post.detail || post.DETAIL}
                </div>
            </div>

            <div className="d-flex justify-content-center gap-2 mt-4" style={{ gap: "0.5rem" }}>
                <button className="btn btn-dark" onClick={handleGoBack}>
                    목록
                </button>

                {/* 작성자인 경우에만 수정/삭제 버튼 표시 */}
                {isAuthor && (
                    <>
                        <button className="btn btn-primary" onClick={handleMod}>
                            수정
                        </button>
                        <button className="btn btn-danger" onClick={handleDelete}>
                            삭제
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Read;