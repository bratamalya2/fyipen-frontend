import { useState, useEffect } from "react";

function Pages({
  currentPage,
  totalPages,
  goToPrevPage,
  goToNextPage,
  setCurrentPage,
}) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= totalPages; i++) arr.push(i);
    setPages(arr);
  }, [totalPages]);

  return (
    <div className="flex flex-nowrap w-80 mx-auto mb-32">
      {currentPage !== 1 && totalPages > 1 ? (
        <div
          className="mx-2 border-2 border-rose-500 rounded-full h-8 w-8 cursor-pointer pl-2 pt-0.5"
          onClick={goToPrevPage}
        >
          &lt;
        </div>
      ) : null}
      {pages.map((pageNumber) => {
        if (currentPage === pageNumber)
          return (
            <div
              key={pageNumber}
              className="mx-2 border-2 border-rose-500 bg-rose-500 text-white rounded-full h-8 w-8 pl-2 pt-0.5"
            >
              {pageNumber}
            </div>
          );
        else
          return (
            <div
              key={pageNumber}
              className="mx-2 border-2 border-rose-500 rounded-full h-8 w-8 cursor-pointer pl-2 pt-0.5"
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </div>
          );
      })}
      {currentPage !== totalPages && totalPages > 1 ? (
        <div
          className="mx-2 border-2 border-rose-500 rounded-full h-8 w-8 cursor-pointer pl-2 pt-0.5"
          onClick={goToNextPage}
        >
          &gt;
        </div>
      ) : null}
    </div>
  );
}

export default Pages;
