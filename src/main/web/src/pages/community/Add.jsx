import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Community.css";

function Add({ type }) {
    const navigate = useNavigate();
    const { seq, classSeq } = useParams(); // 명시적으로 URL 파라미터 추출
    const location = useLocation();
    const [communityType, setCommunityType] = useState(type || "student");
    const [loading, setLoading] = useState(false);
    const [validating, setValidating] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        division: "",
        detail: "",
        tableType: "STUDENT",
        authorSeq: null,
        classSeq: null,
        studentSeq: null,
    });

    // 학생 ID 유효성 검증 함수
    const validateStudentId = async (studentId) => {
        if (!studentId) return false;
        setValidating(true);

        try {
            // 실제 API 엔드포인트로 수정하세요
            const response = await axios.get(`/api/student/${studentId}`);
            return response.status === 200;
        } catch (error) {
            console.error("학생 ID 검증 오류:", error);
            return false;
        } finally {
            setValidating(false);
        }
    };

    // 클래스 ID 유효성 검증 함수
    const validateClassId = async (classId) => {
        if (!classId) return false;
        setValidating(true);

        try {
            // 실제 API 엔드포인트로 수정하세요
            const response = await axios.get(`/api/class/${classId}`);
            return response.status === 200;
        } catch (error) {
            console.error("클래스 ID 검증 오류:", error);
            return false;
        } finally {
            setValidating(false);
        }
    };

    useEffect(() => {
        const processPath = async () => {
            setLoading(true);
            // URL 경로에서 커뮤니티 타입과 작성자 번호 확인
            const path = location.pathname;
            const pathSegments = path.split("/").filter((segment) => segment);

            if (path.includes("/class")) {
                setCommunityType("class");

                // 클래스 ID 확인 - useParams에서 가져온 값 사용
                const classId = classSeq ? Number(classSeq) : null;

                // URL 경로에서 추출 (useParams에 없는 경우)
                let classIdFromPath = null;
                if (!classId && pathSegments.length >= 3) {
                    const potentialClassId = pathSegments[2];
                    classIdFromPath = !isNaN(Number(potentialClassId)) ? Number(potentialClassId) : null;
                }

                // 유효한 클래스 ID 사용, 없으면 null
                const validClassId = classId || classIdFromPath;

                if (validClassId) {
                    // 클래스 ID 유효성 검증
                    const isValid = await validateClassId(validClassId);

                    if (isValid) {
                        setFormData((prev) => ({
                            ...prev,
                            tableType: "CLASS",
                            authorSeq: validClassId,
                            classSeq: validClassId,
                            studentSeq: null,
                        }));
                    } else {
                        alert("존재하지 않는 강의 ID입니다. 강의 목록으로 이동합니다.");
                        navigate("/community/class");
                    }
                } else {
                    alert("유효한 강의 정보가 없습니다. 강의 목록으로 이동합니다.");
                    navigate("/community/class");
                }
            } else if (path.includes("/student")) {
                setCommunityType("student");

                // 학생 ID 확인 - useParams에서 가져온 값 사용
                const studentId = seq ? Number(seq) : null;

                // URL 경로에서 추출 (useParams에 없는 경우)
                let studentIdFromPath = null;

                // /community/student/add/1 형식 확인
                if (!studentId && pathSegments.length >= 4 && pathSegments[2] === "add") {
                    const potentialStudentId = pathSegments[3];
                    studentIdFromPath = !isNaN(Number(potentialStudentId)) ? Number(potentialStudentId) : null;
                }
                // /community/student/1/add 형식 확인
                else if (!studentId && pathSegments.length >= 4 && pathSegments[3] === "add") {
                    const potentialStudentId = pathSegments[2];
                    studentIdFromPath = !isNaN(Number(potentialStudentId)) ? Number(potentialStudentId) : null;
                }

                // 유효한 학생 ID 사용, 없으면 null
                const validStudentId = studentId || studentIdFromPath;

                if (validStudentId) {
                    // 학생 ID 유효성 검증
                    const isValid = await validateStudentId(validStudentId);

                    if (isValid) {
                        setFormData((prev) => ({
                            ...prev,
                            tableType: "STUDENT",
                            authorSeq: validStudentId,
                            studentSeq: validStudentId,
                            classSeq: null,
                        }));
                    } else {
                        alert("존재하지 않는 학생 ID입니다. 학생 게시판으로 이동합니다.");
                        navigate("/community/student");
                    }
                } else {
                    alert("유효한 학생 정보가 없습니다. 학생 게시판으로 이동합니다.");
                    navigate("/community/student");
                }
            }
            setLoading(false);
        };

        processPath();
    }, [location.pathname, type, seq, classSeq, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 필수 정보 확인
        if (!formData.authorSeq) {
            alert("작성자 정보가 없습니다. 게시판 목록으로 이동합니다.");
            navigate(`/community/${communityType}`);
            return;
        }

        try {
            setLoading(true);
            console.log("게시글 등록 요청 데이터:", formData);
            const response = await axios.post("/api/community/add", formData);

            if (response.status === 200) {
                alert("게시글이 성공적으로 등록되었습니다.");

                // 타입에 따라 리다이렉트 경로 설정
                if (communityType === "class" && formData.classSeq) {
                    navigate(`/community/class/${formData.classSeq}`);
                } else if (communityType === "student" && formData.studentSeq) {
                    navigate(`/community/student`);
                }
            }
        } catch (error) {
            console.error("게시글 등록 오류:", error);
            console.error("오류 상세:", {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });

            if (
                error.response?.data?.includes("무결성 제약조건") ||
                error.response?.data?.includes("부모 키가 없습니다")
            ) {
                alert("존재하지 않는 학생/강의 ID입니다. 올바른 ID를 사용해주세요.");
            } else {
                alert(error.response?.data || "게시글 등록 중 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading || validating) {
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
                <h2>{communityType === "class" ? "강의" : "학생"} 게시글 작성</h2>
                {formData.authorSeq && (
                    <p className="text-muted">
                        {communityType === "class" ? "강의" : "학생"} ID: {formData.authorSeq}
                    </p>
                )}
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
                    <button type="submit" className="btn btn-primary" disabled={!formData.authorSeq || loading}>
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
