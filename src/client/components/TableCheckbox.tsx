import React from "react";
import { TableColumnsActive } from "../Table";

interface TableCheckboxProps {
  columnName: string;
  columns: TableColumnsActive;
  setColumns: (TableColumnsActive) => void;
}

const TableCheckbox: React.FC<TableCheckboxProps> = ({
  columnName,
  columns,
  setColumns,
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="checkbox"
        checked={columns[columnName]}
        onChange={(e) =>
          setColumns((columns) => ({
            ...columns,
            [columnName]: !columns[columnName],
          }))
        }
      />
      <label className="checkbox-label">
        {columnName.charAt(0).toUpperCase() + columnName.slice(1)}
      </label>
    </div>
  );
};

export default TableCheckbox;
