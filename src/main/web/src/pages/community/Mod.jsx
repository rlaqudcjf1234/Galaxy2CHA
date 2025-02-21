import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
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
    });

    // URL 경로에서 타입 추출
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/class/")) {
            setCommunityType("class");
        } else if (path.includes("/student/")) {
            setCommunityType("student");
        }
    }, [location]);

    // 기존 게시글 데이터 로드
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/community/${communityType}/read/${seq}`);
                const post = Array.isArray(response.data) ? response.data[0] : response.data;

                setFormData({
                    seq: seq,
                    title: post.TITLE || post.title,
                    division: post.DIVISION || post.division,
                    detail: post.DETAIL || post.detail,
                });
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                alert("게시글을 불러오는데 실패했습니다.");
                navigate(-1);
            }
        };

        if (communityType && seq) {
            fetchPost();
        }
    }, [communityType, seq]);

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
            await axios.put(`/api/community/${communityType}/read/${seq}`, formData);
            alert("게시글이 수정되었습니다.");
            navigate(`/community/${communityType}/read/${seq}`);
        } catch (error) {
            console.error("Error:", error);
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
                                    <option value="공지">공지</option>
                                    <option value="일반">일반</option>
                                    {communityType === "class" && <option value="질문">질문</option>}
                                    {communityType === "student" && <option value="상담">상담</option>}
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
