import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Read = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [lecture, setLecture] = useState(null);
    const [loading, setLoading] = useState(false);
    const [codes, setCodes] = useState({
        division: [],
        category: []
    });

    const fetchLecture = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/lecture/read", {
                params: {
                    seq: params.seq,
                },
            });
            setLecture(response.data);
        } catch (error) {
            console.error('Error fetching lecture:', error);
            alert("강의 정보를 불러오는데 실패했습니다.");
            navigate("/lecture");
        } finally {
            setLoading(false);
        }
    };
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


    useEffect(() => {
        fetchLecture();
        fetchCodes();
    }, []);

    // 이전 페이지로 가기
    const handleGoBack = () => {
        navigate(-1);
    };

 

    if (loading) return <div>로딩중...</div>;
    if (!lecture) return <div>강의를 찾을 수 없습니다.</div>;

    return (
        <div>
            <form>
                <table className="table">
                    {/* 헤더 영역 */}
                    <caption>
                        <span>
                            <em>홈</em>
                            <em>교육과정현황</em>
                            <strong>강의상세</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col width="18%" />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>구분</th>
                            <td>
                                <input
                                    type="text"
                                    name="division"
                                    value={codes.division.find(item => 
                                        String(item.CODE_ID) === String(lecture.DIVISION)
                                    )?.CODE_NAME || ''}
                                    className="form-control-plaintext"
                                    readOnly
                                />  
                            </td>
                        </tr>
                        <tr>
                            <th>카테고리</th>
                            <td>
                                <input
                                    type="text"
                                    name="category"
                                    value={codes.category.find(item => 
                                        String(item.CODE_ID) === String(lecture.CATEGORY)
                                    )?.CODE_NAME || ''}
                                    className="form-control-plaintext"
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>강의명</th>
                            <td>
                                <input
                                    type="text"
                                    value={lecture.NAME || ''}
                                    className="form-control-plaintext"
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>등록자</th>
                            <td>
                                <input
                                    type="text"
                                    value={lecture.ADMIN_NAME || ''}
                                    className="form-control-plaintext"
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>등록일자</th>
                            <td>
                                <input
                                    type="text"
                                    value={lecture.REG_DT || ''}
                                    className="form-control-plaintext"
                                    readOnly
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate(`/lecture/mod/${params.seq}`)}>
                        수정
                    </button>                   
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleGoBack}>
                        목록
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Read;