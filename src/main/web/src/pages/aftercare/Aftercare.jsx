import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../css/Aftercare.css';

const Aftercare = () => {
 const { seq } = useParams();

 const [loading, setLoading] = useState(true);
 const [data, setData] = useState(null);
 const [newCertification, setNewCertification] = useState({
   name: "",
   acquisitionDate: "",
   description: ""
 });

 const fetchData = async () => {
   setLoading(true);
   try {
     const response = await axios.get(`/api/student/aftercare/${seq}`);
     setData(response.data);
   } catch (error) {
     console.error("Error fetching data:", error);
     alert("정보를 불러오는데 실패했습니다.");
   } finally {
     setLoading(false);
   }
 };

 useEffect(() => {
   if (seq) {
     fetchData();
   }
 }, [seq]);

 if (loading) {
   return <div className="loading">데이터를 불러오는 중...</div>;
 }

 if (!data) {
   return <div className="loading">학생 정보를 찾을 수 없습니다.</div>;
 }

 return (
   <div className="container">
     {/* 상단 학생 정보 카드 */}
     <div className="card">
       <div className="header">
         <div className="title">
           <h1>개인정보</h1>
         </div>
       </div>

       {/* 개인정보 섹션 */}
       <div className="info-section">
         <div className="info-card">
           <div className="label">이름</div>
           <div className="value">{data.NAME}</div>
         </div>
         <div className="info-card">
           <div className="label">이메일</div>
           <div className="value">{data.EMAIL}</div>
         </div>
         <div className="info-card">
           <div className="label">연락처</div>
           <div className="value">{data.PHONE}</div>
         </div>

         <div className="info-card">
           <div className="label">과정</div>
           <div className="value">
             <div className="class">
               <div>{data.LECTURE_NAME}</div>
               <div>강사: {data.ADMIN_NAME}</div>
               <div>강의실: {data.ROOM}</div>
               <div>기간: {data.START_DT} ~ {data.END_DT}</div>
               <div>시간: {data.START_TM} ~ {data.END_TM}</div>
               <div>회차: {data.ROUND}</div>
             </div>
           </div>
         </div>
         <div className="info-card">
           <div className="label">주소</div>
           <div className="value">
             <div className="zipcode">{data.REALZIPCODE}</div>
             <div className="address">{data.REALADDRESS1} {data.REALADDRESS2}</div>
           </div>
         </div>
       </div>
     </div>

     {/* 자격증 정보 입력 섹션 */}
     <div className="card">
       <h2 className="section-title">자격증 정보 입력</h2>
       <div className="form">
         <div className="input-group">
           <div>
             <label className="label">자격증명</label>
             <input
               type="text"
               className="input"
               value={newCertification.name}
               onChange={(e) => setNewCertification({
                 ...newCertification,
                 name: e.target.value
               })}
               placeholder="자격증 이름을 입력하세요"
             />
           </div>
           <div>
             <label className="label">취득일자</label>
             <input
               type="date"
               className="input"
               value={newCertification.acquisitionDate}
               onChange={(e) => setNewCertification({
                 ...newCertification,
                 acquisitionDate: e.target.value
               })}
             />
           </div>
         </div>
         <div>
           <label className="label">상세 설명</label>
           <textarea
             className="textarea"
             rows="3"
             value={newCertification.description}
             onChange={(e) => setNewCertification({
               ...newCertification,
               description: e.target.value
             })}
             placeholder="자격증에 대한 상세 설명을 입력하세요"
           />
         </div>
         <button className="button">
           자격증 정보 저장
         </button>
       </div>
     </div>
   </div>
 );
};

export default Aftercare;