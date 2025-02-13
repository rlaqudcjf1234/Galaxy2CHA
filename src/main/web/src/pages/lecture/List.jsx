import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";


const List = () => {
    const [items, setItems] = useState([]); // 목록 데이터
    const [totalCount, setTotalCount] = useState(0); // 전체 아이템 수
    const [search, setSearch] = useState({ select: "1", text: "" });
    const [params, setParams] = useState({ select: "1", text: "", pageIndex: 1 });
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 선택 페이지 변경 데이터 요청
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/lecture/list", { params: params });
            setItems(response.data.items); // 목록 데이터
            setTotalCount(response.data.totalCount); // 전체 아이템 수
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // 선택 페이지 변경 핸들러
    const handlePageChange = (pageIndex) => {
        setParams({
            ...params,
            pageIndex: pageIndex
        });
    };
    
    // 검색어 변경 핸들러
    const handleSearchChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value // search를 업데이트합니다
        });
    };

    // Enter 키로도 검색할 수 있도록 하는 핸들러
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    // 검색 실행 핸들러
    const handleSearch = () => {
        setParams({
            ...params,
            pageIndex: 1,
            select: search.select,
            text: search.text
        });
    };

    // 선택 페이지 변경 이벤트
    useEffect(() => {
        fetchData();
    }, [params]);

    // 팝업 창을 여는 핸들러 추가
    const handleDocumentClick = (seq) => {
        // 팝업창 크기와 위치 설정
        const width = 800;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        // 팝업창 열기
        window.open(
            `/lecture/attach/${seq}`,  // URL 경로
            '학과문서',  // 팝업창 이름
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
    };


    return (
        <div>
            {/* <div className="board-header">
                <div className="board-navigation">
                    <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>홈</span>
                    <span>{'>'}</span>
                    <span onClick={() => navigate('/lecture')} style={{ cursor: 'pointer' }}>강의관리</span>
                </div>
                <div className="header-right">
                    <button onClick={() => navigate('/lecture/add')} className="write-button">등록</button>
                </div>
            </div> */
            }

            <table className="table">
                {/* 제목 영역 */}
                <caption>
                    <span>
                        <em>홈</em>
                        <strong>교육과정현황</strong>
                    </span>
                    <Link to="add" className="btn btn-primary">등록</Link>
                </caption>

                <colgroup>
                    <col width="8%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="8%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>구분</th>
                        <th>카테고리</th>
                        <th>학과이름</th>
                        <th>등록자</th>
                        <th>등록일자</th>
                        <th>문서</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.length > 0
                            ? (items.map((item) => {
                                const read = `read/${item.SEQ}`;
                                return (
                                    <tr key={item.SEQ}>
                                        <td>{item.RNUM}</td>
                                        <td>{item.DIVISION}</td>
                                        <td>{item.CATEGORY}</td>
                                        <td>
                                            <Link to={read}>{item.LECTURE_NAME}</Link>
                                        </td>
                                        <td>{item.ADMIN_NAME}</td>
                                        <td>{item.REG_DT}</td>
                                        <td>
                                            {/*attach=임의경로*/}
                                            <button
                                                onClick={() => handleDocumentClick(item.SEQ)}
                                                className="btn btn-primary"
                                            >
                                                문서
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }))
                            : (
                                <tr>
                                    <td colSpan="5" className="text-center">데이터가 없습니다.</td>
                                </tr>
                            )
                    }
                </tbody>
            </table>

            <Pagination
                currentPage={params.pageIndex}
                totalCount={totalCount}
                onPageChange={handlePageChange} />

            <div className="d-flex gap-2 justify-content-center py-1">
                <div>
                    <select
                        name="select"
                        defaultValue={search.select}
                        onChange={handleSearchChange}
                        className="form-control"
                        required="required">
                        <option value="1">학과명</option>
                        <option value="2">강사명</option>
                    </select>
                </div>
                <div className="col-4">
                    <input
                        type="text"
                        name="text"
                        value={search.text}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyPress}
                        className="form-control"
                        placeholder="검색어를 입력하세요" />
                </div>
                <button onClick={handleSearch} className="btn btn-primary">검색</button>
            </div>
        </div>
    );
}
export default List;