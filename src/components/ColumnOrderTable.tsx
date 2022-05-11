import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useTable, useColumnOrder } from "react-table";
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

const ColumnOrderTable = ({ data, columns }: TableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    setColumnOrder,
  } = useTable({ columns, data }, useColumnOrder);

  const changeOrder = () => {
    setColumnOrder(["id", "name", "phone", "username"]);
  };

  return (
    <TableContainer>
      <Button onClick={changeOrder}>Change column order</Button>
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
  );
};

export default ColumnOrderTable;
