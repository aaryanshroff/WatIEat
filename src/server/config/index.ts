import * as dotenv from 'dotenv';

dotenv.config();

const db = {
    port: Number(process.env.PORT) || 5432,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

const jwt = {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES
}

export default {
    db,
    jwt
}