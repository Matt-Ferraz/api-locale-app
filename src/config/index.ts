// type Stage = 'local' | 'development' | 'production'
type Dialect = 'postgres' | 'mysql' | 'sqlite'

type DB = {
  username: string
  password: string
  database: string
  host: string
  port: number
  dialect: Dialect
  storage: string
}
interface Env {
    db: DB
  }

const config = {
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE
  },
} as Env

export default config
