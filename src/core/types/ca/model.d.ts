declare global {
  module CA {
    module Model {
      type Transaction = a
      type Row = {}
      type Opts = {
        transaction?: Transaction
        limit?: number
        offset?: number
        order?: string[][]
      }
      interface TransactionHandler {
        (f: Transaction): Promise<void>
      }
    }
    interface BaseModel {
      findOne(where: object, opts: Model.Opts): Promise<Model.Row>
      find(where: object, opts: Model.Opts): Promise<Model.Row[]>
      findOrCreate(where: object, updateData: object, opts: Model.Opts): Promise<Model.Row>
      create(data: object, opts: Model.Opts): Promise<Model.Row>
      update(where: object, updateData: object, opts: Model.Opts): Promise<number>
      remove(where: object, opts: Model.Opts): Promise<number>
      openTransaction(f: Model.TransactionHandler): any
    }
  }
}

export { }
