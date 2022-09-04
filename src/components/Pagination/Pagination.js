import React, { useState } from "react";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

function Pagination({
  productsPerPage,
  currentPage,
  setCurrentPage,
  totalProducts,
}) {
  //   const totalPages = totalProducts / productsPerPage;
  const pageNumbers = [];

  // Limit page numbers
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  // paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 100);
  };

  // next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }

    window.scrollTo(0, 100);
  };

  // previous page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);

    window.scrollTo(0, 100);
  };

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 w-full">
      <div className="-mt-px w-0 flex-1 flex">
        <p
          onClick={() => {
            paginatePrev();
          }}
          className={`${
            currentPage === pageNumbers[0]
              ? "hidden"
              : "border-t-2 border-transparent pt-4 pr-1 inline-flex group items-center text-sm font-medium text-gray-500 hover:text-indigo-600 hover:border-indigo-500 duration-300 cursor-pointer"
          }`}
        >
          <ArrowNarrowLeftIcon
            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-600 duration-300"
            aria-hidden="true"
          />
          Previous
        </p>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pageNumbers.map((number) => {
          return (
            <p
              key={number}
              onClick={() => paginate(number)}
              className={`${
                currentPage === number
                  ? "border-indigo-500 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } border-transparent border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium duration-300 cursor-pointer`}
            >
              {number}
            </p>
          );
        })}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <p
          onClick={() => {
            paginateNext();
          }}
          className={`${
            currentPage === pageNumbers[pageNumbers.length - 1]
              ? "hidden"
              : "border-t-2 border-transparent pt-4 pr-1 group inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 hover:border-indigo-500 duration-300 cursor-pointer"
          }`}
        >
          Next
          <ArrowNarrowRightIcon
            className="ml-3 h-5 w-5 text-gray-400 group-hover:text-indigo-600 duration-300"
            aria-hidden="true"
          />
        </p>
      </div>
    </nav>
  );
}

export default Pagination;
