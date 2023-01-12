import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Pagination = ({ currentPage, pages, element }) => {
  return (
    <nav className="ms-auto">
      <ul className="pagination">
        <li>
          <Link className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {Array(pages).fill("").map((e, index) => {
            let page=index+1
            return (
              <li className={currentPage===page?"activePage":""}>
                <Link className="page-link" to={`/${element}?page=${page}`}>
                  {page}
                </Link>
              </li>
            );
          })}
        <li>
          <Link className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
