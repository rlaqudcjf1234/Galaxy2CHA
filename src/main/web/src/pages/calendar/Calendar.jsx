import React, { useState, useEffect } from 'react';
import { authenticatedRequest as axios } from "../../plugins/axios";
import '../../css/calendar.css';

const AttendanceForm = ({ selectedDate, onStatusUpdate, calendarData, selectedEvent, onResetForm }) => {
    const [division, setDivision] = useState(''); // 기본값 설정
    const [memo, setMemo] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [classInfo, setClassInfo] = useState(null);

    // 학생 클래스 정보 가져오기
    const fetchStudentClassInfo = async () => {
        try {
            // 1. API 경로 수정 - /api/student/classinfo → /calendar/classinfo
            // 2. 필요한 파라미터 추가 (year, month)

            // 현재 날짜 정보 가져오기
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1; // JavaScript에서 월은 0부터 시작

            // 수정된 API 호출
            const response = await axios.get('/api/calendar/classinfo', {
                params: {
                    year: year,
                    month: month
                    // SearchDto에 필요한 다른 필드가 있다면 추가
                }
            });

            console.log('클래스 정보 응답:', response.data);
            setClassInfo(response.data);
        } catch (error) {
            console.error('클래스 정보 가져오기 오류:', error);

            // 더 자세한 오류 정보 표시
            if (error.response) {
                console.error('응답 데이터:', error.response.data);
                console.error('응답 상태:', error.response.status);
            }
        }
    };

    // 컴포넌트 마운트 시 클래스 정보 가져오기
    useEffect(() => {
        fetchStudentClassInfo();
    }, []);

    const resetFormFields = () => {
        setDivision(''); // 기본값 설정
        setMemo('');
        setIsEditing(false);
    };

    useEffect(() => {
        if (selectedEvent) {
            console.log('Selected Event:', selectedEvent);
            // 기존 이벤트 정보로 폼 채우기
            setDivision(selectedEvent.DIVISION || '');
            setMemo(selectedEvent.MEMO || '');
            setIsEditing(true);
        } else {
            setIsEditing(false);
            resetFormFields();

            // 이 부분 제거 - 이제 별도의 API를 통해 클래스 정보를 가져오므로
            // calendarData에서 클래스 정보를 가져올 필요가 없음
        }
    }, [selectedDate, calendarData, selectedEvent]);

    // 출석 상태 변환 함수 (코드값 <-> 영문키)
    const getDivisionCode = (koreanName) => {
        const divisionMapping = {
            '결석': 'absence',
            '지각': 'perception',
            '조퇴': 'early',
            '외출': 'outing',
            '병결': 'illness',
            '출석인정': 'attend',
            '휴가': 'vacation'
        };

        return divisionMapping[koreanName] || koreanName;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
    
        // 이벤트가 선택되었는지 확인
        if (!selectedEvent || !selectedEvent.DAILY) {
            alert("수정할 이벤트가 없습니다. 캘린더에서 출석 상태를 선택해주세요.");
            return;
        }
    
        if (!division) {
            alert("출석 상태를 선택해주세요.");
            return;
        }
    
        // 클래스 정보 체크
        if (!classInfo || !classInfo.CLASS_SEQ) {
            console.error('클래스 정보가 없습니다. classInfo:', classInfo);
            alert("클래스 정보를 찾을 수 없습니다. 다시 시도해주세요.");
            return;
        }
    
        try {
            // 선택된 이벤트의 날짜 사용 (selectedEvent.DAILY)
            const eventDate = new Date(selectedEvent.DAILY);
            const year = eventDate.getFullYear();
            const month = String(eventDate.getMonth() + 1).padStart(2, '0');
            const day = String(eventDate.getDate()).padStart(2, '0');
            // 하이픈이 없는 정확한 YYYYMMDD 형식
            const formattedDate = `${year}${month}${day}`;
    
            console.log('이벤트 날짜:', eventDate);
            console.log('포맷된 날짜:', formattedDate);
    
            // 서버 요청 데이터 준비 - 파라미터 이름을 소문자로 사용
            const urlEncodedData = new URLSearchParams();
            urlEncodedData.append('class_seq', String(classInfo.CLASS_SEQ));
            urlEncodedData.append('daily', formattedDate);
            urlEncodedData.append('division', division);
            urlEncodedData.append('memo', memo || '');
    
            // 디버깅을 위한 로그
            console.log('전송할 데이터:', Object.fromEntries(urlEncodedData.entries()));
    
            try {
                const response = await axios.post('/api/calendar/mod', urlEncodedData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
    
                console.log('API 응답:', response);
    
                if (response && response.status === 200) {
                    alert('출석 상태가 수정되었습니다.');
                    resetFormFields();
                    onResetForm();
                    await onStatusUpdate();
                } else {
                    alert('출석 상태 수정에 실패했습니다.');
                }
            } catch (apiError) {
                console.error('API 호출 오류:', apiError);
                console.error('오류 메시지:', apiError.message);
                console.error('응답 상태:', apiError.response?.status);
                console.error('응답 데이터:', apiError.response?.data);
                
                const errorMsg = apiError.response?.data?.error || apiError.message;
                alert(`출석 상태 수정 중 오류 발생: ${errorMsg}`);
            }
        } catch (error) {
            console.error('전체 처리 오류:', error);
            alert('처리 중 오류가 발생했습니다.');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!selectedDate) {
            alert("날짜를 선택해주세요.");
            return;
        }

        if (!division) {
            alert("출석 상태를 선택해주세요.");
            return;
        }

        // 클래스 정보 체크 로직 강화
        if (!classInfo || !classInfo.CLASS_SEQ) {
            console.error('클래스 정보가 없습니다. classInfo:', classInfo);
            alert("클래스 정보를 찾을 수 없습니다. 다시 시도해주세요.");
            return;
        }

        // student_seq가 없을 경우 확인 로그 추가
        if (!classInfo.STUDENT_SEQ && !classInfo.STUDENT_SEQ) {
            console.error('학생 정보가 없습니다:', classInfo);
            alert("학생 정보를 찾을 수 없습니다. 다시 시도해주세요.");
            return;
        }

        // STUDENT_SEQ 또는 STUDENT 중 존재하는 값을 사용
        const studentSeq = classInfo.STUDENT_SEQ || classInfo.STUDENT_SEQ;

        try {
            const selectedDateTime = new Date(selectedDate);
            const year = selectedDateTime.getFullYear();
            const month = String(selectedDateTime.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDateTime.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            console.log('학생 정보:', studentSeq); // 디버깅을 위한 로그 추가

            const urlEncodedData = new URLSearchParams();
            urlEncodedData.append('class_seq', String(classInfo.CLASS_SEQ));
            urlEncodedData.append('student_seq', String(classInfo.STUDENT_SEQ));
            urlEncodedData.append('daily', formattedDate);
            urlEncodedData.append('division', division);
            urlEncodedData.append('memo', memo || '');

            console.log('전송 데이터:', urlEncodedData.toString()); // 디버깅을 위한 로그 추가

            const response = await axios.post("/api/calendar/add", urlEncodedData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.status === 200) {
                alert('출석 상태가 등록되었습니다.');
                resetFormFields();
                onResetForm();
                await onStatusUpdate();
            }
        } catch (error) {
            console.error('Error saving attendance:', error);
            const errorMessage = error.response?.data?.message || error.message;
            alert(`출석 상태 등록 중 오류 발생: ${errorMessage}`);
        }
    };


    return (
        <div className="event-form-container">
            <h3 className="text-lg font-semibold mb-4">출석 상태 관리</h3>
            <form>
                <div>
                    <label className="block mb-2">선택된 날짜</label>
                    <input
                        type="text"
                        value={selectedDate ? new Date(selectedDate).toLocaleDateString() : '날짜를 선택하세요'}
                        className={!selectedDate ? 'placeholder-input' : ''}
                        disabled
                    />
                </div>

                {classInfo && (
                    <>
                        <div>
                            <label className="block mb-2">클래스</label>
                            <input
                                type="text"
                                value={classInfo.CLASS_NAME || ''}
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block mb-2">담당자</label>
                            <input
                                type="text"
                                value={classInfo.ADMIN_NAME || ''}
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block mb-2">강의실</label>
                            <input
                                type="text"
                                value={classInfo.ROOM || ''}
                                disabled
                            />
                        </div>
                    </>
                )}

                <div>
                    <label className="block mb-2">출석 상태</label>
                    <select
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        required
                    >
                        <option value="">상태 선택</option>
                        <option value="absence">결석</option>
                        <option value="perception">지각</option>
                        <option value="early">조퇴</option>
                        <option value="outing">외출</option>
                        <option value="illness">병결</option>
                        <option value="attend">출석인정</option>
                        <option value="vacation">휴가</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2">메모</label>
                    <textarea
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder="사유나 추가 정보를 입력하세요"
                        rows="3"
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                    {isEditing ? (
                        <button
                            type="button"
                            className="submit-button"
                            onClick={handleUpdate}
                        >
                            수정
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="submit-button"
                            onClick={handleSave}
                        >
                            저장
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(() => {
        const today = new Date();
        return {
            year: today.getFullYear(),
            month: today.getMonth() + 1
        };
    });
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);
    const [canceledClasses, setCanceledClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // axios 인터셉터 설정 - JWT 토큰이 모든 요청에 포함되도록 설정
    useEffect(() => {
        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }, []);

    // 데이터 페칭 함수 - 학생 정보를 서버 측에서 처리
    const fetchData = async () => {
        setLoading(true);
        try {
            // 학생의 출석 데이터 가져오기 (서버에서 HttpLoginUtil.getSeq()를 사용)
            const response = await axios.get("/api/calendar/list", {
                params: {
                    year: currentDate.year,
                    month: currentDate.month,
                    tableType: 'STUDENT'
                }
            });
            console.log('출석 데이터 응답:', response.data);
            setAttendanceData(response.data.items || []);

            // 휴강 정보 가져오기 (서버에서 HttpLoginUtil.getSeq()를 사용)
            const cancelResponse = await axios.get("/api/table/list", {
                params: {
                    year: currentDate.year,
                    month: currentDate.month,
                    tableType: 'STUDENT'
                }
            });
            console.log('휴강 데이터 응답:', cancelResponse.data);
            setCanceledClasses(cancelResponse.data.items || []);

        } catch (error) {
            console.error("데이터 가져오기 오류:", error);
            console.error("오류 상세 정보:", error.response?.data);

            if (error.response?.status === 401) {
                alert("인증이 만료되었습니다. 다시 로그인해주세요.");
                // 여기에 로그인 페이지로 이동하는 코드 추가 가능
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentDate.year, currentDate.month]);

    // 폼 리셋 함수
    const resetForm = () => {
        setSelectedDate(null);
        setSelectedEvent(null);
    };

    // 캘린더 그리드 렌더링 함수
    const renderCalendarGrid = () => {
        const year = currentDate.year;
        const month = currentDate.month - 1;
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        // 이전 달의 날짜들
        for (let i = 0; i < firstDay.getDay(); i++) {
            const prevMonthLastDay = new Date(year, month, 0);
            const date = new Date(year, month - 1, prevMonthLastDay.getDate() - firstDay.getDay() + i + 1);
            days.push({ date, isCurrentMonth: false });
        }

        // 현재 달의 날짜들
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const date = new Date(year, month, i);
            days.push({ date, isCurrentMonth: true });
        }

        // 다음 달의 날짜들
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(year, month + 1, i);
            days.push({ date, isCurrentMonth: false });
        }

        return days;
    };

    const days = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <div className="calendar-page-container">
            <div className="calendar-container">
                <div className="calendar-header">
                    <h2 className="calendar-title">{currentDate.year}년 {currentDate.month}월</h2>
                    <div className="calendar-nav">
                        <button onClick={() => setCurrentDate(prev => {
                            let newMonth = prev.month - 1;
                            let newYear = prev.year;
                            if (newMonth < 1) {
                                newMonth = 12;
                                newYear--;
                            }
                            return { year: newYear, month: newMonth };
                        })} disabled={loading}>◀</button>
                        <button onClick={() => setCurrentDate(prev => {
                            let newMonth = prev.month + 1;
                            let newYear = prev.year;
                            if (newMonth > 12) {
                                newMonth = 1;
                                newYear++;
                            }
                            return { year: newYear, month: newMonth };
                        })} disabled={loading}>▶</button>
                    </div>
                </div>
                <div className="calendar-grid">
                    {days.map((day, index) => (
                        <div key={index} className="calendar-weekday">{day}</div>
                    ))}

                    {renderCalendarGrid().map((day, index) => {
                        // 취소된 수업 찾기
                        const dayCanceledClasses = canceledClasses.filter(event => {
                            const eventDate = new Date(event.DAILY);
                            return eventDate.getDate() === day.date.getDate() &&
                                eventDate.getMonth() === day.date.getMonth() &&
                                eventDate.getFullYear() === day.date.getFullYear();
                        });

                        // 학생의 출석 상태 찾기
                        const dayAttendances = attendanceData.filter(event => {
                            const eventDate = new Date(event.DAILY);
                            return eventDate.getDate() === day.date.getDate() &&
                                eventDate.getMonth() === day.date.getMonth() &&
                                eventDate.getFullYear() === day.date.getFullYear();
                        });

                        return (
                            <div
                                key={index}
                                className={`calendar-day 
                                    ${!day.isCurrentMonth ? 'other-month' : ''} 
                                    ${day.date.getDay() === 0 ? 'sunday' : ''} 
                                    ${day.date.getDay() === 6 ? 'saturday' : ''}
                                    ${dayCanceledClasses.length > 0 ? 'cancel-day' : ''}
                                `}
                                onClick={() => {
                                    // 날짜 클릭 시 선택된 이벤트 초기화
                                    setSelectedEvent(null);
                                    // 선택된 날짜 설정
                                    setSelectedDate(day.date.toISOString());
                                }}
                            >
                                <div className="calendar-day-number">
                                    {day.date.getDate()}
                                </div>
                                <div className="calendar-events">
                                    {/* 휴강 표시 */}
                                    {dayCanceledClasses.map((event, idx) => (
                                        <div
                                            key={`cancel-${idx}`}
                                            className="calendar-event status-cancel"
                                        >
                                            {`휴강`}
                                        </div>
                                    ))}

                                    {/* 학생 출석 상태 표시 */}
                                    {dayAttendances.map((event, idx) => (
                                        <div
                                            key={`attend-${idx}`}
                                            className={`calendar-event ${getEventClass(event.DIVISION)}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedEvent(event);
                                                setSelectedDate(day.date.toISOString());
                                            }}
                                        >
                                            {`${event.DIVISION}`}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <AttendanceForm
                selectedDate={selectedDate}
                onStatusUpdate={fetchData}
                calendarData={attendanceData}
                selectedEvent={selectedEvent}
                onResetForm={resetForm}
            />

            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </div>
    );
};

// 이벤트 클래스 스타일 결정 함수
const getEventClass = (division) => {
    switch (division) {
        case '결석':
            return 'absence-event';
        case '지각':
            return 'perception-event';
        case '조퇴':
            return 'early-event';
        case '외출':
            return 'outing-event';
        case '병결':
            return 'illness-event';
        case '출석인정':
            return 'attend-event';
        case '휴가':
            return 'vacation-event';
        default:
            return 'default-event';
    }
};

export default Calendar;