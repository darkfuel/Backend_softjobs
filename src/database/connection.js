import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  allowExitOnIdle: true
})

const connection = async (query, values) => {
  try {
    const result = await pool.query(query, values)
    return { rows: result.rows }
  } catch (error) {
    console.error('Error de conexión ', error)
  }
}

export default connection
