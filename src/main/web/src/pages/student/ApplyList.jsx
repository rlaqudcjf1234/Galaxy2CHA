import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { authenticatedRequest as axios } from "../../plugins/axios";

import Loding from "../../components/Loding"
import Pagination from "../../components/Pagination";

import "../../css/Community.css";

const ApplyList = () => {
    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const fetchData = async (pageIndex) => {
        setLoading(true);
        try {
            const requestParams = {
                pageIndex: pageIndex
            };
            const response = await axios.get("/api/apply/list", { params: requestParams });
            setItems(response.data.items);
            setTotalCount(response.data.totalCount);
        } catch (error) {
            console.error('Error fetching data:', error);
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
        return <Loding />
    }

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
                    {
                        Array.isArray(items) && items.length > 0
                            ? (items.map((item) => (
                                <tr key={item.ID}>
                                    <td>{item.RNUM || "-"}</td>
                                    <td>
                                        <Link to={`read/${item.ID}`}>{item.NAME}</Link>
                                    </td>
                                    <td>{item.EMAIL || "-"}</td>
                                    <td>{item.PHONE || "-"}</td>
                                    <td>{item.REG_DT || "-"}</td>
                                    <td>{item.USE_YN || "-"}</td>
                                </tr>
                            )))
                            : (
                                <tr key="no-data">
                                    <td colSpan="6" className="text-center">
                                        게시글이 없습니다.
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>

            <div className="d-flex gap-2 justify-content-center py-1">
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalCount}
                    onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default ApplyList;
