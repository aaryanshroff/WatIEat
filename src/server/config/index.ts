import * as dotenv from "dotenv";

dotenv.config();

let db: Object = {
  port: Number(process.env.PORT) || 5432,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

if (process.env.NODE_ENV === "production") {
  db = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const jwt = {
  secret: process.env.JWT_SECRET,
  expires: process.env.JWT_EXPIRES,
};

const nutritionix = {
  appID: process.env.NUTRITIONIX_APP_ID,
  key: process.env.NUTRITIONIX_APP_KEY,
};

export default {
  db,
  jwt,
  nutritionix,
};
