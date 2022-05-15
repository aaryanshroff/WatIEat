import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { CLASSES } from "../classes";
import { Meal, MealTable } from "../../server/db/models";
import { apiService } from "../services/api-service";
import Spinner from "./Spinner";

interface UploadModalProps {
  setOpenModal: (openModal: boolean) => void;
  setPastMeals: (pastMeals: MealTable[]) => void;
  pastMeals: MealTable[];
  model: any;
}

const UploadModal: React.FC<UploadModalProps> = (props) => {
  const imgRef = useRef();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState<Meal>({
    name: "",
    calories: 0,
    carbohydrates: 0,
    protein: 0,
  });

  const handleImgLoad = async () => {
    setLoading(true);
    predict();
  };

  const predict = async () => {
    const tensor = tf.browser
      .fromPixels(imgRef.current)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();

    const predictions = await props.model.predict(tensor).data();

    const topPrediction = Array.from(predictions)
      .map((p: any, i) => {
        return {
          probability: p,
          className: CLASSES[i],
        };
      })
      .sort((a, b) => {
        return b.probability - a.probability;
      })[0];

    // TODO: Refactor Nutritionix API call to server to hide API keys
    const res = await fetch(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": "eea5c6b5",
          "x-app-key": "37dd31fc7769410627e47077f017a68e",
        },
        body: JSON.stringify({
          query: topPrediction.className,
        }),
      }
    );

    const data = await res.json();
    const food = data.foods[0];
    console.log(food);
    setMeal({
      name: food.food_name,
      calories: Math.round(food.nf_calories),
      carbohydrates: Math.round(food.nf_total_carbohydrate),
      protein: Math.round(food.nf_protein),
    });
    setLoading(false);
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async () => {
    const result: MealTable[] = await apiService("api/meals", "POST", {
      name: meal.name,
      calories: meal.calories,
      carbohydrates: meal.carbohydrates,
      protein: meal.protein,
    });

    props.setPastMeals([...props.pastMeals, result[0]]);
    props.setOpenModal(false);
  };

  return (
    <div className="flex fixed w-screen h-screen justify-center items-center bg-black/50">
      <div className="bg-white rounded-lg px-6 py-5 w-full mx-3">
        <div className="flex justify-between items-center pb-5">
          <h1 className="font-semibold text-lg pr-3">Add New Meal</h1>
          <button
            onClick={() => props.setOpenModal(false)}
            className="hover:bg-gray-100 p-2 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
        </div>
        {!image && (
          <label
            htmlFor="file"
            className="text-sm border border-dashed font-semibold items-center rounded-lg  hover:bg-gray-50 hover:text-blue-700  flex justify-center py-10 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span className="ml-3">Upload image</span>
          </label>
        )}
        <img src={image} ref={imgRef} onLoad={handleImgLoad} />
        <div className="flex w-full justify-center items-center py-4">
          {loading && <Spinner />}
        </div>
        <input
          type="file"
          id="file"
          onChange={handleFile}
          className="opacity-0 h-0 w-0"
        />
        {meal && (
          <>
            <div>{meal.name.charAt(0).toUpperCase() + meal.name.slice(1)}</div>
            <div>Calories: {meal.calories}</div>
            <div>Carbohydrates: {meal.carbohydrates}</div>
            <div>Protein: {meal.protein}</div>
          </>
        )}

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!meal || loading}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
