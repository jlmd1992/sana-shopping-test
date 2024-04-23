import React from "react";

const Paginator = ({ currentPage, nextPage, prevPage }) => {
  return (
    <div className="pagination">
      <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
      <span>Page {currentPage}</span>
      <button onClick={nextPage}>Next</button>
    </div>
  );
};

export default Paginator;