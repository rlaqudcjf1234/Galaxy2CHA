import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SlideDetail() {
    const { type, id } = useParams();
    const navigate = useNavigate();

    const getTypeTitle = (type) => {
        switch(type) {
            case 'main':
                return '메인';
            case 'course':
                return '강좌';
            case 'class':
                return '강의';
            default:
                return '';
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <button 
                        className="btn btn-secondary mb-4" 
                        onClick={() => navigate(-1)}
                    >
                        뒤로 가기
                    </button>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">{getTypeTitle(type)} 상세 정보</h2>
                            <div className="mb-3">
                                <strong>카테고리:</strong> {getTypeTitle(type)}
                            </div>
                            <div className="mb-3">
                                <strong>ID:</strong> {id}
                            </div>
                            {/* 추후 실제 데이터를 연동하여 더 자세한 정보 표시 */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SlideDetail;