import { useEffect, useState, FC } from "react";

import { IAccount, IColumn, IProfile, IСampaign } from "../../types";
import Pagination from "../Pagination/Pagination";

const SHOW_ROWS = 10;

interface IProps {
  data: (IAccount | IProfile | IСampaign)[];
  index: string;
  columns: IColumn[];
  onClick: (id: number) => void;
}

const Table: FC<IProps> = ({ data, index, columns, onClick }) => {
  const [filterData, setFilterData] = useState<
    (IAccount | IProfile | IСampaign)[]
  >([]);
  const [showData, setShowData] = useState<(IAccount | IProfile | IСampaign)[]>(
    []
  );

  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>(index);
  const [filter, setFilter] = useState<string[]>([index, ""]);
  const [typeColumn, setTypeColumn] = useState<string>("number");
  const [asc, setAsc] = useState<boolean>(true);

  useEffect(() => {
    setFilterData(
      data.filter((el: IAccount | IProfile | IСampaign) => {
        if (typeof el[filter[0]] === "object") {
          return (el[filter[0]] as Date)?.toLocaleString().includes(filter[1]);
        }
        return el[filter[0]]?.toString().includes(filter[1]);
      })
    );
  }, [filter, data]);

  useEffect(() => {
    let sortData: (IAccount | IProfile | IСampaign)[] = [];

    switch (typeColumn) {
      case "string":
        if (asc) {
          sortData = filterData.sort((a, b) => {
            return a[sort].toString().localeCompare(b[sort].toString());
          });
        } else {
          sortData = filterData.sort((a, b) => {
            return b[sort].toString().localeCompare(a[sort].toString());
          });
        }
        break;

      case "Data":
        if (asc) {
          sortData = filterData.sort((a, b) => {
            return (a[sort] as Date).getTime() - (b[sort] as Date).getTime();
          });
        } else {
          sortData = filterData.sort((a, b) => {
            return (b[sort] as Date).getTime() - (a[sort] as Date).getTime();
          });
        }
        break;

      default:
        if (asc) {
          sortData = filterData.sort((a, b) => {
            return Number(a[sort]) - Number(b[sort]);
          });
        } else {
          sortData = filterData.sort((a, b) => {
            return Number(b[sort]) - Number(a[sort]);
          });
        }
        break;
    }

    if (filterData.length / SHOW_ROWS < page - 1) {
      setPage(1);
    }

    setShowData(sortData.slice((page - 1) * SHOW_ROWS, page * SHOW_ROWS));
  }, [page, sort, asc, filterData, typeColumn]);

  const ascSymbol = asc ? "△" : "▽";

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th scope="col" key={column.key}>
                  <button
                    className="btn"
                    onClick={() => {
                      setAsc(!asc);
                      setSort(column.key);
                      setTypeColumn(column.typeData);
                    }}
                  >
                    {column.title}
                    {sort === column.key && (
                      <span className="text-black text-opacity-25">
                        {" "}
                        {ascSymbol}
                      </span>
                    )}
                  </button>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id={column.key}
                    name={column.key}
                    placeholder=""
                    value={filter[0] === column.key ? filter[1] : ""}
                    onChange={(event) => {
                      setFilter([column.key, event.target.value]);
                    }}
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {showData.map((row) => {
            return (
              <tr
                key={row[index].toString()}
                onClick={() => {
                  onClick(Number(row[index]));
                }}
              >
                {columns.map((column) => {
                  return (
                    <td key={column.key}>
                      {column.typeData === "Date"
                        ? row[column.key].toLocaleString()
                        : row[column.key].toString()}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length > SHOW_ROWS && (
        <Pagination
          page={page}
          totalPages={filterData.length / SHOW_ROWS}
          showPages={10}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default Table;
