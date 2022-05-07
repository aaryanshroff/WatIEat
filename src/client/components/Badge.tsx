import React from "react";
import { MealTable } from "../../server/db/models";

interface BadgeProps {
  name: string;
  pastMeals: MealTable[];
}

const Badge: React.FC<BadgeProps> = ({ name, pastMeals }) => {
  return (
    <div className="bg-blue-50 rounded-lg w-1/5 px-3 py-2 text-blue-500 font-semibold">
      <h1 className="uppercase text-xs">{name}</h1>
      <h1 className="text-lg">
        {pastMeals.reduce((acc, currMeal) => {
          // Only add to total if meal was consumed today
          const todayDate = new Date().toISOString().split("T")[0];
          return (
            acc +
            (currMeal.timestamp.split("T")[0] === todayDate
              ? currMeal[name]
              : 0)
          );
        }, 0)}
      </h1>
    </div>
  );
};

export default Badge;
