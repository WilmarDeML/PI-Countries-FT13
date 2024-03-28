import dotenv from 'dotenv'

dotenv.config();

export const {
    DB_USER, DB_PASSWORD, DB_HOST, SERVER_PORT
} = process.env;