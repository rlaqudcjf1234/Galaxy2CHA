import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { authenticatedRequest as axios } from "../../plugins/axios";

import Pagination from "../../components/Pagination";
import "../../css/Community.css";

function List({ type }) {
    const [communityType] = useState(type || "student");
    const [tableType] = useState(type?.toUpperCase() || "STUDENT");

    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const fetchData = async (pageIndex) => {
        setLoading(true);
        try {
            const requestParams = {
                pageIndex: pageIndex,
                pageSize: 10,
                searchKeyword: searchInput,
                tableType: tableType,
            };

            // 커뮤니티 타입에 따른 division 설정
            if (communityType === "postbox") {
                requestParams.division = "'건의'";
            } else if (communityType === "student") {
                requestParams.division = "'공지', '일반', '유머'";
            }

            const response = await axios.get("/api/community/list", { params: requestParams });

            // 역순으로 번호 매기기
            const itemsWithReverseRnum = (response.data.items || []).map((item, index) => ({
                ...item,
                rnum: response.data.totalCount - (pageIndex - 1) * 10 - index,
            }));

            setItems(itemsWithReverseRnum);
            setTotalCount(response.data.totalCount || 0);
        } catch (error) {
            console.error("데이터 조회 오류:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchData(1);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        if (items && items.length > 0) {
            console.log("Items data:", items);
            console.log("First item structure:", items[0]);
            console.log("Keys in first item:", Object.keys(items[0]));
        }
    }, [items]);

    // 페이지 변경시 데이터 가져오기
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    // 검색어 변경시 재검색
    useEffect(() => {
        if (searchInput === "") {
            fetchData(1);
        }
    }, [searchInput]);

    // 타입별 게시판 제목
    const getBoardTitle = () => {
        switch (communityType) {
            case "class":
                return "반 게시판";
            case "postbox":
                return "건의함";
            default:
                return "학생 게시판";
        }
    };

    if (loading) {
        return <div className="text-center p-4">데이터를 불러오는 중입니다...</div>;
    }

    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="검색어를 입력하세요"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-secondary" onClick={handleSearch}>
                                검색
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-end">
                    <Link to={`/community/${communityType}/add`}>
                        <button className="btn btn-primary">글쓰기</button>
                    </Link>
                </div>
            </div>

            <table className="table">
                <caption>
                    <span>
                        <em>홈</em>
                        <strong>{getBoardTitle()}</strong>
                    </span>
                </caption>
                <colgroup>
                    <col width="80px" />
                    <col width="100px" />
                    <col />
                    <col width="120px" />
                    <col width="120px" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">구분</th>
                        <th scope="col">제목</th>
                        <th scope="col">작성자</th>
                        <th scope="col">작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(items) && items.length > 0 ? (
                        items.map((item, index) => (
                            <tr key={`item-${item.seq}`}>
                                <td>{item.rnum || "-"}</td>
                                <td>{item.division || "-"}</td>
                                <td>
                                    <Link to={`/community/${communityType}/read/${item.seq}`}>{item.title || "-"}</Link>
                                </td>
                                <td>{item.author || "-"}</td>
                                <td>{item.regDt || "-"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr key="no-data">
                            <td colSpan="5" className="text-center">
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
