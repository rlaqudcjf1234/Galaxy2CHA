import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Mod() {
    const navigate = useNavigate();
    const params = useParams();

    // 실제로 수정 가능한 필드만 formData에 포함
    const [formData, setFormData] = useState({
        name: ''
    });

    const [codes, setCodes] = useState({
        division: [],
        category: []
    });

    const [lecture, setLecture] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // 코드 데이터 요청
    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/use", {
                params: {
                    "text": "lectureMod"
                }
            });
            response.data.forEach(item => {
                setCodes(prevCodes => ({
                    ...prevCodes,
                    [item.name]: item.value
                }));
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    // 기존 강의 정보 불러오기    
    const fetchLecture = async () => {
        try {
            const response = await axios.get('/api/lecture/mod', {
                params: { seq: params.seq }
            });

            if (response.data) {
                setLecture(response.data);
                setFormData({
                    name: response.data.NAME || ''
                });
            }
        } catch (error) {
            console.error('Error fetching lecture:', error);
            setErrors(prev => ({
                ...prev,
                general: '강의 정보를 불러오는데 실패했습니다.'
            }));
        }
    };

    // 입력 값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // 에러 메시지 초기화
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = '강의명을 입력해주세요.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // 폼 검증
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        try {
            const data = {
                seq: params.seq,
                name: formData.name.trim(),
                division: lecture.DIVISION, 
                category: lecture.CATEGORY
            };

            const response = await axios.post('/api/lecture/mod', data);
                
            if (response.data) {
                navigate("/lecture");
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors({
                general: error.response?.data?.message || '강의 수정 중 오류가 발생했습니다.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchCodes(), fetchLecture()]);
            setLoading(false);
        };

        loadData();
    }, []);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">로딩중...</span>
            </div>
        </div>
    );

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table className="table">
                    <caption>
                        <span>
                            <em>홈</em>
                            <em>교육과정현황</em>
                            <em>강의상세</em>
                            <strong>교육과정수정</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col width="20%" />
                        <col width="80%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>구분</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    value={codes.division.find(item =>
                                        String(item.CODE_ID) === String(lecture.DIVISION)
                                    )?.CODE_NAME || ''}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>카테고리</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    value={codes.category.find(item =>
                                        String(item.CODE_ID) === String(lecture.CATEGORY)
                                    )?.CODE_NAME || ''}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>강의명</th>
                            <td>
                                <input
                                    id="name"
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="강의명을 입력해주세요."
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>등록자</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    value={lecture.ADMIN_NAME || ''}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>등록일자</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    value={lecture.REG_DT || ''}
                                    readOnly
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? '처리중...' : '수정'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        취소
                    </button>
                </div>
            </form>

            {errors.general && (
                <div className="alert alert-danger mt-3" role="alert">
                    {errors.general}
                </div>
            )}
        </div>
    );
}

export default Mod;