import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import WritePost from './WritePost';
import { usePost } from '../../contexts/PostContext';
import '../../css/Community.css';

const Class_Community = () => {
    // Context에서 posts를 가져옵니다
    const { posts } = usePost();

    // 현재 페이지 상태 관리만 이 컴포넌트에서 합니다
    const [currentPage, setCurrentPage] = useState(1);

    // 검색어를 저장할 상태를 추가합니다
    const [searchInput, setSearchInput] = useState('');

    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    
    // 한 페이지당 보여줄 게시글 수
    const pageUnit = 10;

    // 검색어로 게시글을 필터링하는 함수
    const getFilteredPosts = () => {
        if (!activeSearchTerm.trim()) {
            return posts;
        }
        
        return posts.filter(post => 
            post.title.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
            post.content?.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(activeSearchTerm.toLowerCase())
        );
    };

    // 필터링된 게시글에서 현재 페이지의 게시글을 가져오는 함수
    const getCurrentPagePosts = () => {
        const filteredPosts = getFilteredPosts();
        // 최신 글이 먼저 오도록 정렬
        const sortedPosts = [...filteredPosts].sort((a, b) => b.id - a.id);
        
        // 페이지네이션을 위한 간단한 인덱스 계산
        const startIndex = (currentPage - 1) * pageUnit;
        const endIndex = startIndex + pageUnit;
        
        return sortedPosts.slice(startIndex, endIndex);
    };

    // 검색어 입력 핸들러
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);  // searchInput을 업데이트합니다
    };
    
    // 검색 실행 핸들러
    const handleSearch = () => {
        setActiveSearchTerm(searchInput);  
        setCurrentPage(1);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // 나중에 여기서 DB에서 해당 페이지의 데이터를 가져오는 로직이 들어갈 예정입니다.
    };

    // Enter 키로도 검색할 수 있도록 하는 핸들러
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="board-container">
            {/* 검색 영역 */}
            <div className="board-header">
                <div className="search-box">
                <input 
                        type="text" 
                        placeholder="검색어를 입력하세요" 
                        value={searchInput}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>
                <Link to="/WritePost" className="write-button">글쓰기</Link>
            </div>

            {/* 게시글 목록 */}
            <table className="board-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {getCurrentPagePosts().map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td className="title">{post.title}</td>
                            <td>{post.author}</td>
                            <td>{post.date}</td>
                            <td>{post.views}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <Pagination 
                currentPage={currentPage}
                totalCount={getFilteredPosts().length}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Class_Community;