import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Community.css";

function Add({ type }) {
    const navigate = useNavigate();
    const { seq, classSeq } = useParams();
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

    const validateStudentId = async (studentId) => {
        if (!studentId) return false;
        setValidating(true);
        try {
            // community가 아닌 기본 student 정보를 조회하는 API를 사용해야 함
            const response = await axios.get(`/student/${studentId}`);
            return response.status === 200;
        } catch (error) {
            console.error("학생 ID 검증 오류:", error);
            return false;
        } finally {
            setValidating(false);
        }
    };

    const validateClassId = async (classId) => {
        if (!classId) return false;
        setValidating(true);
        try {
            // community가 아닌 기본 class 정보를 조회하는 API를 사용해야 함
            const response = await axios.get(`/class/${classId}`);
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
            const path = location.pathname;
            const pathSegments = path.split("/").filter((segment) => segment);

            if (path.includes("/class")) {
                setCommunityType("class");
                const classId = classSeq ? Number(classSeq) : null;
                let classIdFromPath = null;

                if (!classId && pathSegments.length >= 3) {
                    const potentialClassId = pathSegments[2];
                    classIdFromPath = !isNaN(Number(potentialClassId)) ? Number(potentialClassId) : null;
                }

                const validClassId = classId || classIdFromPath;

                if (validClassId) {
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
                const studentId = seq ? Number(seq) : null;
                let studentIdFromPath = null;

                // /community/student/add/{seq} 형식 처리
                if (!studentId && pathSegments.length >= 4 && pathSegments[2] === "add") {
                    const potentialStudentId = pathSegments[3];
                    studentIdFromPath = !isNaN(Number(potentialStudentId)) ? Number(potentialStudentId) : null;
                }

                const validStudentId = studentId || studentIdFromPath;

                if (validStudentId) {
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
            } else if (path.includes("/postbox")) {
                setCommunityType("postbox");
                const studentId = seq ? Number(seq) : null;
                let studentIdFromPath = null;

                // /community/postbox/add/{seq} 형식 처리
                if (!studentId && pathSegments.length >= 4 && pathSegments[2] === "add") {
                    const potentialStudentId = pathSegments[3];
                    studentIdFromPath = !isNaN(Number(potentialStudentId)) ? Number(potentialStudentId) : null;
                }

                const validStudentId = studentId || studentIdFromPath;

                if (validStudentId) {
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
                        alert("존재하지 않는 학생 ID입니다. 건의 게시판으로 이동합니다.");
                        navigate("/community/postbox");
                    }
                } else {
                    alert("유효한 학생 정보가 없습니다. 건의 게시판으로 이동합니다.");
                    navigate("/community/postbox");
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

                if (communityType === "class" && formData.classSeq) {
                    navigate(`/community/class/${formData.classSeq}`);
                } else if (communityType === "student" && formData.studentSeq) {
                    navigate(`/community/student`);
                } else if (communityType === "postbox") {
                    navigate(`/community/postbox`);
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
                <h4>
                    {communityType === "class" ? `${classSeq}반` : communityType === "postbox" ? "건의사항" : "학생"}{" "}
                    게시판 글 작성
                </h4>
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
                                    {communityType === "postbox" ? (
                                        <>
                                            <option value="건의">건의</option>
                                            <option value="질의">질의</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="공지">공지</option>
                                            <option value="일반">일반</option>
                                            {communityType === "class" && <option value="질문">질문</option>}
                                            {communityType === "student" && <option value="상담">상담</option>}
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
