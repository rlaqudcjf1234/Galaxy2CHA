import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ApplyRead() {
    const [apply, setApply] = useState(null);
    const [classInfo, setClassInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchData = async () => {
        try {
            // Apply 정보 가져오기 (클래스 정보도 함께 포함되어 있음)
            const applyResponse = await axios.get(`/api/apply/read/${id}`);
            console.log("Apply 응답 데이터:", applyResponse.data);
            console.log("LECTURE_SEQ:", applyResponse.data.LECTURE_SEQ);

            // 응답 데이터에서 직접 클래스 정보 추출
            const classData = {
                seq: applyResponse.data.seq,
                round: applyResponse.data.ROUND,
                lecture_name: applyResponse.data.LECTURE_NAME,
                start_dt: applyResponse.data.START_DT,
                end_dt: applyResponse.data.END_DT,
            };

            setApply(applyResponse.data);
            setClassInfo(classData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("정보를 불러오는데 실패했습니다.");
            navigate("/apply");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/apply/delete/${id}`);
            if (response.status === 200) {
                alert("성공적으로 삭제되었습니다.");
                navigate("/apply");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) return <div>로딩중...</div>;
    if (!apply) return <div>등록 정보를 찾을 수 없습니다.</div>;

    return (
        <div>
            <table className="table">
                <caption>
                    <span className="d-flex justify-content-between">
                        <span>
                            <strong>상세정보</strong>
                        </span>
                        <span>승인상태: {apply.USE_YN === "Y" ? "승인완료" : "승인대기"}</span>
                    </span>
                </caption>
                <colgroup>
                    <col width="15%" />
                    <col width="35%" />
                    <col width="15%" />
                    <col width="35%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">강의</th>
                        <td>{classInfo ? `${classInfo.round}회 - ${classInfo.lecture_name}` : "정보 없음"}</td>
                    </tr>
                    <tr>
                        <th scope="row">교육 기간</th>
                        <td>{classInfo ? `${classInfo.start_dt} ~ ${classInfo.end_dt}` : "정보 없음"}</td>
                    </tr>
                    <tr>
                        <th scope="row">학생명</th>
                        <td>{apply.NAME}</td>
                    </tr>
                    <tr>
                        <th scope="row">주민등록번호</th>
                        <td>{apply.JUMIN}</td>
                    </tr>
                    <tr>
                        <th scope="row">전화번호</th>
                        <td>{apply.PHONE}</td>
                    </tr>
                    <tr>
                        <th scope="row">이메일</th>
                        <td>{apply.EMAIL}</td>
                    </tr>
                    <tr>
                        <th scope="row">실거주지</th>
                        <td>
                            {apply.REAL_ZIPCODE} {apply.REAL_ADDRESS1} {apply.REAL_ADDRESS2}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">등본상 주소</th>
                        <td>
                            {apply.ZIPCODE} {apply.ADDRESS1} {apply.ADDRESS2}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">지원경로</th>
                        <td>{apply.PATH}</td>
                    </tr>
                    <tr>
                        <th scope="row">등록일자</th>
                        <td>{apply.REG_DT}</td>
                    </tr>

                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                                    목록
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(id)}>
                                    신청 취소
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ApplyRead;
