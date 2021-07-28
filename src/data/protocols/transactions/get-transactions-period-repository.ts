export interface GetTransactionsPeriodRepository {
  getTransactions: (page: number, perpage: number) => Promise<any>
}
