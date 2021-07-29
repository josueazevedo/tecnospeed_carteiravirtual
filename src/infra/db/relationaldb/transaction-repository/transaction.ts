import { Op, Sequelize } from 'sequelize'
import { addTransactionRepository } from '../../../../data/protocols/transactions/add-transaction-repository'
import { GetBalanceRepository } from '../../../../data/protocols/transactions/get-balance-repository'
import { GetTransactionsPeriodRepository } from '../../../../data/protocols/transactions/get-transactions-period-repository'
import { BalanceModel } from '../../../../domain/models/balance'
import { TransactionModel } from '../../../../domain/models/transaction'
import { AddTransactionModel } from '../../../../domain/usecases/transactions/add-transaction'
import { Category } from '../models/category'
import { Transaction } from '../models/transaction'

export class TransactionRelacionalRepository implements addTransactionRepository, GetBalanceRepository, GetTransactionsPeriodRepository {
  async add (transaction: AddTransactionModel): Promise<TransactionModel> {
    const newTransaction = await Transaction.create(transaction, { raw: true })
    return newTransaction
  }

  async getBalance (): Promise<BalanceModel> {
    const balance = await Transaction.findOne({
      attributes: [
        [Sequelize.literal("SUM((CASE operation WHEN 'out' THEN (value * -1) ELSE value END))"), 'value']
      ],
      raw: true
    })
    return balance
  }

  async getTransactions (page: number, perpage: number, startDate: string, endDate: string): Promise<any> {
    const listTransactions = await Transaction.findAndCountAll({
      attributes: {
        exclude: [
          'createdAt', 'updatedAt', 'category_id'
        ]
      },
      include: [
        { model: Category, as: 'category', attributes: ['name'] }
      ],
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
      },
      raw: true,
      limit: perpage,
      offset: page
    })

    return listTransactions
  }
}
