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
  };

  // next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // previous page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
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
              : "border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 duration-300"
          }`}
        >
          <ArrowNarrowLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
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
              : "border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 duration-300"
          }`}
        >
          Next
          <ArrowNarrowRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </p>
      </div>
    </nav>
  );
}

export default Pagination;

// <a
// href="#"
// className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium duration-300"
// >
// 1
// </a>
// {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
// <a
// href="#"
// className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium duration-300"
// aria-current="page"
// >
// 2
// </a>
// <a
// href="#"
// className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
// >
// 3
// </a>
// <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
// ...
// </span>
// <a
// href="#"
// className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
// >
// 8
// </a>
// <a
// href="#"
// className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
// >
// 9
// </a>
// <a
// href="#"
// className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
// >
// 10
// </a>
