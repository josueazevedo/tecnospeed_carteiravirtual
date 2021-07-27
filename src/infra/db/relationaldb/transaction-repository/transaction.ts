import { Sequelize } from 'sequelize'
import { addTransactionRepository } from '../../../../data/protocols/add-transaction-repository'
import { GetBalanceRepository } from '../../../../data/protocols/get-balance-repository'
import { BalanceModel } from '../../../../domain/models/balance'
import { TransactionModel } from '../../../../domain/models/transaction'
import { AddTransactionModel } from '../../../../domain/usecases/add-transaction'
import { Transaction } from '../models/transaction'

export class TransactionRelacionalRepository implements addTransactionRepository, GetBalanceRepository {
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
}
