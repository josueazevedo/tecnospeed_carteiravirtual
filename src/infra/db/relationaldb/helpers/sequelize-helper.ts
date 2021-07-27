import { Options, Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config()

const config: Options = {
  dialect: 'postgres',
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true
  }
}

export const database = new Sequelize(config)
