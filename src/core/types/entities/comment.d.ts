declare global {
  module Entity {
    module Comment {
      export enum commentRefType {
        user
      }
      export type Data = {
        id: number
        refId: number
        refType: commentRefType
        value: string
      }
      export interface Model extends CA.BaseModel {}
    }
  }
}

export {}
