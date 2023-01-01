/* eslint-disable @typescript-eslint/no-explicit-any */
import PaginatedItems from "./PaginatedItems";
import { Header, TableProps } from "./types";
import IconArrowUp from "assets/images/icons/arrow-up.svg";
import IconArrowDown from "assets/images/icons/arrow-down.svg";
import { ORDER_DIRECTION } from "types";
import React, { useEffect } from "react";
import CheckedDefault from "components/Checked/CheckedDefault";
import { HashLoader } from "react-spinners";

const Table = (props: TableProps): JSX.Element => {
  const {
    limit,
    page,
    countItems,
    handleChangePage,
    headers,
    data,
    orderBy,
    orderDirection,
    handleChangeSort,
    checkedAdd,
    handleChangeChecked,
    isLoadingTable,
    hidePagination,
    handleViewDetailTable,
    rowStyle,
  } = props;

  const renderTableBody = (header: Header, value: any, index: number) => {
    if (header.renderBody) {
      return header.renderBody(value, index);
    }
    if (header.field === "index") {
      return <p>{(page - 1) * limit + (index + 1)} </p>;
    }
    if (header.isCheckbox && !value.nftId) {
      return (
        <CheckedDefault
          checked={value.checked ?? false}
          onClick={
            handleChangeChecked &&
            handleChangeChecked("one", value.checked ?? false, index)
          }
        />
      );
    }

    return value[header.field];
  };
  const renderIconSort = (newField: string) => {
    if (newField === orderBy) {
      return (
        <div
          className="p-1 ml-2 rounded-full hover:bg-gray-02-custom cursor-pointer"
          onClick={
            handleChangeSort &&
            handleChangeSort(
              newField,
              orderDirection === ORDER_DIRECTION.ASC
                ? ORDER_DIRECTION.DESC
                : ORDER_DIRECTION.NO
            )
          }
        >
          <img
            src={
              orderDirection === ORDER_DIRECTION.ASC
                ? IconArrowUp
                : IconArrowDown
            }
            alt="icon"
            className="cursor-pointer w-15-custom h-15-custom"
          />
        </div>
      );
    }
    return (
      <div
        className="p-1 ml-2 rounded-full bg-gray-02-custom cursor-pointer icon-sort"
        onClick={
          handleChangeSort && handleChangeSort(newField, ORDER_DIRECTION.ASC)
        }
      >
        <img
          src={IconArrowUp}
          alt="icon"
          className="cursor-pointer w-15-custom h-15-custom"
        />
      </div>
    );
  };
  const onClickViewDetail = (dataItem: any) => (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (handleViewDetailTable) {
      handleViewDetailTable(dataItem);
    }
  };

  return (
    <div
      className="relative"
      style={{
        display: "grid",
        gridAutoRows: "calc(100% - 50px) 50px",
      }}
    >
      <div
        style={{
          overflow: "auto",
        }}
      >
        <table className="table-card">
          <thead>
            <tr>
              {headers.map((header: Header, idx: number) => {
                return (
                  <th
                    key={idx}
                    style={{
                      ...header.styleHeader,
                    }}
                  >
                    <div
                      className="flex items-center show-icon-sort"
                      style={header.styleSort}
                    >
                      {header.isCheckbox ? (
                        <CheckedDefault
                          checked={checkedAdd ?? false}
                          onClick={
                            handleChangeChecked &&
                            handleChangeChecked("all", checkedAdd ?? false, 0)
                          }
                        />
                      ) : (
                        <React.Fragment>
                          {header.renderHeader
                            ? header.renderHeader
                            : header.title}

                          {header.sort ? renderIconSort(header.field) : null}
                        </React.Fragment>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((el: any, index: number) => {
                return (
                  <tr
                    key={index}
                    onClick={onClickViewDetail(el)}
                    className={`${handleViewDetailTable ? "cursor-pointer" : ""
                      }`}
                    style={{
                      borderBottom:
                        index === data.length - 1
                          ? "none"
                          : "1px solid rgba(0, 0, 0, 0.05)",
                      ...rowStyle,
                    }}
                  >
                    {headers.map((header: Header, idx: number) => (
                      <td key={idx} style={header.styleBody}>
                        {renderTableBody(header, el, index)}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr
                style={{
                  borderBottom: "none",
                }}
              >
                <td className="text-center" colSpan={headers.length}>
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        className=" flex items-center justify-end bg-white pr-8"
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderTop: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        {data.length && (
          <PaginatedItems
            countItems={countItems}
            limit={limit}
            page={page}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
      {isLoadingTable ? (
        <div
          className="absolute bg-white w-full h-full flex items-center justify-center opacity-30"
          style={{
            borderRadius: 20,
          }}
        >
          <HashLoader color="#57B8FF" loading={true} size={50} />
        </div>
      ) : null}
    </div>
  );
};
export default Table;
