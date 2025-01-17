import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/WritePost.css';
import { usePost } from '../../contexts/PostContext';

const WritePost = () => {
    
    // 입력 폼 상태 관리
    const [postData, setPostData] = useState({
        title: '',
        content: ''
    });

    const { addPost } = usePost();
    const navigate = useNavigate();

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();

        // 입력값 검증
        if (!postData.title.trim() || !postData.content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        // 데이터 처리 로직
        addPost(postData);
        navigate('/Class_Community');
    };

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    

// 취소 처리
const handleCancel = () => {
    const confirmCancel = window.confirm('작성 중인 내용이 사라집니다. 취소하시겠습니까?');
    if (confirmCancel) {
        navigate('/Class_Community');
    }
};

return (
    <div className="write-container">
        <h2>글쓰기</h2>
        <form onSubmit={handleSubmit} className="write-form">
            <div className="form-group">
                <input
                    type="text"
                    name="title"
                    value={postData.title}
                    onChange={handleChange}
                    placeholder="제목을 입력하세요"
                    className="title-input"
                    required
                />
            </div>

            <div className="form-group">
                <textarea
                    name="content"
                    value={postData.content}
                    onChange={handleChange}
                    placeholder="내용을 입력하세요"
                    className="content-input"
                    required
                />
            </div>

            <div className="button-group">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="cancel-button"
                >
                    취소
                </button>
                <button
                    type="submit"
                    className="submit-button"
                >
                    등록
                </button>
            </div>
        </form>
    </div>
);
};

export default WritePost;