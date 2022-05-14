import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { VariableSizeList as List } from "react-window";

import "./styles.css";
import data from "./data";

// These column widths are arbitrary.
// Yours should be based on the content of the column.
const columnSizes = new Array(1000)
  .fill(true)
  .map(() => 75 + Math.round(Math.random() * 50));

const getItemSize = (index) => {
  console.log(
    "🚀 ~ file: index.js ~ line 17 ~ getItemSize ~ columnSizes[index]",
    columnSizes[index]
  );
  return columnSizes[index];
};

const columns = data.columns;
const rows = data.rows;

const outerElement = forwardRef(({ children, ...rest }, ref) => {
  console.log("🚀 ~ file: index.js ~ line 45 ~ outerElement ~ rest", rest);
  return (
    <section ref={ref} {...rest}>
      {children}
    </section>
  );
});

const innerElement = forwardRef(({ children, ...rest }, ref) => {
  console.log("🚀 ~ file: index.js ~ line 42 ~ innerElement ~ rest", rest);
  const columns = data.columns;
  console.log(
    "🚀 ~ file: index.js ~ line 48 ~ innerElement ~ columns",
    columns
  );

  return (
    <table ref={ref} {...rest}>
      <thead style={{ display: "flex" }}>
        <tr
          className="sticky"
          style={{
            top: 35,
            left: 0,
            width: "100%",
            height: 35,
            position: "sticky !important",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderBottom: "1px solid #eee",
            boxSizing: "border-box",
          }}
        >
          {columns.map((column, columnIndex) => {
            const value = column.label;
            return (
              <th
                key={columnIndex}
                style={{ display: "block", width: "126px" }}
              >
                {value}
              </th>
            );
          })}
        </tr>
        ;
      </thead>
      <tbody style={{ display: "flex" }}>{children}</tbody>
    </table>
  );
});

const getCellWidth = () => {
  return 128;
};

const Column = (columnProps) => {
  const columnIndex = columnProps.index;
  const column = columns[columnIndex];
  const width = columnProps.style.width;

  return (
    <tr className="Column" style={{ ...columnProps.style }}>
      {rows.map((row, rowIndex) => {
        const cell = row[column.id];
        const value = cell.qText;
        return (
          <th style={{ display: "block" }} key={rowIndex}>
            {value}
          </th>
        );
      })}
    </tr>
  );
};

const Example = () => (
  <List
    outerElementType={outerElement}
    innerElementType={innerElement}
    className="List"
    height={275}
    itemCount={data.columns.length}
    itemSize={getCellWidth}
    itemKey={data.columns.id}
    layout="horizontal"
    width={500}
    // itemData={data}
    // onItemsRendered={onItemsRendered}
    // overscanCount={overscanCount}
  >
    {Column}
  </List>
);

ReactDOM.render(<Example />, document.getElementById("root"));
