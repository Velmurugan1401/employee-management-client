import React from "react";
import { Table } from "react-bootstrap";

const DataTable =React.memo(function DataTable({ data, columns }) {
  return (
    <Table striped bordered hove style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
});


export default DataTable
