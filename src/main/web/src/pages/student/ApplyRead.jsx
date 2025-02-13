import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ApplyDelete from "./ApplyDelete";

function ApplyRead() {
    const [apply, setApply] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchApply = async () => {
        if (!id || id === "undefined") {
            console.error("Invalid ID");
            navigate("/apply");
            return;
        }
        try {
            const response = await axios.get(`/api/apply/read/${id}`);
            setApply(response.data);
        } catch (error) {
            console.error("Error fetching apply info:", error);
            alert("등록 정보를 불러오는데 실패했습니다.");
            navigate("/apply");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            // 기존: /api/apply/read/1
            const response = await axios.delete(`/api/apply/delete/${id}`); // URL 경로 수정
            if (response.status === 200) {
                alert("성공적으로 삭제되었습니다.");
                navigate("/apply"); // 삭제 후 목록 페이지로 이동
            }
        } catch (error) {
            console.error("Error:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        fetchApply();
    }, [id]); // 의존성 배열에 id 추가

    if (loading) return <div>로딩중...</div>;
    if (!apply) return <div>등록 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="apply-detail-container">
            <div className="apply-detail-wrapper">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3>상세정보</h3>
                    <ApplyDelete onDelete={handleDelete} itemId={id}>
                        신청 취소
                    </ApplyDelete>
                </div>
                <div className="detail-content">
                    <div className="detail-row">
                        <label>반 명: </label>
                        <span>{apply.SEQ}</span>
                    </div>
                    <div className="detail-row">
                        <label>학생명: </label>
                        <span>{apply.NAME}</span>
                    </div>
                    <div className="detail-row">
                        <label>주민등록번호: </label>
                        <span>{apply.JUMIN}</span>
                    </div>
                    <div className="detail-row">
                        <label>전화번호: </label>
                        <span>{apply.PHONE}</span>
                    </div>
                    <div className="detail-row">
                        <label>이메일: </label>
                        <span>{apply.EMAIL}</span>
                    </div>
                    <div className="detail-row">
                        <label>실거주지: </label>
                        <span>
                            {apply.REAL_ZIPCODE} | {apply.REAL_ADDRESS1}, {apply.REAL_ADDRESS2}
                        </span>
                    </div>
                    <div className="detail-row">
                        <label>등본상 주소: </label>
                        <span>
                            {apply.ZIPCODE} | {apply.ADDRESS1}, {apply.ADDRESS2}
                        </span>
                    </div>
                    <div className="detail-row">
                        <label>지원경로: </label>
                        <span>{apply.PATH}</span>
                    </div>
                    <div className="detail-row">
                        <label>등록일자: </label>
                        <span>{apply.REG_DT}</span>
                    </div>
                </div>
                <div className="button-group">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        목록으로
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApplyRead;
