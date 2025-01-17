import React from 'react';
import '../css/CardSection.css';

// 옵션 메뉴 아이콘 컴포넌트
const OptionsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="options-icon">
    <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0Zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0Zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0Z" clipRule="evenodd" />
  </svg>
);

// 추가 버튼 아이콘 컴포넌트
const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75Z" clipRule="evenodd" />
  </svg>
);

const CourseCard = ({ date, title, subtitle, progress, color, team, countdown }) => {
  return (
    <div className={`card ${color}`}>
      <div className="card-header">
        <span className="date">{date}</span>
        <button className="options-button">
          <OptionsIcon />
        </button>
      </div>

      <div className="card-body">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <div className="progress-container">
          <span className="progress-label">Progress</span>
          <div className="progress-track">
            <div className="progress-bar" style={{ '--progress': `${progress}%` }} />
          </div>
          <span className="progress-value">{progress}%</span>
        </div>
      </div>

      <div className="card-footer">
        <div className="team-section">
          {team.map((member, index) => (
            <div key={index} className="team-member" style={{ zIndex: team.length - index }}>
              <img src="/api/placeholder/30/30" alt={member.name} />
            </div>
          ))}
          <button className="add-member">
            <AddIcon />
          </button>
        </div>
        <div className="countdown">{countdown}</div>
      </div>
    </div>
  );
};

const CardSection = () => {
  const courses = [
    {
      date: "Jan 16, 2025",
      title: "자바 프로그래밍",
      subtitle: "Java, JS, React",
      progress: 43,
      color: "green",
      team: [{ name: "Member 1" }, { name: "Member 2" }],
      countdown: "32 days left"
    },
    {
      date: "Jan 16, 2025",
      title: "웹 개발",
      subtitle: "Web",
      progress: 66,
      color: "orange",
      team: [{ name: "Member 3" }, { name: "Member 4" }],
      countdown: "3 weeks left"
    },
    {
      date: "Jan 16, 2025",
      title: "밥먹고싶다",
      subtitle: "Medical",
      progress: 550,
      color: "red",
      team: [{ name: "Member 5" }, { name: "Member 6" }],
      countdown: "3 weeks left"
    },
    
  ];

  return (
    <section className="course-grid">
      {courses.map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
    </section>
  );
};

export default CardSection;