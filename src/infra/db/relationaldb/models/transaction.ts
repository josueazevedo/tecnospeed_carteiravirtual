import { database } from './../helpers/sequelize-helper'
import { Model, DataTypes } from 'sequelize'
import { Category } from './category'

export class Transaction extends Model {
  public id!: number
  public value!: number
  public operation!: string
  public notes?: string
  public category_id: number
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
    },
    notes: {
      type: DataTypes.TEXT
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  },
  {
    tableName: 'transactions',
    sequelize: database
  }
)

Transaction.belongsTo(Category, { foreignKey: 'category_id', as: 'category' })
