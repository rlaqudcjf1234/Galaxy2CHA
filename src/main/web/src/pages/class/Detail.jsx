import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const { seq } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(false);

      // 데이터 요청
      const fetchData = async () => {
        setLoading(true);
        try {
            const params = {};
            const response = await axios.get(`/api/class/${seq}`, { params });
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("과정 정보를 불러오는데 실패했습니다.");
            navigate("/class");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchData();
    }, [seq]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (!items) return <div className="p-4">No data available</div>;
    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-7 overflow-auto p-0">
                    <div className="d-flex justify-content-center">
                        <section className="w-80 bg-white p-4">
                            <h1 className="fs-2 fw-bold mb-4">강의 소개</h1>
                            <div className="mb-4">
                                <h2 className="fs-3 fw-bold mb-3">강의 개요</h2>
                                <p className="text-secondary">
                                    {items.DESCRIPTION || '강의 설명이 곧 업데이트될 예정입니다.'}
                                </p>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="col-5 border-start p-0">
                    <div className="sticky-top w-100">
                        <section className="bg-white p-4">
                            <h2 className="fs-2 fw-bold mb-4">
                                {items.LECTURE_NAME} [{items.ROUND}기]
                            </h2>
                            <div className="bg-light p-4">
                                <div className="mb-4 d-flex">
                                    <h3 className="fw-semibold text-secondary fs-6 mb-0" style={{ width: '100px' }}>
                                        과정명
                                    </h3>
                                    <p className="mb-0">{items.LECTURE_NAME}</p>
                                </div>
                                <div className="mb-4 d-flex">
                                    <h3 className="fw-semibold text-secondary fs-6 mb-0" style={{ width: '100px' }}>
                                        강사명
                                    </h3>
                                    <p className="mb-0">{items.ADMIN_NAME} 강사님</p>
                                </div>
                                <div className="mb-4 d-flex">
                                    <h3 className="fw-semibold text-secondary fs-6 mb-0" style={{ width: '100px' }}>
                                        강의 기간
                                    </h3>
                                    <p className="mb-0">{`${items.START_DT} - ${items.END_DT}`}</p>
                                </div>
                                <div className="mb-4 d-flex">
                                    <h3 className="fw-semibold text-secondary fs-6 mb-0" style={{ width: '100px' }}>
                                        강의 시간
                                    </h3>
                                    <p className="mb-0">{`${items.START_TM} - ${items.END_TM}`}</p>
                                </div>
                                <div className="mb-4 d-flex">
                                    <h3 className="fw-semibold text-secondary fs-6 mb-0" style={{ width: '100px' }}>
                                        수강 정원
                                    </h3>
                                    <p className="mb-0">{items.PEOPLE}명</p>
                                </div>
                                {items.USE_YN === '1' && (
                                    <div className="mt-4">
                                        <button
                                            className="btn btn-primary w-100 py-3 fw-semibold rounded-3"
                                            onClick={() => console.log('Enrolling in class:', seq)}
                                        >
                                            수강 신청하기
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;