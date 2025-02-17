import React, { useState, useEffect } from 'react';
import '../../css/Mypage.css';

const MyPage = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [showSearch, setShowSearch] = useState(true);

  // 생년월일 변환 함수
  const formatBirthDate = (jumin) => {
    if (!jumin || jumin.length < 6) return "알 수 없음"; // 예외 처리

    const yearPrefix = jumin[6] === '1' || jumin[6] === '2' ? "19" : "20";
    const year = yearPrefix + jumin.substring(0, 2);
    const month = jumin.substring(2, 4);
    const day = jumin.substring(4, 6);

    return `${year}년 ${month}월 ${day}일`;
  };

  // ID로 학생 정보를 조회하는 함수
  const fetchStudentInfo = async (id) => {
    setLoading(true);
    try {
      const url = `/api/student/info/${id}`;
      console.log('요청 URL:', url); // 실제 요청되는 URL 확인

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('응답 상태:', response.status); // 응답 상태 코드 확인
      console.log('응답 타입:', response.headers.get('content-type')); // 응답 헤더 확인

      if (!response.ok) {
        const errorText = await response.text(); // 에러 응답 본문 확인
        console.log('에러 응답:', errorText);
        throw new Error('학생 정보를 찾을 수 없습니다.');
      }

      const data = await response.json();
      console.log('받은 데이터:', data); // 성공시 받은 데이터 확인
      setStudentInfo(data);
      setShowSearch(false);
    } catch (err) {
      console.error('API 호출 중 에러 발생:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 검색 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentId.trim()) {
      fetchStudentInfo(studentId);
    }
  };

  // 다시 검색하기
  const handleSearchAgain = () => {
    setShowSearch(true);
    setStudentInfo(null);
    setStudentId('');
    setError(null);
  };

  // 검색 폼 렌더링
  const renderSearchForm = () => (
    <div className="search-container">
      <h2>학생 정보 조회</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="학생 ID를 입력하세요"
          className="search-input"
        />
        <button type="submit" className="search-button">조회하기</button>
      </form>
    </div>
  );

  if (loading) return <div className="loading">로딩 중...</div>;

  if (showSearch) {
    return (
      <div className="mypage-container">
        {renderSearchForm()}
        {error && <div className="error">{error}</div>}
      </div>
    );
  }

  if (!studentInfo) return <div className="no-data">학생 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="mypage-container">
      <div className="mypage-card">
        <div className="mypage-header">
          <h1>마이페이지</h1>
          <button onClick={handleSearchAgain} className="search-again-button">
            다시 검색하기
          </button>
        </div>

        {/* 나머지 학생 정보 표시 부분은 동일 */}
        <div className="mypage-content">
          <div className="info-section">
            <h2>기본 정보</h2>
            <div className="info-group">
              <p><span className="label">이름:</span> {studentInfo.name}</p>
              <p><span className="label">생년월일:</span> {formatBirthDate(studentInfo.jumin)}</p>
              <p><span className="label">이메일:</span> {studentInfo.email}</p>
              <p><span className="label">연락처:</span> {studentInfo.phone}</p>
            </div>
          </div>

          <div className="info-section">
            <h2>실거주지 주소</h2>
            <div className="info-group">
              <p><span className="label">실거주 우편번호:</span> {studentInfo.realZipcode}</p>
              <p><span className="label">실거주 주소:</span> {studentInfo.realAddress1}</p>
              <p><span className="label">실거주 주소 상세:</span> {studentInfo.realAddress2}</p>
            </div>
          </div>

          <div className="info-section">
            <h2>등록 주소</h2>
            <div className="info-group">
              <p><span className="label">우편번호:</span> {studentInfo.zipcode || '미등록'}</p>
              <p><span className="label">주소:</span> {studentInfo.address1 || '미등록'}</p>
              <p><span className="label">주소 상세:</span> {studentInfo.address2 || '미등록'}</p>
            </div>
          </div>

          <div className="info-section">
            <h2>등록 정보</h2>
            <div className="info-group">
              <p>
                <span className="label">등록일:</span>
                {new Date(studentInfo.regDate).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p><span className="label">강의 번호:</span> {studentInfo.classSeq}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
