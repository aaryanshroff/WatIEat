-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

-- Meals table
CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id INTEGER REFERENCES users (id),
    timestamp TIMESTAMP,
    calories INTEGER NOT NULL,
    carbohydrates INTEGER NOT NULL,
    protein INTEGER NOT NULL
);
