import React from "react";
import { TableColumnsActive } from "../Table";

interface TableCheckboxProps {
  columnName: string;
  columns: TableColumnsActive;
  setColumns: React.Dispatch<React.SetStateAction<TableColumnsActive>>;
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
        // @ts-ignore
        checked={columns[columnName]}
        onChange={(e) =>
          setColumns((columns: TableColumnsActive) => ({
            ...columns,
            // @ts-ignore
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
