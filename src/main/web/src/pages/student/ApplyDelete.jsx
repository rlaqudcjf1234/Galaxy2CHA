import React from "react";

const ApplyDelete = ({ onDelete, itemId, children }) => {
    const handleDelete = async () => {
        try {
            const isConfirmed = window.confirm("정말 삭제하시겠습니까?");

            if (isConfirmed) {
                await onDelete(itemId);
            }
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600 transition-colors font-medium" // font-medium 추가
            style={{ display: "inline-block", minWidth: "100px" }} // 인라인 스타일 추가
        >
            {children}
        </button>
    );
};

export default ApplyDelete;
