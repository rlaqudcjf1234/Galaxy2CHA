import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../css/Mypage.css';

function Mypage() {
  const { seq } = useParams();
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  // API 호출
  const fetchStudentData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/student/mypage/${seq}`);
      setStudentData(response.data);
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seq) {
      fetchStudentData();
    }
  }, [seq]);

  // 로딩
  if (loading) {
    return (
      <div className="mypage-container">
        <div className="mypage-content">
          <div className="loading">로딩 중...</div>
        </div>
      </div>
    );
  }

  // 에러
  if (error) {
    return (
      <div className="mypage-container">
        <div className="mypage-content">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  // 데이터가 없을 때
  if (!studentData) {
    return (
      <div className="mypage-container">
        <div className="mypage-content">
          <div className="loading">학생 정보를 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mypage-container">
      {/* 사이드바(프로필 이미지, 간단한 메뉴 등) */}
      <aside className="mypage-sidebar">
        <div className="profile-section">
          <div className="profile-image">
            {/* 프로필 사진 대체 영역 - 실제로는 이미지 태그 넣기 */}
            <span className="profile-placeholder">Profile</span>
          </div>
          <h2 className="profile-name">{studentData.NAME || '이름없음'}</h2>
          <div className="profile-email">{studentData.EMAIL || '이메일 없음'}</div>
        </div>
        {/* 필요 시 추가 메뉴 */}
        <nav className="sidebar-menu">
          <ul>
            <li>내 정보</li>
            <li>수강 정보</li>
            {/* 다른 메뉴 추가 가능 */}
          </ul>
        </nav>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <div className="mypage-content">
        {/* 상단 */}
        <div className="content-header">
          <h1>마이페이지</h1>
          <p>반갑습니다, {studentData.NAME}님</p>
        </div>

        {/* 기본 정보 섹션 */}
        <section className="mypage-section">
          <h2>기본 정보</h2>
          <div className="info-cards">
            {/* 이름 */}
            <div className="info-card">
              <span className="label">이름</span>
              <span className="value">{studentData.NAME || '없음'}</span>
            </div>
            {/* 이메일 */}
            <div className="info-card">
              <span className="label">이메일</span>
              <span className="value">{studentData.EMAIL || '없음'}</span>
            </div>
            {/* 전화번호 */}
            <div className="info-card">
              <span className="label">전화번호</span>
              <span className="value">{studentData.PHONE || '없음'}</span>
            </div>
            {/* 우편번호 */}
            <div className="info-card">
              <span className="label">우편번호</span>
              <span className="value">{studentData.REAL_ZIPCODE || '없음'}</span>
            </div>
            {/* 주소 */}
            <div className="info-card">
              <span className="label">주소</span>
              <span className="value">{studentData.REAL_ADDRESS1 || '없음'}</span>
            </div>
            {/* 상세주소 */}
            <div className="info-card">
              <span className="label">상세주소</span>
              <span className="value">{studentData.REAL_ADDRESS2 || '없음'}</span>
            </div>
          </div>
        </section>


        {/* 수강 정보 섹션 */}
        <section className="mypage-section">
          <h2>수강 정보</h2>
          <div className="info-cards">
            <div className="info-card">
              <span className="label">강의명</span>
              <span className="value">{studentData.LECTURE_NAME || ''}</span>
            </div>
            <div className="info-card">
              <span className="label">강사</span>
              <span className="value">{studentData.ADMIN_NAME || ''}</span>
            </div>
            <div className="info-card">
              <span className="label">강의실</span>
              <span className="value">{studentData.ROOM || ''}</span>
            </div>
            <div className="info-card">
              <span className="label">강의 기간</span>
              <span className="value">
                {studentData.START_DT} ~ {studentData.END_DT}
              </span>
            </div>
            <div className="info-card">
              <span className="label">강의 시간</span>
              <span className="value">
                {studentData.START_TM} ~ {studentData.END_TM}
              </span>
            </div>
            <div className="info-card">
              <span className="label">회차</span>
              <span className="value">{studentData.ROUND}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Mypage;
