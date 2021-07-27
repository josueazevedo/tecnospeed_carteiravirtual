require('dotenv').config()

module.exports = config = {
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