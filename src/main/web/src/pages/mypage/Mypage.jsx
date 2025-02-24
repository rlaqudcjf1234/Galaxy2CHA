import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../css/Mypage.css';
import AddEduModal from './AddEduModal';
import AddCertModal from './AddCertModal';

function Mypage() {
  const { seq } = useParams();
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);
  const [certifications, setCertifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [academicList, setAcademicList] = useState(null);

  const studentSeq = window.location.pathname.split('/').pop();

  const fetchStudentData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [studentResponse, certResponse, academicResponse] = await Promise.all([
        axios.get(`/api/student/mypage/${seq}`),
        axios.get(`/api/student/certification/${seq}`),
        axios.get(`/api/student/academic/info/${seq}`)
      ]);

      setStudentData(studentResponse.data);
      setCertifications(Array.isArray(certResponse.data) ? certResponse.data : []);
      setAcademicList(academicResponse.data ? academicResponse.data : null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      // 현재 날짜 추가
      const now = new Date().toISOString().split('T')[0];
      const requestData = {
        ...formData,
        STUDENT_SEQ: studentSeq,
        REG_DT: now
      };
  
      const response = await axios.post('/api/student/insert', requestData);
      
      if (response.data) {
        alert('학력 정보가 성공적으로 등록되었습니다.');
        setIsModalOpen(false);
        fetchStudentData(); // 데이터 새로고침
      }
    } catch (error) {
      console.error('학력 정보 등록 실패:', error.response?.data || error.message);
      if (error.response?.status === 409) {
        alert('이미 등록된 학력 정보가 있습니다. 기존 정보를 삭제 후 다시 등록해주세요.');
      } else {
        alert('학력 정보 등록에 실패했습니다.');
      }
    }
  };

  const handleEducationSave = async (educationData) => {
    try {
      await axios.post(`/api/student/education/${seq}`, educationData);
      fetchStudentData();
    } catch (error) {
      console.error('Failed to save education data:', error);
    }
  };

  const handleEducationDelete = async () => {
    if (window.confirm('학력 정보를 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/api/student/education/${seq}`);
        alert('학력 정보가 삭제되었습니다.');
        await fetchStudentData();
      } catch (error) {
        console.error('Failed to delete education:', error);
        alert('학력 정보 삭제에 실패했습니다.');
      }
    }
  };

  const handleCertificationSave = async (certificationData) => {
    try {
      await axios.post(`/api/student/certification/${seq}`, certificationData);
      alert('자격증 정보가 성공적으로 등록되었습니다.');
      await fetchStudentData();
      setIsCertificationModalOpen(false);
    } catch (error) {
      console.error('Failed to save certification data:', error);
      alert('자격증 정보 저장에 실패했습니다.');
    }
  };

  const handleCertificationDelete = async (certSort) => {
    if (window.confirm('자격증 정보를 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/api/student/certification/${seq}/${certSort}`);
        alert('자격증 정보가 삭제되었습니다.');
        await fetchStudentData();
      } catch (error) {
        console.error('Failed to delete certification:', error);
        alert('자격증 정보 삭제에 실패했습니다.');
      }
    }
  };

  // 학력 정보 조회 함수
  const getAcademicInfo = async () => {
    try {
      const response = await axios.get(`/api/student/academic/info/${seq}`);
      // 응답 데이터가 배열인지 확인하고 처리
      const academicData = Array.isArray(response.data) ? response.data : [response.data];
      setAcademicList(academicData);
      console.log('Academic Info:', academicData); // 데이터 확인용 로그
    } catch (error) {
      console.error('학력 정보 조회 중 오류 발생:', error);
      setAcademicList([]); // 에러 시 빈 배열로 설정
    }
  };
  const deleteAcademic = async (seq) => {
    if (window.confirm('학력 정보를 삭제하시겠습니까?')) {
      try {
        // academicList에서 현재 학생의 SORT 값을 가져옴
        const academicSort = academicList[0]?.SORT || 1; // 기본값 1

        await axios.delete(`/api/student/academic/${seq}/${academicSort}`);
        alert('학력 정보가 삭제되었습니다.');
        fetchStudentData();
      } catch (error) {
        console.error('학력 정보 삭제 중 오류 발생:', error);
        alert('학력 정보 삭제에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    if (seq) {
      fetchStudentData();
      getAcademicInfo();
    }
  }, [seq]);

  if (loading) return <div className="mypage-container"><div className="mypage-content"><div className="loading">로딩 중...</div></div></div>;
  if (error) return <div className="mypage-container"><div className="mypage-content"><div className="error">{error}</div></div></div>;
  if (!studentData) return <div className="mypage-container"><div className="mypage-content"><div className="loading">학생 정보를 찾을 수 없습니다.</div></div></div>;

  return (
    <div className="mypage-container">
      <aside className="mypage-sidebar">
        <div className="profile-section">
          <div className="profile-image">
            <span className="profile-placeholder">Profile</span>
          </div>
          <h2 className="profile-name">{studentData.NAME || '이름없음'}</h2>
          <div className="profile-email">{studentData.EMAIL || '이메일 없음'}</div>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li>내 정보</li>
            <li>수강 정보</li>
          </ul>
        </nav>
      </aside>

      <div className="mypage-content">
        <div className="content-header">
          <h1>마이페이지</h1>
          <p>반갑습니다, {studentData.NAME}님</p>
        </div>

        <section className="mypage-section">
          <h2>기본 정보</h2>
          <div className="info-cards">
            <div className="info-card">
              <span className="label">이름</span>
              <span className="value">{studentData.NAME || '없음'}</span>
            </div>
            <div className="info-card">
              <span className="label">이메일</span>
              <span className="value">{studentData.EMAIL || '없음'}</span>
            </div>
            <div className="info-card">
              <span className="label">전화번호</span>
              <span className="value">{studentData.PHONE || '없음'}</span>
            </div>
            <div className="info-card">
              <span className="label">우편번호</span>
              <span className="value">{studentData.REAL_ZIPCODE || '없음'}</span>
            </div>
            <div className="info-card">
              <span className="label">주소</span>
              <span className="value">{studentData.REAL_ADDRESS1 || '없음'}</span>
            </div>
            <div className="info-card">
              <span className="label">상세주소</span>
              <span className="value">{studentData.REAL_ADDRESS2 || '없음'}</span>
            </div>
          </div>
        </section>

        <section className="mypage-section">
          <h2>수강 정보</h2>
          <div className="info-cards">
            <div className="info-card">
              <span className="label">강의명</span>
              <span className="value">{studentData.LECTURE_NAME || '없음'}</span>
            </div>
            <div className="info-card">
              <span className="label">강사</span>
              <span className="value">{studentData.ADMIN_NAME || '없음'}</span>
            </div>
            <div className="info-card">
              <span className="label">강의실</span>
              <span className="value">{studentData.ROOM || '없음'}</span>
            </div>
            <div className="info-card">
              <span className="label">강의 기간</span>
              <span className="value">{studentData.START_DT || '없음'} ~ {studentData.END_DT || '없음'}</span>
            </div>
            <div className="info-card">
              <span className="label">강의 시간</span>
              <span className="value">{studentData.START_TM || '없음'} ~ {studentData.END_TM || '없음'}</span>
            </div>
            <div className="info-card">
              <span className="label">회차</span>
              <span className="value">{studentData.ROUND || '없음'}</span>
            </div>
          </div>
        </section>

        <section className="mypage-section">
          <h2>학력 정보</h2>
          {/* 배열이 비어있는지 체크 */}
          {academicList.length === 0 ? (
            <div className="empty-state">
              <p>등록된 학력 정보가 없습니다.</p>
              <button
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                학력 정보 추가
              </button>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="certification-table">
                  <thead>
                    <tr>
                      <th>최종학교</th>
                      <th>최종학력</th>
                      <th>전공여부</th>
                      <th>학과</th>
                      <th>졸업여부</th>
                    </tr>
                  </thead>
                  <tbody>
                    {academicList.map((academic, index) => (
                      <tr key={index}>
                        <td>{academic.FINAL_SCHOOL_NAME || '없음'}</td>
                        <td>{academic.FINAL_SCHOOL_LEVEL || '없음'}</td>
                        <td>{academic.FINAL_SCHOOL_SPECIALITY || '없음'}</td>
                        <td>{academic.FINAL_SCHOOL_LESSON || '없음'}</td>
                        <td>{academic.GRADUATE_YN || '없음'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="button-wrapper academic-actions">
                <span className="warning-text">
                  잘못 입력된 정보는 삭제 후 다시 등록해주세요.
                </span>
                <button
                  onClick={() => deleteAcademic(seq)}
                  className="academic-delete-btn"
                >
                  삭제
                </button>
              </div>
            </>
          )}
        </section>


        <section className="mypage-section">
          <h2>자격증 정보</h2>

          {certifications.length === 0 ? (
            <div className="empty-state">
              <p>등록된 자격증 정보가 없습니다.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="certification-table">
                <thead>
                  <tr>
                    <th>자격증명</th>
                    <th>발급기관</th>
                    <th>합격일자</th>
                    <th>자격증 번호</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {certifications.map((cert) => (
                    <tr key={`${cert.STUDENT_SEQ}-${cert.SORT}`}>
                      <td>{cert.CERT_NAME || '없음'}</td>
                      <td>{cert.ISSUER || '없음'}</td>
                      <td>{cert.PASS_DT || '없음'}</td>
                      <td>{cert.CERT_NO || '없음'}</td>
                      <td>
                        <button
                          onClick={() => handleCertificationDelete(cert.SORT)}
                          className="delete-btn"
                          style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="button-wrapper" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '15px'
          }}>
            <span style={{ color: 'gray', fontSize: '12px' }}>
              잘못 입력된 정보는 삭제 후 다시 등록해주세요.
            </span>
            <button className="btn btn-primary" onClick={() => setIsCertificationModalOpen(true)}>
              자격증 정보 추가
            </button>
          </div>
        </section>

        <AddEduModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          studentSeq={studentSeq}  // URL에서 가져온 시퀀스 전달
        />

        <AddCertModal
          isOpen={isCertificationModalOpen}
          onClose={() => setIsCertificationModalOpen(false)}
          onSave={handleCertificationSave}
          studentSeq={parseInt(seq)}
          sort={1}
        />
      </div>
    </div>
  );
}

export default Mypage;