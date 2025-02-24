import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { authenticatedRequest as axios } from "../../plugins/axios";

const Add = () => {
    const navigate = useNavigate();

    /** 뒤로가기 */
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [question, setQuestion] = useState({});

    const params = useParams();
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchFormData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/survey/read", {
                params: {
                    "question_seq": params.question_seq
                }
            });
            setQuestion(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchFormData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            const response = await axios.post("/api/survey/add", formData);
            navigate(`/survey`);
        } catch (error) {
            console.error('Error handleSubmit data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* 폼 영역 */}
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="seq" value={params.question_seq} />
                <table className="table">
                    {/* 헤더 영역 */}
                    <caption>
                        <span>
                            <strong>{question.TITLE}</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td className="text-align-left fs-4 fw-bolder">
                                {question.DETAIL}
                            </td>
                        </tr>
                    </tbody>
                    {
                        question.qsItems?.map((qsItem, index) => (
                            <tbody key={qsItem.SORT} className='border-top-double'>
                                <tr>
                                    <td className="text-align-left fs-6 fw-bold">
                                        <input type="hidden" name={`qsResults[${index}].sort`} value={qsItem.SORT} />
                                        {qsItem.SORT}.&nbsp;{qsItem.TITLE}
                                    </td>
                                </tr>
                                {
                                    qsItem.DIVISION == "short" && (
                                        <tr>
                                            <td>
                                                <input type="text" className="form-control" name={`qsResults[${index}].results`}
                                                    defaultValue={qsItem.RESULT} required />
                                            </td>
                                        </tr>
                                    )
                                }
                                {
                                    qsItem.DIVISION == "long" && (
                                        <tr>
                                            <td>
                                                <textarea className="form-control" name={`qsResults[${index}].results`} style={{ resize: "none" }} rows="2"
                                                    defaultValue={qsItem.RESULT} required />
                                            </td>
                                        </tr>
                                    )
                                }
                                {
                                    qsItem.DIVISION == "radio" && (
                                        <tr>
                                            <td>
                                                <ul className="mb-0">
                                                    {
                                                        qsItem.ITEMS?.map((item, subIndex) => (
                                                            <li className="text-align-left fs-6" key={subIndex}>
                                                                <input type="radio" className="form-check-input"
                                                                    name={`qsResults[${index}].results`}
                                                                    id={`qsResults[${index}].items[${subIndex}]`}
                                                                    value={subIndex}
                                                                    defaultChecked={qsItem.RESULT == subIndex}
                                                                    required />
                                                                <label className="form-check-label" htmlFor={`qsResults[${index}].items[${subIndex}]`}>{item}</label>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </td>
                                        </tr>
                                    )
                                }
                                {
                                    qsItem.DIVISION == "check" && (
                                        <tr>
                                            <td>
                                                <ul className="mb-0">
                                                    {
                                                        qsItem.ITEMS?.map((item, subIndex) => (
                                                            <li className="text-align-left fs-6" key={subIndex}>
                                                                <input type="checkbox" className="form-check-input"
                                                                    name={`qsResults[${index}].results`}
                                                                    id={`qsResults[${index}].items[${subIndex}]`}
                                                                    value={subIndex}
                                                                    defaultChecked={qsItem.RESULT?.indexOf(subIndex) > -1} />
                                                                <label className="form-check-label" htmlFor={`qsResults[${index}].items[${subIndex}]`}>{item}</label>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        ))
                    }
                </table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    {question.SURVEY > 0 ? null : (<button type="submit" className="btn btn-primary">제출</button>)}
                    <button type="button" className="btn btn-secondary" onClick={handleHistoryBack}>{question.SURVEY > 0 ? "확인" : "취소"}</button>
                </div>
            </form>
        </div>
    );
}

export default Add;