import React, { useState } from 'react';
import '../../css/AddCertModal.css'; // 추가된 CSS 파일을 import 합니다.

const AddCertModal = ({ isOpen, onClose, onSave, studentSeq, sort }) => {
    const [formData, setFormData] = useState({
        STUDENT_SEQ: studentSeq,
        SORT: sort,
        CERT_NAME: '',
        CERT_NO: '',
        PASS_DT: '',
        ISSUER: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="modal-title">자격증 정보 추가</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            onSave(formData);
                            onClose();
                        }}>
                            <div className="form-fields">
                                <div>
                                    <label className="form-label">
                                        자격증명 <span className="required-mark">*필수</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        name="CERT_NAME"
                                        value={formData.CERT_NAME}
                                        onChange={handleChange}
                                        required
                                        placeholder="자격증명을 입력하세요"
                                    />
                                </div>

                                <div>
                                    <label className="form-label">발급기관</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        name="ISSUER"
                                        value={formData.ISSUER}
                                        onChange={handleChange}
                                        required
                                        placeholder="발급기관을 입력하세요"
                                    />
                                </div>

                                <div>
                                    <label className="form-label">합격일자</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        name="PASS_DT"
                                        value={formData.PASS_DT}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="form-label">자격증 번호</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        name="CERT_NO"
                                        value={formData.CERT_NO}
                                        onChange={handleChange}
                                        required
                                        placeholder="자격증 번호를 입력하세요"
                                    />
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCertModal;
