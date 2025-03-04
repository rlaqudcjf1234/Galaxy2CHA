import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import "../../css/AddEduModal.css";

const API_KEY = "b93f9c4d061f8bbda16f9c406da1a88d";

// Custom debounce hook
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};

// 전공 자동완성을 위한 함수
const fetchMajors = async (keyword, schoolLevel) => {
    if (!keyword.trim() || keyword.length < 2) return [];

    try {
        const response = await fetch(
            `https://www.career.go.kr/cnet/openapi/getOpenApi.json?apiKey=${API_KEY}` +
            `&svcType=api&svcCode=MAJOR&contentType=json` +
            `&gubun=${schoolLevel === 'high' ? 'high_list' : 'univ_list'}` +
            `&searchTitle=${encodeURIComponent(keyword)}`
        );

        const data = await response.json();
        if (data.dataSearch && Array.isArray(data.dataSearch.content)) {
            return data.dataSearch.content.map(item => ({
                name: item.mClass || item.facilName,
                lClass: item.lClass || '기타',
                majorSeq: item.majorSeq
            }));
        }
        return [];
    } catch (error) {
        console.error("학과 검색 실패:", error);
        return [];
    }
};

const SearchSchoolModal = ({ isOpen, onClose, onSelect, schoolLevel }) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState(null);

    //학교 선택 핸들러
    const handleSchoolClick = (school) => {
        setSelectedSchool(school);
    };

    // 선택 버튼 핸들러
    const handleSelect = () => {
        if (selectedSchool) {
            onSelect(selectedSchool);
            onClose();
        }
    };

    // 검색어 디바운스 처리
    const debouncedSearchTerm = useDebounce(searchKeyword, 300);

    const fetchSchools = async (keyword) => {
        if (!keyword.trim() || keyword.length < 2) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // 고등학교와 대학교를 동시에 검색
            const highSchoolPromise = fetch(
                `https://www.career.go.kr/cnet/openapi/getOpenApi.json?apiKey=${API_KEY}` +
                `&svcType=api&svcCode=SCHOOL&contentType=json` +
                `&gubun=high_list` +
                `&searchSchulNm=${encodeURIComponent(keyword)}`
            );

            const univPromise = fetch(
                `https://www.career.go.kr/cnet/openapi/getOpenApi.json?apiKey=${API_KEY}` +
                `&svcType=api&svcCode=SCHOOL&contentType=json` +
                `&gubun=univ_list` +
                `&searchSchulNm=${encodeURIComponent(keyword)}`
            );

            const [highSchoolResponse, univResponse] = await Promise.all([highSchoolPromise, univPromise]);

            const highSchoolData = await highSchoolResponse.json();
            const univData = await univResponse.json();

            const highSchoolResults = highSchoolData.dataSearch && Array.isArray(highSchoolData.dataSearch.content)
                ? highSchoolData.dataSearch.content
                : [];

            const univResults = univData.dataSearch && Array.isArray(univData.dataSearch.content)
                ? univData.dataSearch.content
                : [];

            // 두 결과 합치기
            const combinedResults = [...highSchoolResults, ...univResults];

            setSearchResults(combinedResults);
            setShowSuggestions(combinedResults.length > 0);
        } catch (error) {
            console.error("검색 실패:", error);
            setError("학교 정보를 검색하는 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    // 디바운스된 검색어가 변경될 때마다 검색 실행
    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSchools(debouncedSearchTerm);
        } else {
            setSearchResults([]);
            setShowSuggestions(false);
        }
    }, [debouncedSearchTerm]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchKeyword(value);

        if (value.length < 2) {
            setSearchResults([]);
            setShowSuggestions(false);
        }
    };

    const handleSchoolSelect = (school) => {
        setSearchKeyword(school.schoolName);
        setShowSuggestions(false);
        onSelect(school);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="search-modal-overlay">
            <div className="search-modal-content">
                <div className="search-modal-header">
                    <h3>학교 검색</h3>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="search-box">
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={handleInputChange}
                            placeholder="학교명을 2글자 이상 입력하세요"
                            className="search-input"
                            autoComplete="off"
                        />
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="search-results">
                    {isLoading ? (
                        <div className="no-results">검색중...</div>
                    ) : showSuggestions && searchResults.length > 0 ? (
                        searchResults.map((school, index) => (
                            <div
                                key={index}
                                className="search-result-item"
                            >
                                <div className="result-content">
                                    <div className="school-name">{school.schoolName}</div>
                                    <div className="school-info">
                                        <span>{school.region}</span>
                                        <span>•</span>
                                        <span>{school.estType}</span>
                                        {school.schoolType && (
                                            <>
                                                <span>•</span>
                                                <span>{school.schoolType}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="select-button"
                                    onClick={() => handleSchoolSelect(school)}
                                >
                                    선택
                                </button>
                            </div>
                        ))
                    ) : searchKeyword.length >= 2 && !isLoading ? (
                        <div className="no-results">
                            검색 결과가 없습니다.
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

// 전공 검색 모달 컴포넌트
const SearchMajorModal = ({ isOpen, onClose, onSelect, schoolLevel }) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMajor, setSelectedMajor] = useState(null);

    const debouncedSearchTerm = useDebounce(searchKeyword, 300);

    useEffect(() => {
        const searchMajors = async () => {
            if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const results = await fetchMajors(debouncedSearchTerm, schoolLevel);
                setSearchResults(results);
            } catch (error) {
                console.error("전공 검색 실패:", error);
                setError("전공 정보를 검색하는 중 오류가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        searchMajors();
    }, [debouncedSearchTerm, schoolLevel]);

    const handleInputChange = (e) => {
        setSearchKeyword(e.target.value);
        setSelectedMajor(null);
    };

    const handleMajorClick = (major) => {
        setSelectedMajor(major);
    };

    const handleSelect = () => {
        if (selectedMajor) {
            onSelect(selectedMajor);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="search-modal-overlay">
            <div className="search-modal-content">
                <div className="search-modal-header">
                    <h3>학과(전공) 검색</h3>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="search-box">
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={handleInputChange}
                            placeholder="학과(전공)명을 2글자 이상 입력하세요"
                            className="search-input"
                            autoComplete="off"
                        />
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="search-results">
                    {isLoading ? (
                        <div className="no-results">검색중...</div>
                    ) : searchResults.length > 0 ? (
                        searchResults.map((major, index) => (
                            <div
                                key={index}
                                className="search-result-item"
                            >
                                <div className="result-content">
                                    <div className="major-name">{major.name}</div>
                                    <div className="major-category">({major.lClass})</div>
                                </div>
                                <button
                                    type="button"
                                    className="select-button"
                                    onClick={() => {
                                        onSelect(major);
                                        onClose();
                                    }}
                                >
                                    선택
                                </button>
                            </div>
                        ))
                    ) : searchKeyword.length >= 2 ? (
                        <div className="no-results">검색 결과가 없습니다.</div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};




const AddEduModal = ({ isOpen, onClose, onSave, studentSeq }) => {
    const [formData, setFormData] = useState({
        STUDENT_SEQ: studentSeq,
        FINAL_SCHOOL_LEVEL: "",
        FINAL_SCHOOL_NAME: "",
        FINAL_SCHOOL_LESSON: "",
        FINAL_SCHOOL_SPECIALITY: "0",
        GRADUATE_YN: "",
        REG_DT: new Date().toISOString().split('T')[0]
    });

    const handleMajorSelect = (major) => {
        setFormData(prev => ({
            ...prev,
            FINAL_SCHOOL_LESSON: major.name
        }));
    };

    const handleMajorCheckboxChange = (e) => {
        setFormData(prev => ({
            ...prev,
            FINAL_SCHOOL_SPECIALITY: e.target.checked ? "1" : "0"
        }));
    };

    const [isSearchSchoolModalOpen, setIsSearchSchoolModalOpen] = useState(false);
    const [isSearchMajorModalOpen, setIsSearchMajorModalOpen] = useState(false);
    const [error, setError] = useState(null);


    // 전공 자동완성 상태 추가
    const [majorSuggestions, setMajorSuggestions] = useState([]);
    const debouncedMajorTerm = useDebounce(formData.FINAL_SCHOOL_LESSON, 300);

    // 전공 자동완성 검색 효과
    useEffect(() => {
        const searchMajors = async () => {
            if (formData.FINAL_SCHOOL_LEVEL && debouncedMajorTerm) {
                const suggestions = await fetchMajors(debouncedMajorTerm, formData.FINAL_SCHOOL_LEVEL);
                setMajorSuggestions(suggestions);
            } else {
                setMajorSuggestions([]);
            }
        };

        searchMajors();
    }, [debouncedMajorTerm, formData.FINAL_SCHOOL_LEVEL]);

    // 학과 입력 핸들러
    const handleMajorInputChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            FINAL_SCHOOL_LESSON: value
        }));
        // 입력값이 2글자 미만이면 suggestions 초기화
        if (value.length < 2) {
            setMajorSuggestions([]);
        }
    };

    // 모달이 닫힐 때 폼 데이터 초기화
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                FINAL_SCHOOL_LEVEL: "",
                FINAL_SCHOOL_NAME: "",
                FINAL_SCHOOL_LESSON: "",
                FINAL_SCHOOL_SPECIALITY: "0",
                GRADUATE_YN: ""
            });
            setError(null);
        }
    }, [isOpen]);

    const handleSchoolSelect = (school) => {
        setFormData(prev => ({
            ...prev,
            FINAL_SCHOOL_NAME: school.schoolName
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 필수 필드 검증
        const requiredFields = {
            FINAL_SCHOOL_LEVEL: '최종학력',
            FINAL_SCHOOL_NAME: '학교명',
            GRADUATE_YN: '졸업여부'
        };

        const missingFields = Object.entries(requiredFields)
            .filter(([key]) => !formData[key])
            .map(([, label]) => label);

        if (missingFields.length > 0) {
            alert(`다음 필수 항목을 입력해주세요:\n${missingFields.join('\n')}`);
            return;
        }

        try {
            await onSave(formData);
            // onClose()는 onSave 성공 시 호출됨
        } catch (error) {
            console.error('Form submission error:', error);
            alert('학력 정보 등록에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2 className="modal-title">학력 정보 추가</h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <div>
                            <label className="form-label">
                                최종학력
                                <span className="required-mark">*필수</span>
                            </label>
                            <select
                                className="form-input"
                                value={formData.FINAL_SCHOOL_LEVEL}
                                onChange={(e) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        FINAL_SCHOOL_LEVEL: e.target.value,
                                        FINAL_SCHOOL_NAME: "",
                                        FINAL_SCHOOL_LESSON: ""
                                    }));
                                }}
                                required
                            >
                                <option value="">최종학력을 선택하세요</option>
                                <option value="20">중학교</option>
                                <option value="30">고등학교</option>
                                <option value="40">대학교(2,3년제제)</option>
                                <option value="50">대학교(4년제)</option>
                                <option value="60">석사졸업</option>
                            </select>
                        </div>

                        <div>
                            <label className="form-label">
                                학교명
                                <span className="required-mark">*필수</span>
                            </label>
                            <div className="school-input-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.FINAL_SCHOOL_NAME}
                                    readOnly
                                    placeholder="학교검색 버튼을 클릭하세요"
                                    required
                                />
                                <button
                                    type="button"
                                    className="search-school-btn"
                                    onClick={() => setIsSearchSchoolModalOpen(true)}
                                    disabled={!formData.FINAL_SCHOOL_LEVEL}
                                >
                                    <Search size={20} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="form-label">학과(전공)</label>
                            <div className="school-input-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.FINAL_SCHOOL_LESSON}
                                    readOnly
                                    placeholder="학과 검색 버튼을 클릭하세요"
                                    required
                                />
                                <button
                                    type="button"
                                    className="search-school-btn"
                                    onClick={() => setIsSearchMajorModalOpen(true)}
                                    disabled={!formData.FINAL_SCHOOL_LEVEL}
                                >
                                    <Search size={20} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="form-label checkbox-label">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={formData.FINAL_SCHOOL_SPECIALITY === "1"}
                                    onChange={handleMajorCheckboxChange}
                                />
                                전공여부
                            </label>
                            <p className="job-match-text">
                                *취업희망 직종과 일치하면 체크
                            </p>
                        </div>

                        <div>
                            <label className="form-label">
                                졸업여부
                                <span className="required-mark">*필수</span>
                            </label>
                            <select
                                className="form-input"
                                value={formData.GRADUATE_YN}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    GRADUATE_YN: e.target.value
                                }))}
                                required
                            >
                                <option value="">졸업여부를 선택하세요</option>
                                <option value="10">재학주간</option>
                                <option value="20">재학야간</option>
                                <option value="30">휴학</option>
                                <option value="40">중퇴</option>
                                <option value="50">졸업</option>
                                <option value="60">검정고시</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={onClose}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="btn-save"
                        >
                            저장
                        </button>
                    </div>
                </form>

                <SearchSchoolModal
                    isOpen={isSearchSchoolModalOpen}
                    onClose={() => setIsSearchSchoolModalOpen(false)}
                    onSelect={handleSchoolSelect}
                    schoolLevel={formData.FINAL_SCHOOL_LEVEL}
                />
                <SearchMajorModal
                    isOpen={isSearchMajorModalOpen}
                    onClose={() => setIsSearchMajorModalOpen(false)}
                    onSelect={handleMajorSelect}
                    schoolLevel={formData.FINAL_SCHOOL_LEVEL}
                />
            </div>
        </div>
    );
};

export default AddEduModal; 