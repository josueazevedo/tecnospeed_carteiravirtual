export interface GetTransactionsPeriodRepository {
  getTransactions: (page: number, perpage: number, startDate: string, endDate: string) => Promise<any>
}
