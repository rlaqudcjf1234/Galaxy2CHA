// ApplyList.js
import { Link, Navigate } from "react-router-dom";
import "../../css/Community.css";

const ApplyList = () => {
    // 관리자 인증 상태 확인
    const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
    const isAdmin = sessionStorage.getItem("authType") === "admin";

    // 관리자면 admin 페이지로 리다이렉션
    if (isAuthenticated && isAdmin) {
        return <Navigate to="/apply/admin" replace />;
    }

    // 일반 사용자용 리스트 화면
    return (
        <div>
            <div className="board-header">
                <Link to="/apply/add" className="write-button">
                    등록
                </Link>
                <Link to="/apply/student" className="write-button">
                    로그인
                </Link>
            </div>
            <table className="board-table">
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">성명</th>
                        <th scope="col">이메일</th>
                        <th scope="col">연락처</th>
                        <th scope="col">등록일자</th>
                        <th scope="col">등록여부</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="6" className="text-center">
                            데이터가 없습니다.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ApplyList;
