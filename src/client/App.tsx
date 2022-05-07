import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { useNavigate } from "react-router-dom";
import UploadModal from "./UploadModal";
import { apiService } from "./services/api-service";
import { MealTable } from "../server/db/models";
import Table from "./Table";
import Badge from "./components/Badge";
import { mealColumns } from "./constants";

const App = () => {
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [pastMeals, setPastMeals] = useState<MealTable[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = async (meal_id: number) => {
    await apiService("api/meals", "DELETE", { meal_id: meal_id });
    setPastMeals(
      pastMeals.filter((meal) => {
        return meal.id != meal_id;
      })
    );
  };

  useEffect(() => {
    const getPastMeals = async () => {
      const data = await apiService("api/meals");
      setPastMeals(data);
      setLoaded(true);
    };

    const loadModel = async () => {
      const model = await tf.loadGraphModel("saved_models/model.json");
      setModel(model);
    };

    getPastMeals();
    loadModel();
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-screen items-center">
      <div className="xl:w-1/2 w-full  px-3">
        <div className="flex w-full justify-between py-3 items-center">
          <h1 className="font-semibold text-2xl font-mono">🍎 WatIEat</h1>
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white font-semibold text-sm px-3 py-1 rounded-md hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
        <div className="flex my-4">
          <h1 className="font-semibold text-lg">Today</h1>
        </div>

        <div className="flex space-x-4">
          {mealColumns.map((column, key) => (
            <Badge name={column} pastMeals={pastMeals} key={key} />
          ))}
        </div>
        <div className="flex my-6 justify-between px-3">
          <h1 className="font-semibold text-lg">Meals</h1>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-500 text-white font-semibold text-sm px-3 rounded-md hover:bg-blue-600"
          >
            + New
          </button>
        </div>
        <Table pastMeals={pastMeals} handleDelete={handleDelete} />
      </div>
      {openModal && (
        <UploadModal
          setOpenModal={setOpenModal}
          setPastMeals={setPastMeals}
          pastMeals={pastMeals}
          model={model}
        />
      )}
    </div>
  );
};

export default App;
