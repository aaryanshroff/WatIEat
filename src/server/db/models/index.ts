export interface UserTable {
  id?: number;
  email?: string;
  password?: string;
}

export interface Meal {
  name: string;
  calories: number;
  carbohydrates: number;
  protein: number;
}

export interface MealTable extends Meal {
  id: number;
  user_id: number;
  timestamp: string;
}
