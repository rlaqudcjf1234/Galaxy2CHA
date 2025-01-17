// TabMenu.jsx
import React, { useState } from 'react';
import '../css/TabMenu.css';

const TabMenu = () => {
    // 각 탭섹션의 현재 선택된 탭 상태 관리
    const [selectedTab1, setSelectedTab1] = useState('tab01-1');
    const [selectedTab2, setSelectedTab2] = useState('tab03-1');

    // 첫 번째 탭 섹션의 데이터
    const mainTabData = {
        'tab01-1': {
            title: '모집',
            items: [
                '2017년 1차 글로벌새마을청년봉사단(제3기) 국내교육을 시행합니다.',
                '(수정)2017년 3차 월드프렌즈 코이카봉사단(115기) 모집을 합니다.',
                '2017년 2차 월드프렌즈 코디네이터 모집,선발을 실시합니다.',
                '제 2기 KOICA-UNV 대학봉사단 활동국가 미리보기 강연을 실시합니다.',
                '(수정)114기 월드프렌즈 코이카봉사단 모집(~12.26)을 실시합니다.'
            ]
        },
        'tab01-2': {
            title: '합격자 발표',
            items: [
                '2017년 1차 글로벌새마을청년봉사단(제3기) 국내교육을 시행합니다.',
                '2017년 2차 월드프렌즈 코디네이터 모집,선발을 실시합니다.',
                '(수정)2017년 3차 월드프렌즈 코이카봉사단(115기) 모집을 합니다.',
                '(수정)114기 월드프렌즈 코이카봉사단 모집(~12.26)을 실시합니다.',
                '제 2기 KOICA-UNV 대학봉사단 활동국가 미리보기 강연을 실시합니다.'
            ]
        },
        'tab01-3': {
            title: '국내교육 안내',
            items: [
                '2017년 2차 월드프렌즈 코디네이터 모집,선발을 실시합니다.',
                '2017년 1차 글로벌새마을청년봉사단(제3기) 국내교육을 시행합니다.',
                '(수정)2017년 3차 월드프렌즈 코이카봉사단(115기) 모집을 합니다.',
                '제 2기 KOICA-UNV 대학봉사단 활동국가 미리보기 강연을 실시합니다.',
                '(수정)114기 월드프렌즈 코이카봉사단 모집(~12.26)을 실시합니다.'
            ]
        },
        'tab01-4': {
            title: '기타',
            items: [
                '(수정)114기 월드프렌즈 코이카봉사단 모집(~12.26)을 실시합니다.',
                '2017년 2차 월드프렌즈 코디네이터 모집,선발을 실시합니다.',
                '2017년 1차 글로벌새마을청년봉사단(제3기) 국내교육을 시행합니다.',
                '제 2기 KOICA-UNV 대학봉사단 활동국가 미리보기 강연을 실시합니다.',
                '(수정)2017년 3차 월드프렌즈 코이카봉사단(115기) 모집을 합니다.'
            ]
        }
    };

    // 두 번째 탭 섹션의 데이터
    const boardTabData = {
        'tab03-1': {
            title: '기수별 게시판',
            items: [
                { title: '동티모르 커뮤니티 방 신설을 요청합니다.', date: '2016-09-07' },
                { title: '안녕하세요. 도미니카 Las Terrenas 에서 당신을..', date: '2016-09-07' },
                { title: '[콜롬비아][문의 및 요청] 파견증명서 출력을 요청', date: '2016-09-07', highlight: true },
                { title: '[도미니카공화국] 활동기관명 재변경 요청합니다.', date: '2016-09-07', highlight: true },
                { title: '[콜롬비아][문의 및 요청] 파견증명서 출력을 요청', date: '2016-09-07', highlight: true }
            ]
        },
        'tab03-2': {
            title: '국가별 게시판',
            items: [
                { title: '[콜롬비아][문의 및 요청] 파견증명서 출력을 요청', date: '2016-09-07', highlight: true },
                { title: '동티모르 커뮤니티 방 신설을 요청합니다.', date: '2016-09-07' },
                { title: '[도미니카공화국] 활동기관명 재변경 요청합니다.', date: '2016-09-07', highlight: true },
                { title: '안녕하세요. 도미니카 Las Terrenas 에서 당신을..', date: '2016-09-07' },
                { title: '[콜롬비아][문의 및 요청] 파견증명서 출력을 요청', date: '2016-09-07', highlight: true }
            ]
        }
    };

    return (
        <div>
            {/* 첫 번째 탭 메뉴 섹션 */}
            <div className="main-tab">
                <h4 className="a11y">모집공고에 관한 탭 목록입니다.</h4>
                <ul className="tabList-v1" data-tab="tabs">
                    {Object.entries(mainTabData).map(([key, data]) => (
                        <li key={key} className={`tabItem ${selectedTab1 === key ? 'is-selected' : ''}`}>
                            <a href={`#${key}`} onClick={(e) => {
                                e.preventDefault();
                                setSelectedTab1(key);
                            }}>
                                {data.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="tabPanel">
                    {Object.entries(mainTabData).map(([key, data]) => (
                        <ul
                            key={key}
                            id={key}
                            className={`panel ${selectedTab1 === key ? 'is-selected' : ''}`}
                        >
                            {data.items.map((item, index) => (
                                <li key={index}>
                                    <a href="#none">{item}</a>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>

            {/* 두 번째 탭 메뉴 섹션 */}
            <div className="main-tab v1">
                <h3 className="a11y">기수별 게시판, 국가별 게시판 탭 목록입니다.</h3>
                <ul className="tabList" data-tab="tabs">
                    {Object.entries(boardTabData).map(([key, data]) => (
                        <li key={key} className={`tabItem ${selectedTab2 === key ? 'is-selected' : ''}`}>
                            <a href={`#${key}`} onClick={(e) => {
                                e.preventDefault();
                                setSelectedTab2(key);
                            }}>
                                {data.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="tabPanel">
                    {Object.entries(boardTabData).map(([key, data]) => (
                        <ul
                            key={key}
                            id={key}
                            className={`panel ${selectedTab2 === key ? 'is-selected' : ''}`}
                        >
                            {data.items.map((item, index) => (
                                <li key={index} className="panel-item">
                                    <a href="#none">
                                        {item.highlight && (
                                            <strong>[{item.title.split(']')[0].substring(1)}]</strong>
                                        )}
                                        {item.highlight ? item.title.split(']')[1] : item.title}
                                    </a>
                                    <span className="date">{item.date}</span>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabMenu;