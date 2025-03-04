import React, { useState, useEffect } from 'react';
import { authenticatedRequest as axios } from '../../plugins/axios';
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
  const [studentSeq, setStudentSeq] = useState(null);

  const fetchUserSeq = async () => {
    try {
      const response = await axios.get('/api/student/mypage/current');
      // 응답에서 seq 값 추출 (응답 구조에 따라 달라질 수 있음)
      const seq = response.data.STUDENT_SEQ || response.data.seq;
      return seq;
    } catch (err) {
      console.error('Error fetching user sequence:', err);
      setError('사용자 정보를 불러오는 데 실패했습니다.');
      return null;
    }
  };

  const fetchStudentData = async (seqParam) => {
    const sequenceToUse = seqParam || studentSeq;
    if (!sequenceToUse) return;

    setLoading(true);
    setError(null);

    try {
      const [studentResponse, certResponse, academicResponse] = await Promise.all([
        axios.get(`/api/student/mypage/${sequenceToUse}`),
        axios.get(`/api/student/certification/${sequenceToUse}`),
        axios.get(`/api/student/academic/info/${sequenceToUse}`)
      ]);

      setStudentData(studentResponse.data);
      setCertifications(Array.isArray(certResponse.data) ? certResponse.data : []);
      setAcademicList(academicResponse.data ? academicResponse.data : null);
    } catch (err) {
      console.error('데이터 가져오기 오류:', err);
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

  // academicList에서 항목의 고유 ID를 전달.
  const handleEducationDelete = async () => {
    if (window.confirm('학력 정보를 삭제하시겠습니까?')) {
      try {
        const academicId = academicList[0].ACADEMIC_SEQ || academicList[0].SORT || 1;

        await axios.delete(`/api/student/academic/${studentSeq}/${academicId}`);
        alert('학력 정보가 삭제되었습니다.');
        await fetchStudentData(studentSeq);
      } catch (error) {
        console.error('Failed to delete education:', error);
        alert('학력 정보 삭제에 실패했습니다.');
      }
    }
  };

  const handleCertificationSave = async (certificationData) => {
    try {
      // studentSeq를 명시적으로 사용
      if (!studentSeq) {
        alert('학생 정보를 불러올 수 없습니다.');
        return;
      }

      // URL 파라미터로 studentSeq 사용 (seq 대신)
      await axios.post(`/api/student/certification/${studentSeq}`, certificationData);
      alert('자격증 정보가 성공적으로 등록되었습니다.');
      await fetchStudentData(studentSeq);
      setIsCertificationModalOpen(false);
    } catch (error) {
      console.error('Failed to save certification data:', error);
      alert('자격증 정보 저장에 실패했습니다.');
    }
  };

  const handleCertificationDelete = async (certSort) => {
    if (window.confirm('자격증 정보를 삭제하시겠습니까?')) {
      try {
        // URL 파라미터 seq 대신 studentSeq 사용
        await axios.delete(`/api/student/certification/${studentSeq}/${certSort}`);
        alert('자격증 정보가 삭제되었습니다.');
        await fetchStudentData(studentSeq); // studentSeq 전달
      } catch (error) {
        console.error('자격증 정보 삭제 실패:', error);
        alert('자격증 정보 삭제에 실패했습니다.');
      }
    }
  };

  // 학력 정보 조회 함수
  const getAcademicInfo = async (seqParam) => {
    try {
      const sequenceToUse = seqParam || studentSeq;
      if (!sequenceToUse) return;

      const response = await axios.get(`/api/student/academic/info/${sequenceToUse}`);
      // 응답 데이터가 배열인지 확인하고 처리
      const academicData = Array.isArray(response.data) ? response.data : [response.data];
      setAcademicList(academicData);
      console.log('Academic Info:', academicData); // 데이터 확인용 로그
    } catch (error) {
      console.error('학력 정보 조회 중 오류 발생:', error);
      setAcademicList([]); // 에러 시 빈 배열로 설정
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 로그인된 사용자의 시퀀스를 가져옴
    const initializeUser = async () => {
      const seq = await fetchUserSeq();
      setStudentSeq(seq);

      if (seq) {
        fetchStudentData(seq);
        getAcademicInfo(seq); // 가져온 seq 전달
      }
    };

    initializeUser();
  }, []);

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
                        <td>
                          {academic.FINAL_SCHOOL_LEVEL ?
                            (parseInt(academic.FINAL_SCHOOL_LEVEL) === 20 ? '중학교' :
                              parseInt(academic.FINAL_SCHOOL_LEVEL) === 30 ? '고등학교' :
                                parseInt(academic.FINAL_SCHOOL_LEVEL) === 40 ? '대학교(2,3년제)' :
                                  parseInt(academic.FINAL_SCHOOL_LEVEL) === 50 ? '대학교(4년제)' :
                                    parseInt(academic.FINAL_SCHOOL_LEVEL) === 60 ? '석사졸업' :
                                      academic.FINAL_SCHOOL_LEVEL) : '없음'}
                        </td>
                        <td>
                          {academic.FINAL_SCHOOL_SPECIALITY ?
                            (academic.FINAL_SCHOOL_SPECIALITY === '0' ? '비전공' :
                              academic.FINAL_SCHOOL_SPECIALITY === '1' ? '전공' :
                                academic.FINAL_SCHOOL_SPECIALITY) : '없음'}
                        </td>
                        <td>{academic.FINAL_SCHOOL_LESSON || '없음'}</td>
                        <td>
                          {academic.GRADUATE_YN ?
                            (parseInt(academic.GRADUATE_YN) === 10 ? '재학주간' :
                              parseInt(academic.GRADUATE_YN) === 20 ? '재학야간' :
                                parseInt(academic.GRADUATE_YN) === 30 ? '휴학' :
                                  parseInt(academic.GRADUATE_YN) === 40 ? '중퇴' :
                                    parseInt(academic.GRADUATE_YN) === 50 ? '졸업' :
                                      parseInt(academic.GRADUATE_YN) === 60 ? '검정고시' :
                                        academic.GRADUATE_YN) : '없음'}
                        </td>
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
                  onClick={() => handleEducationDelete()}
                  className="academic-delete-btn"
                >
                  삭제
                </button>
              </div>
            </>
          )}
          <div className="button-wrapper" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '15px'
          }}>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              학력 정보 추가
            </button>
          </div>
        </section>


        <section className="mypage-section">
          <h2>자격증 정보</h2>

          {certifications.length === 0 ? (
            <div className="empty-state">
              <p>등록된 자격증 정보가 없습니다.</p>
            </div>
          ) : (
            <>
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
              <div className="button-wrapper" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '15px'
              }}>
                <span style={{ color: 'gray', fontSize: '12px' }}>
                  잘못 입력된 정보는 삭제 후 다시 등록해주세요.
                </span>
              </div>
            </>
          )}

          <div className="button-wrapper" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '15px'
          }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (studentSeq) {
                  setIsCertificationModalOpen(true);
                } else {
                  alert('학생 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
                }
              }}
            >
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
          studentSeq={studentSeq || ''}  // undefined 방지
          sort={certifications.length > 0 ? certifications.length + 1 : 1}  // 자동으로 정렬 번호 지정
        />
      </div>
    </div>
  );
}

export default Mypage;