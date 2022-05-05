import React, { useState } from "react";
import { MealTable } from "../server/db/models";
import TableCheckbox from "./components/TableCheckbox";
import { mealColumns } from "./constants";

interface TableProps {
  pastMeals: MealTable[];
  handleDelete: (meal_id: number) => void;
}

export interface TableColumnsActive {
  calories: boolean;
  carbohydrates: boolean;
  protein: boolean;
}

const Table: React.FC<TableProps> = ({ pastMeals, handleDelete }) => {
  const [columns, setColumns] = useState<TableColumnsActive>({
    calories: true,
    carbohydrates: true,
    protein: true,
  });
  return (
    <>
      {mealColumns.map((columnName, key) => (
        <TableCheckbox
          columnName={columnName}
          columns={columns}
          setColumns={setColumns}
          key={key}
        />
      ))}
      <table className="rounded-xl w-full border-collapse">
        <thead>
          <tr className="text-xs text-left uppercase text-gray-500 bg-gray-50">
            <th className="px-6 py-3 border-y font-semibold">Name</th>
            {columns.calories && (
              <th className="px-6 py-3 border-y font-semibold">Calories</th>
            )}
            {columns.carbohydrates && (
              <th className="px-6 py-3 border-y font-semibold">
                Carbohydrates
              </th>
            )}
            {columns.protein && (
              <th className="px-6 py-3 border-y font-semibold">Protein</th>
            )}
            <th className="px-6 py-3 border-y font-semibold">Date</th>
            <th className="px-6 py-3 border-y font-semibold">Time</th>
            <th className="border-y"></th>
          </tr>
        </thead>
        <tbody>
          {pastMeals.map((meal, key) => (
            <tr key={key} className="text-sm text-left">
              <td className="px-6 py-3 border-y">
                {meal.name.charAt(0).toUpperCase() + meal.name.slice(1)}
              </td>
              {columns.calories && (
                <td className="px-6 py-3 border-y">{meal.calories}</td>
              )}
              {columns.carbohydrates && (
                <td className="px-6 py-3 border-y">{meal.carbohydrates}</td>
              )}
              {columns.protein && (
                <td className="px-6 py-3 border-y">{meal.protein}</td>
              )}
              <td className="px-6 py-3 border-y">
                {new Date(meal.timestamp).toDateString()}
              </td>
              <td className="px-6 py-3 border-y">
                {new Date(meal.timestamp).toLocaleTimeString()}
              </td>
              <td className="px-6 py-3 border-y">
                <button
                  className="py-1 px-1 rounded-md hover:bg-gray-100"
                  onClick={() => handleDelete(meal.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
