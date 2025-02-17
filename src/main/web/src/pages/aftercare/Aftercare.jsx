import React, { useState } from 'react';
import '../../css/aftercare.css';

const InfoSection = ({ title, items, onAdd, onRemove, description }) => {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem);
      setNewItem('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="info-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {description && (
          <p className="section-description">{description}</p>
        )}
      </div>
      
      <div className="input-group">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input-field"
          placeholder={`${title} 입력`}
        />
        <button
          onClick={handleAdd}
          className="add-button"
        >
          +
        </button>
      </div>

      <div className="items-container">
        {items.length === 0 ? (
          <p className="empty-message">등록된 정보가 없습니다</p>
        ) : (
          <ul className="items-list">
            {items.map((item, index) => (
              <li key={index} className="item">
                <span className="item-text">{item}</span>
                <button
                  onClick={() => onRemove(index)}
                  className="remove-button"
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const aftercare = () => {
  const [studentInfo, setStudentInfo] = useState([]);
  const [lectureInfo, setLectureInfo] = useState([]);
  const [certifications, setCertifications] = useState([]);

  const addItem = (setter) => (newItem) => {
    setter(prev => [...prev, newItem]);
  };

  const removeItem = (setter) => (index) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="aftercare-container">
      <h1 className="aftercare-title">학생 사후관리 시스템</h1>
      
      <div className="sections-grid">
        <InfoSection
          title="학생 정보"
          description="학생의 기본 정보를 관리합니다. (추후 DB 연동 예정)"
          items={studentInfo}
          onAdd={addItem(setStudentInfo)}
          onRemove={removeItem(setStudentInfo)}
        />
        
        <InfoSection
          title="강의 정보"
          description="수강 중인 강의 정보를 관리합니다. (추후 API 연동 예정)"
          items={lectureInfo}
          onAdd={addItem(setLectureInfo)}
          onRemove={removeItem(lectureInfo)}
        />
        
        <InfoSection
          title="자격증"
          description="취득한 자격증 정보를 관리합니다."
          items={certifications}
          onAdd={addItem(setCertifications)}
          onRemove={removeItem(certifications)}
        />
      </div>
    </div>
  );
};

export default aftercare;