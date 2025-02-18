import dotenv from 'dotenv/config'

export const {
    DB_USER, DB_PASSWORD, DB_HOST, SERVER_PORT, LIMIT_DATA_PER_PAGE: LIMIT, DB_NAME
} = process.env;