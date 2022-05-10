import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { useTable, usePagination } from "react-table";
import { IData } from "../lib/interface/IData";

interface ICol {
  Header: string;
  Footer: string;
  accessor: string;
}
interface TableProps {
  data: IData[];
  columns: ICol[];
}

const PaginationTable = ({ data, columns }: TableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      // intialState: {
      //   pageIndex: 1,
      // },
    },
    usePagination
  );

  const { pageIndex, pageSize } = state;
  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <div>
        <span>
          Page:{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Goto page:{" "}
          <Input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{
              width: 50,
            }}
          />
        </span>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}>
          {[0, 25, 50].map((pageSize) => {
            return (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            );
          })}
        </Select>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </Button>
        <Button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button onClick={nextPage} disabled={!canNextPage}>
          Next
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </Button>
      </div>
    </TableContainer>
  );
};

export default PaginationTable;
