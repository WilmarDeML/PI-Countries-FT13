import dotenv from 'dotenv'

dotenv.config();

export const {
    DB_USER, DB_PASSWORD, DB_HOST, SERVER_PORT, LIMIT_DATA_PER_PAGE: LIMIT
} = process.env;