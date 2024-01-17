import React, { FC } from "react";

interface IProps {
  totalPages: number;
  showPages: number;
  page: number;
  setPage: (value: number) => void;
}
const Pagination: FC<IProps> = ({ totalPages, showPages, page, setPage }) => {
  const genItems = (showPages: number) => {
    if (!totalPages) return [];
    const items = [];
    let start = Number(page) - Math.trunc(showPages / 2);
    if (showPages > totalPages) {
      showPages = totalPages;
    }
    if (start < 1) {
      start = 1;
    } else if (start + showPages > totalPages) {
      start = totalPages - showPages + 1;
    }

    for (let i = start; i < start + showPages; i++) {
      items.push(i);
    }

    return items;
  };

  const clickHandle = (value: number) => {
    setPage(value);
  };

  return (
    <>
      <nav
        className="mt-4 d-flex justify-content-center"
        aria-label="Page navigation example"
      >
        <ul className="pagination">
          {genItems(showPages).map((item) => {
            return (
              <li
                className={page === item ? "page-item active" : "page-item"}
                key={item.toString()}
              >
                <button className="page-link" onClick={() => clickHandle(item)}>
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
