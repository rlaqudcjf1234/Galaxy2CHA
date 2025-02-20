import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import "../../css/Community.css";

function List({ type }) {
    const { classSeq, seq } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // 경로에서 커뮤니티 타입 결정
    const [communityType, setCommunityType] = useState(type || "student");
    const [tableType, setTableType] = useState(type?.toUpperCase() || "STUDENT");

    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageIndex: 1,
        pageSize: 10,
        searchKeyword: "",
        tableType: type?.toUpperCase() || "STUDENT",
    });
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    // URL 경로에서 학생 seq 추출
    const getStudentSeqFromPath = () => {
        const pathSegments = location.pathname.split("/").filter((segment) => segment);
        if (communityType === "student" && pathSegments.length >= 3) {
            const potentialSeq = pathSegments[2];
            return !isNaN(Number(potentialSeq)) ? potentialSeq : null;
        }
        return null;
    };

    // URL 경로에서 타입 결정
    useEffect(() => {
        const path = location.pathname;
        let newType, newTableType;

        if (path.includes("/class")) {
            newType = "class";
            newTableType = "CLASS";
        } else if (path.includes("/student")) {
            newType = "student";
            newTableType = "STUDENT";
        } else {
            newType = type || "student";
            newTableType = type?.toUpperCase() || "STUDENT";
        }

        setCommunityType(newType);
        setTableType(newTableType);

        // 명시적으로 tableType 설정
        setParams((prev) => ({
            ...prev,
            tableType: newTableType,
        }));

        console.log("커뮤니티 타입 설정:", {
            path,
            newType,
            newTableType,
            classSeq,
            seq,
        });
    }, [location.pathname, type, classSeq, seq]);

    const fetchData = async (pageIndex) => {
        setLoading(true);
        try {
            // 명시적인 tableType 설정
            const requestParams = {
                pageIndex: pageIndex,
                pageSize: params.pageSize,
                searchKeyword: params.searchKeyword,
                tableType: tableType,
                classSeq: communityType === "class" ? classSeq : null, // 클래스 ID 추가
            };

            console.log("API 요청 파라미터:", requestParams);

            const response = await axios.get("/api/community/list", { params: requestParams });
            console.log("API 응답:", response.data);

            setItems(response.data.items || []);
            setTotalCount(response.data.totalCount || 0);
        } catch (error) {
            console.error("데이터 조회 오류:", error);
            console.error("오류 상세:", error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = () => {
        setParams((prev) => ({ ...prev, searchKeyword: searchInput }));
        setCurrentPage(1);
        fetchData(1);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    // 페이지 변경시 데이터 가져오기
    useEffect(() => {
        if (tableType) {
            fetchData(currentPage);
        }
    }, [currentPage, tableType]);

    // 글쓰기 URL 생성
    const getWriteUrl = () => {
        if (communityType === "class" && classSeq) {
            return `/community/class/${classSeq}/add`;
        } else if (communityType === "student") {
            // 학생 seq가 URL에 있으면 그것을 사용, 없으면 기본 경로 사용
            const studentSeq = seq || getStudentSeqFromPath();
            return studentSeq ? `/community/student/add/${studentSeq}` : "/community/student";
        }
        return `/community/${communityType}`;
    };

    if (loading) {
        return <div className="text-center p-4">데이터를 불러오는 중입니다...</div>;
    }

    return (
        <div>
            <div className="board-header mb-4">
                <h4>{communityType === "class" ? `${classSeq}반` : "학생"} 게시판</h4>
                {/* <p className="text-muted small">테이블 타입: {tableType}</p> */}
            </div>

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
            </div>
        </div>
    );
}

export default List;
