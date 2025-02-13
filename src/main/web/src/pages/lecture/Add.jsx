import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const navigate = useNavigate();

    /** 뒤로가기 */
    const handleHistoryBack = () => {
        navigate(-1);
    }
    const [codes, setCodes] = useState({
        division: [],
        category: []
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    // 페이지 최초 데이터 요청
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

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchCodes();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 폼 데이터를 객체로 변환
            const formElement = e.target;
            const data = {
                division: formElement.division.value,
                category: formElement.category.value,
                name: formElement.name.value
            };
            const response = await axios.post("/api/lecture/add", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate("/lecture");
        } catch (error) {
            const response = error.response;
            if (response && response.data) {
                setErrors(response.data)
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table className="table">
                    <caption>
                        <span>
                            <em>홈</em>
                            <em>교육과정현황</em>
                            <strong>교육과정등록</strong>
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
                                <select
                                    name="division"
                                    className="form-control"
                                    defaultValue=""
                                    required="required">
                                    <option value="">선택</option>
                                    {codes.division.map((item) => (
                                        <option key={item.CODE_ID} value={item.CODE_ID}>
                                            {item.CODE_NAME}
                                        </option>
                                    ))}
                                </select>
                                {errors.division && (
                                    <div className="invalid-feedback d-block">
                                        {errors.division}
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>카테고리</th>
                            <td>
                                <select
                                    name="category"
                                    className="form-control"
                                    defaultValue=""
                                    required="required">
                                    <option value="">선택</option>
                                    {codes.category.map((item) => (
                                        <option key={item.CODE_ID} value={item.CODE_ID}>
                                            {item.CODE_NAME}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>강의명</th>
                            <td>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    name="name"
                                    required="required"
                                    placeholder="강의명을 입력해주세요."
                                />
                                {errors.name && (
                                    <div className="invalid-feedback d-block">
                                        {errors.name}
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">등록</button>
                    <button type="button" className="btn btn-secondary" onClick={handleHistoryBack}>취소</button>
                </div>
            </form>
        </div >
    )
}

export default Add;