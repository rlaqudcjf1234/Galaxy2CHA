// ApplyList.js
import { Link } from "react-router-dom";
import "../../css/Community.css";
import { authenticatedRequest as axios } from "../../plugins/axios";

const ApplyList = () => {
    // 일반 사용자용 리스트 화면
    return (
        <div>
            <div className="board-header">
                <Link to="/apply/add"></Link>
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
