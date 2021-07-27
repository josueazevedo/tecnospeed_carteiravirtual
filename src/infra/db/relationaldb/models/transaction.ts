import { database } from './../helpers/sequelize-helper'
import { Model, DataTypes } from 'sequelize'

export class Transaction extends Model {
  public id!: number
  public value!: number
  public operation!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    operation: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'transactions',
    sequelize: database
  }
)
