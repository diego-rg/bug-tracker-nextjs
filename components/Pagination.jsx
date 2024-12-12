import React from "react";

export default function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="p-5">
            <ul className="flex">
                {pageNumbers.map((number) => (
                    <li className="mr-3" key={number}>
                        <button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-2 rounded-md" disabled={number == currentPage}
                            onClick={() => paginate(number)} aria-label={`Go to Page ${number}`}  >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};