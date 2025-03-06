import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { authenticatedRequest as axios } from "../../plugins/axios";

import Loding from "../../components/Loding";
import Pagination from "../../components/Pagination";

import "../../css/Community.css";

function List() {
    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const fetchData = async (pageIndex) => {
        setLoading(true);
        try {
            const requestParams = {
                pageIndex: pageIndex,
            };
            const response = await axios.get("/api/survey/list", { params: requestParams });
            setItems(response.data.items);
            setTotalCount(response.data.totalCount);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 페이지 변경시 데이터 가져오기
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    if (loading) {
        return <Loding />;
    }

    return (
        <div>
            <div className="board-header mb-4">
                <Link to="/survey"></Link>
            </div>

            <table className="table">
                <caption>
                    <span>
                        <em>홈</em>
                        <strong>설문현황</strong>
                    </span>
                </caption>
                <colgroup>
                    <col width="100px" />
                    <col />
                    <col width="200px" />
                    <col width="200px" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">제목</th>
                        <th scope="col">작성일</th>
                        <th scope="col">제출여부</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(items) && items.length > 0 ? (
                        items.map((item) => (
                            <tr key={item.QUESTION_SEQ}>
                                <td>{item.RNUM || "-"}</td>
                                <td>
                                    <Link to={`read/${item.QUESTION_SEQ}`}>{item.QUESTION_NAME}</Link>
                                </td>
                                <td>{item.REG_DT || "-"}</td>
                                <td>
                                    {item.SURVEY > 0 ? (
                                        <span style={{ color: "blue" }}>제출완료</span>
                                    ) : (
                                        <span style={{ color: "red" }}>미제출</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr key="no-data">
                            <td colSpan="4" className="text-center">
                                게시글이 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="d-flex gap-2 justify-content-center py-1">
                <Pagination currentPage={currentPage} totalCount={totalCount} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default List;
