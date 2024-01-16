import React, { useEffect, useState } from "react";
import { accounts } from "../../data/accounts";
import { IAccount } from "../../types";
import Pagination from "../Pagination/Pagination";

const Table = () => {
  const [data, setData] = useState<IAccount[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("id");
  const [asc, setAsc] = useState<boolean>(true);

  const SHOW_ITEMS = 5;

  useEffect(() => {
    let sortData = [];
    setAsc(!asc);
    switch (sort) {
      case "email":
        if (asc) {
          sortData = accounts.sort((a, b) => {
            return b["email"].localeCompare(a["email"]);
          });
        } else {
          sortData = accounts.sort((a, b) => {
            return a.email.localeCompare(b.email);
          });
        }
        break;

      case "token":
        sortData = accounts.sort((a, b) => {
          return a.authToken.localeCompare(b.authToken);
        });
        break;

      case "date":
        sortData = accounts.sort((a, b) => {
          return a.creationDate.getTime() - b.creationDate.getTime();
        });
        break;

      default:
        sortData = accounts.sort((a, b) => {
          return a.accountId - b.accountId;
        });
        break;
    }
    setData(sortData.slice((page - 1) * SHOW_ITEMS, page * SHOW_ITEMS));
  }, [page, sort]);

  const columns = {
    id: "ID",
    email: "Email",
    token: "Token",
    date: "Date create",
  };

  const ascSymbol = asc ? "△" : "▽";

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" onClick={() => setSort("id")}>
              {columns.id}
              {sort === "id" && (
                <span className="text-black text-opacity-25"> {ascSymbol}</span>
              )}
            </th>
            <th scope="col" onClick={() => setSort("email")}>
              {columns.email}
              {sort === "email" && (
                <span className="text-black text-opacity-25"> {ascSymbol}</span>
              )}
            </th>
            <th scope="col" onClick={() => setSort("token")}>
              {columns.token}
              {sort === "token" && (
                <span className="text-black text-opacity-25"> {ascSymbol}</span>
              )}
            </th>
            <th scope="col" onClick={() => setSort("date")}>
              {columns.date}
              {sort === "date" && (
                <span className="text-black text-opacity-25"> {ascSymbol}</span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((account: IAccount) => {
            return (
              <tr key={account.accountId.toString()}>
                <td>{account.accountId}</td>
                <td>{account.email}</td>
                <td>{account.authToken}</td>
                <td>{account.creationDate.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        page={page}
        totalPages={30 / 5}
        showPages={10}
        setPage={setPage}
      />
    </>
  );
};

export default Table;
