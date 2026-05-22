import path from 'node:path'
import { mkdirSync } from 'node:fs'
import { Sequelize } from 'sequelize'

const storage = process.env.SQLITE_PATH || path.join(process.cwd(), 'data', 'app.sqlite')
mkdirSync(path.dirname(storage), { recursive: true })

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: false
})

export async function initializeDatabase() {
  await sequelize.authenticate()
  await sequelize.sync()
}
