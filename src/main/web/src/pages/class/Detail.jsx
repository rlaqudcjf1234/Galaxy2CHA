import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dompurify from "dompurify";

const Detail = () => {
    const { lecture_seq, seq } = useParams();
    const navigate = useNavigate();
    const [clas, setClas] = useState(null);
    const [lectureDoc, setLectureDoc] = useState({ plan: [], award: [], progress: [], capacity: [], procedure: [] });
    const [loading, setLoading] = useState(false);
    const [enrolling, setEnrolling] = useState(false);

    // 데이터 요청
    const fetchData = async () => {
        setLoading(true);
        try {
            const response1 = await axios.get(`/api/class/${seq}`);
            console.log("데이타 확인용", response1.data);
            setClas(response1.data);
            const response2 = await axios.get(`/api/lectureDoc/list`, {
                params: {
                    lecture_seq: lecture_seq,
                },
            });
            setLectureDoc(response2.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("과정 정보를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Fetching Data");
        fetchData();
    }, [seq]);

    const handleApply = () => {
        // apply/add 페이지로 이동하면서 class_seq와 lecture_seq를 state로 전달
        navigate("/apply/add", {
            state: {
                class_seq: seq,
                lecture_seq: lecture_seq,
                classInfo: clas, // 추가 정보도 함께 전달 (필요시)
            },
        });
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (!clas) return <div className="p-4">No data available</div>;
    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-7 overflow-auto p-0">
                    <div className="d-flex justify-content-center">
                        <section className="w-80 bg-white p-4">
                            {lectureDoc.plan?.length > 0
                                ? lectureDoc.plan.map((item, index) => (
                                      <div key={index}>
                                          <h1 className="fs-2 fw-bold mb-4">강의설명</h1>
                                          <div
                                              className="mb-4"
                                              dangerouslySetInnerHTML={{
                                                  __html: Dompurify.sanitize(String(item || "")),
                                              }}
                                          ></div>
                                      </div>
                                  ))
                                : null}
                            {lectureDoc.award?.length > 0
                                ? lectureDoc.award.map((item, index) => (
                                      <div key={index}>
                                          <h1 className="fs-2 fw-bold mb-4">수상내역</h1>
                                          <div
                                              className="mb-4"
                                              dangerouslySetInnerHTML={{
                                                  __html: Dompurify.sanitize(String(item || "")),
                                              }}
                                          ></div>
                                      </div>
                                  ))
                                : null}
                            {lectureDoc.progress?.length > 0
                                ? lectureDoc.progress.map((item, index) => (
                                      <div key={index}>
                                          <h1 className="fs-2 fw-bold mb-4">진행과정</h1>
                                          <div
                                              className="mb-4"
                                              dangerouslySetInnerHTML={{
                                                  __html: Dompurify.sanitize(String(item || "")),
                                              }}
                                          ></div>
                                      </div>
                                  ))
                                : null}
                            {lectureDoc.capacity?.length > 0
                                ? lectureDoc.capacity.map((item, index) => (
                                      <div key={index}>
                                          <h1 className="fs-2 fw-bold mb-4">필요자격</h1>
                                          <div
                                              className="mb-4"
                                              dangerouslySetInnerHTML={{
                                                  __html: Dompurify.sanitize(String(item || "")),
                                              }}
                                          ></div>
                                      </div>
                                  ))
                                : null}
                            {lectureDoc.procedure?.length > 0
                                ? lectureDoc.procedure.map((item, index) => (
                                      <div key={index}>
                                          <h1 className="fs-2 fw-bold mb-4">취업과정</h1>
                                          <div
                                              className="mb-4"
                                              dangerouslySetInnerHTML={{
                                                  __html: Dompurify.sanitize(String(item || "")),
                                              }}
                                          ></div>
                                      </div>
                                  ))
                                : null}
                        </section>
                    </div>
                </div>

                <div className="col-5 border-start p-0">
                    <div className="sticky-top w-100">
                        <section className="bg-white p-4">
                            <h2 className="fs-2 fw-bold mb-4">
                                {clas.LECTURE_NAME}[{clas.ROUND}기]
                            </h2>
                            <div className="bg-light p-4">
                                <div className="mb-4 d-flex">
                                    <h3
                                        className="fw-semibold text-secondary fs-6 mb-0"
                                        style={{
                                            width: "100px",
                                        }}
                                    >
                                        과정명
                                    </h3>
                                    <p className="mb-0">{clas.LECTURE_NAME}</p>
                                </div>
                                <div className="mb-4 d-flex">
                                    <h3
                                        className="fw-semibold text-secondary fs-6 mb-0"
                                        style={{
                                            width: "100px",
                                        }}
                                    >
                                        강사명
                                    </h3>
                                    <p className="mb-0">
                                        {clas.ADMIN_NAME}
                                        강사님
                                    </p>
                                </div>
                                <div className="mb-4 d-flex">
                                    <h3
                                        className="fw-semibold text-secondary fs-6 mb-0"
                                        style={{
                                            width: "100px",
                                        }}
                                    >
                                        강의 기간
                                    </h3>
                                    <p className="mb-0">{`${clas.START_DT} - ${clas.END_DT}`}</p>
                                </div>
                                <div className="mb-4 d-flex">
                                    <h3
                                        className="fw-semibold text-secondary fs-6 mb-0"
                                        style={{
                                            width: "100px",
                                        }}
                                    >
                                        강의 시간
                                    </h3>
                                    <p className="mb-0">{`${clas.START_TM} - ${clas.END_TM}`}</p>
                                </div>
                                <div className="mb-4 d-flex">
                                    <h3
                                        className="fw-semibold text-secondary fs-6 mb-0"
                                        style={{
                                            width: "100px",
                                        }}
                                    >
                                        수강 정원
                                    </h3>
                                    <p className="mb-0">{clas.PEOPLE}명</p>
                                </div>
                                {clas && String(clas.USE_YN) === "1" && (
                                    <div className="mt-4">
                                        <button
                                            className="btn btn-primary w-100 py-3 fw-semibold rounded-3"
                                            onClick={handleApply}
                                            disabled={enrolling}
                                        >
                                            {enrolling ? "신청 중..." : "수강 신청하기"}
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
