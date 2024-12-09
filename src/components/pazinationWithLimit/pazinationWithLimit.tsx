import React, { useState, useEffect } from "react";

interface PaginationProps<T> {
  data: T[]; // Array of data to paginate
  defaultLimit?: number; // Default items per page
  onPageChange: (visibleData: T[], page: number, limit: number) => void; // Callback with current page data
}

const Pagination = <T,>({
  data,
  defaultLimit = 10,
  onPageChange,
}: PaginationProps<T>): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);

  const totalPages = Math.ceil(data.length / limit);

  // Calculate visible data when currentPage, limit, or data changes
  useEffect(() => {
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    onPageChange(data.slice(start, end), currentPage, limit);
  }, [currentPage, limit,data]); // Add dependencies to recalculate when relevant values change

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when the limit changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="d-flex justify-content-between">
      {/* Limit Selector */}
      <div className="d-flex gap-3">
        <label htmlFor="limit">Items per page: </label>
        <select id="limit" value={limit} onChange={handleLimitChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Page Buttons */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === currentPage}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: index + 1 === currentPage ? "#ddd" : "#007bff",
              color: index + 1 === currentPage ? "#555" : "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: index + 1 === currentPage ? "pointer" : "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
