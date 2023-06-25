import pg from 'pg'

// create a "pool" to connect to the DB, applying the configuration we created earlier
const pool = new pg.Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
})

// unexplained... bur imported into our server scripts to interact with DB:
export const db = {
  query: (text, params) => pool.query(text, params),
}
