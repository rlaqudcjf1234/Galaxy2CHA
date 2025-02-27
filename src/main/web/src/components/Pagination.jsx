import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = ({ currentPage, totalCount, onPageChange }) => {
    currentPage = currentPage || 1;
    totalCount = totalCount || 0;

    const pageUnit = 10;  // 한 페이지당 보여줄 레코드 수
    const pageSize = 10;  // 한 화면에 보여줄 페이지 수

    // 전체 페이지 수 계산
    const totalPageCount = Math.ceil(totalCount / pageUnit);

    // 현재 페이지 목록의 첫 페이지 번호
    const firstPageNoOnPageList = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;

    // 현재 페이지 목록의 마지막 페이지 번호
    const lastPageNoOnPageList = Math.min(
        firstPageNoOnPageList + pageSize - 1,
        totalPageCount
    );

    // 이전 페이지 번호
    const previousPageNo = firstPageNoOnPageList > pageSize
        ? firstPageNoOnPageList - 1
        : 1;

    // 다음 페이지 번호
    const nextPageNo = lastPageNoOnPageList < totalPageCount
        ? firstPageNoOnPageList + pageSize
        : totalPageCount;

    // 페이지 번호 배열 생성
    const pageNumbers = Array.from(
        { length: lastPageNoOnPageList - firstPageNoOnPageList + 1 },
        (_, i) => firstPageNoOnPageList + i
    );

    return (
        <nav aria-label="페이지 네비게이션" className="d-flex gap-2 justify-content-center py-1">
            <ul className="pagination">
                {totalPageCount > pageSize && (
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => onPageChange(1)}
                            aria-label="첫 페이지"
                        >
                            <span>&laquo;</span>
                        </button>
                    </li>
                )}

                {totalPageCount > pageSize && (
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => onPageChange(previousPageNo)}
                            aria-label="이전 페이지"
                        >
                            <span>&lt;</span>
                        </button>
                    </li>
                )}

                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        {number === currentPage ? (
                            <button
                                className="page-link active"
                                aria-current="page"
                            >
                                {number}
                            </button>
                        ) : (
                            <button
                                className="page-link"
                                onClick={() => onPageChange(number)}
                                aria-label={`${number}페이지`}
                            >
                                {number}
                            </button>
                        )}
                    </li>
                ))}

                {totalPageCount > pageSize && (
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => onPageChange(nextPageNo)}
                            aria-label="다음 페이지"
                        >
                            <span>&gt;</span>
                        </button>
                    </li>
                )}

                {totalPageCount > pageSize && (
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => onPageChange(totalPageCount)}
                            aria-label="마지막 페이지"
                        >
                            <span>&raquo;</span>
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;