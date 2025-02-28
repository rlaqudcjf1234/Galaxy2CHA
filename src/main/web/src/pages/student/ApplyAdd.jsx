import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authenticatedRequest as axios } from "../../plugins/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Community.css";

function ApplyAdd() {
    const navigate = useNavigate();
    const location = useLocation();
    const [classes, setClasses] = useState([]);

    // Detail 페이지에서 전달받은 강의 정보 가져오기
    const passedClassSeq = location.state?.class_seq;
    const passedLectureSeq = location.state?.lecture_seq;
    const passedClassInfo = location.state?.classInfo;

    // Daum 우편번호 스크립트 로드
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // 초기 폼 데이터 설정 - 전달받은 강의 정보가 있으면 사용
    const [formData, setFormData] = useState({
        seq: passedClassSeq || "", // 전달받은 class_seq로 초기화
        name: "",
        jumin: "",
        zipcode: "",
        address1: "",
        address2: "",
        real_zipcode: "",
        real_address1: "",
        real_address2: "",
        email: "",
        phone: "",
        path: "",
    });

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get("/api/class/list");
                // items 배열 추출 및 필드명 매핑
                const classData = response.data.items.map((item) => ({
                    seq: item.SEQ,
                    round: item.ROUND,
                    lecture_name: item.LECTURE_NAME,
                    start_dt: item.START_DT,
                    lecture_seq: item.LECTURE_SEQ, // lecture_seq도 추가
                }));
                setClasses(classData);
                console.log("변환된 클래스 데이터:", classData); // 데이터 확인용

                // 클래스 데이터가 로드되면 전달받은 class_seq에 해당하는 항목 선택
                if (passedClassSeq && classData.length > 0) {
                    // 이미 formData에 초기값으로 설정되어 있음
                    console.log(`전달받은 class_seq(${passedClassSeq})로 선택됨`);
                }
            } catch (error) {
                console.error("Error fetching classes:", error);
                setClasses([]);
            }
        };
        fetchClasses();
    }, [passedClassSeq]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "jumin") {
            // 숫자만 입력 가능하도록
            const numbersOnly = value.replace(/[^0-9]/g, "");
            // 최대 13자리로 제한
            const formatted = numbersOnly.slice(0, 13);

            setFormData((prev) => ({
                ...prev,
                [name]: formatted,
            }));
        } else if (name === "phone") {
            // 숫자만 입력 가능하도록
            const numbersOnly = value.replace(/[^0-9]/g, "");
            // 최대 11자리로 제한
            const formatted = numbersOnly.slice(0, 11);

            setFormData((prev) => ({
                ...prev,
                [name]: formatted,
            }));
        } else if (name === "seq") {
            setFormData((prev) => ({
                ...prev,
                [name]: parseInt(value),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // 실거주지 주소 검색
    const searchRealAddress = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    setFormData((prev) => ({
                        ...prev,
                        real_zipcode: data.zonecode,
                        real_address1: data.address,
                    }));
                },
            }).open();
        } else {
            alert("우편번호 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
        }
    };

    // 등본상 주소 검색
    const searchAddress = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    setFormData((prev) => ({
                        ...prev,
                        zipcode: data.zonecode,
                        address1: data.address,
                    }));
                },
            }).open();
        } else {
            alert("우편번호 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = {
                ...formData,
                class_seq: Number(formData.seq), // seq값을 class_seq로 변환
                lecture_seq: passedLectureSeq || null, // 전달받은 lecture_seq 사용
                seq: undefined, // 기존 seq 필드는 제거
            };
            const response = await axios.post("/api/apply/add", submitData);
            if (response.status === 200) {
                alert("정보가 정상적으로 등록되었습니다.");
                navigate("/");
            }
        } catch (error) {
            console.error("상세 에러:", error.response?.data);
            alert("등록 실패: " + (error.response?.data?.message || "서버 오류가 발생했습니다."));
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="board-container">
            <div className="board-header">
                <h2>정보 작성</h2>
                {passedClassInfo && (
                    <div>
                        <p className="text-muted mb-1">
                            선택된 강의: {passedClassInfo.LECTURE_NAME} [{passedClassInfo.ROUND}기]
                        </p>
                        <p className="text-muted small">
                            <i className="fa fa-info-circle"></i> 강의 변경을 원하시면 이전 페이지로 돌아가 다른 강의를
                            선택해주세요.
                        </p>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <table className="board-table">
                    <tbody>
                        <tr id="apply_title">
                            <th>반</th>
                            <td>
                                {passedClassSeq ? (
                                    // 전달받은 class_seq가 있으면 읽기 전용 표시
                                    <div>
                                        {classes && classes.length > 0 ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    classes.find((c) => c.seq === parseInt(passedClassSeq))?.round +
                                                        "기 - " +
                                                        classes.find((c) => c.seq === parseInt(passedClassSeq))
                                                            ?.lecture_name || "선택된 강의"
                                                }
                                                readOnly
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                className="form-control"
                                                value="선택된 강의 정보 로드 중..."
                                                readOnly
                                            />
                                        )}
                                        <input type="hidden" name="seq" value={passedClassSeq} />
                                    </div>
                                ) : (
                                    // 없으면 기존 드롭다운 유지
                                    <select
                                        name="seq"
                                        value={formData.seq}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    >
                                        <option value="">클래스를 선택하세요</option>
                                        {classes && classes.length > 0 ? (
                                            classes.map((classItem) => (
                                                <option key={classItem.seq} value={classItem.seq}>
                                                    {classItem.round}기 - {classItem.lecture_name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>
                                                클래스 정보를 불러오는 중...
                                            </option>
                                        )}
                                    </select>
                                )}
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>이름</th>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="이름을 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>주민등록번호</th>
                            <td>
                                <input
                                    type="text"
                                    name="jumin"
                                    value={formData.jumin}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder=" '-' 외외 주민등록번호 13자리를 입력해주세요"
                                    maxLength={13}
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>등본상 우편번호(선택)</th>
                            <td>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="zipcode"
                                        value={formData.zipcode}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="등본상 우편번호"
                                        readOnly
                                    />
                                    <button type="button" className="btn btn-secondary" onClick={searchAddress}>
                                        우편번호 검색
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>등본상 주소(선택)</th>
                            <td>
                                <input
                                    type="text"
                                    name="address1"
                                    value={formData.address1}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="등본상 주소"
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>등본상 상세 주소(선택)</th>
                            <td>
                                <input
                                    type="text"
                                    name="address2"
                                    value={formData.address2}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="등본상 상세 주소를 입력해주세요"
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>실거주 우편번호</th>
                            <td>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="real_zipcode"
                                        value={formData.real_zipcode}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="실거주지의 우편번호"
                                        readOnly
                                        required
                                    />
                                    <button type="button" className="btn btn-secondary" onClick={searchRealAddress}>
                                        우편번호 검색
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>실거주 주소</th>
                            <td>
                                <input
                                    type="text"
                                    name="real_address1"
                                    value={formData.real_address1}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="실거주 주소"
                                    readOnly
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>실거주 상세 주소</th>
                            <td>
                                <input
                                    type="text"
                                    name="real_address2"
                                    value={formData.real_address2}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="실거주지의 상세 주소를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>이메일</th>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="이메일을 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>휴대전화</th>
                            <td>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder=" '-' 외 전화번호 11자리를 입력해주세요"
                                    maxLength={11}
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>지원경로</th>
                            <td>
                                <input
                                    type="text"
                                    name="path"
                                    value={formData.path}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="지원경로를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="button" onClick={handleGoBack} className="btn btn-secondary">
                        이전으로
                    </button>
                    <button type="submit" className="btn btn-primary">
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ApplyAdd;
