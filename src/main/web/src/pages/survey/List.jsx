import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

import Loding from "../../components/Loding"
import Pagination from "../../components/Pagination";

import "../../css/Community.css";

function List() {
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <Loding />
    }

    return (
        <div>
            {
            <div className="board-header mb-4">
                <h4>게시판</h4>
            </div>

            /* <div className="row mb-3">
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
                    <Link to={getWriteUrl()}>
                        <button className="btn btn-primary">글쓰기</button>
                    </Link>
                </div>
            </div>

            <table className="board-table">
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
                        items.map((item) => (
                            <tr key={item.seq}>
                                <td>{item.rnum || "-"}</td>
                                <td>{item.division || "-"}</td>
                                <td>
                                    <Link to={`/community/${communityType}/read/${item.seq}`}>{item.title}</Link>
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
            </div> */}
        </div>
    );
}

export default List;
