import React, { useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import { IData } from "../lib/interface/IData";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";

interface ICol {
  Header: string;
  Footer: string;
  accessor: string;
}
interface TableProps {
  data: IData[];
  columns: ICol[];
}
const FilteringTable = ({ data, columns }: TableProps) => {
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    state, //tableState
    setGlobalFilter,
  } = useTable({ columns, data, defaultColumn }, useFilters, useGlobalFilter);

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <TableContainer>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    {
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    }
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
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
          <Tfoot>
            {footerGroups.map((footerGroup) => (
              <Tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => (
                  <Td {...column.getFooterProps}>{column.render("Footer")}</Td>
                ))}
              </Tr>
            ))}
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default FilteringTable;
