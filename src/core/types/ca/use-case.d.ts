
declare global {
  module CA {
    module UseCase {
      export interface User {
        id: number
        userType: string
        userEmail: string
        userName: string
      }
      export interface Network {
        ip: string
      }
      export interface Context {
        user?: User
        data: any
        network?: Network
        transaction?: object
      }
      export interface Interface {
        _context: Context
        exec(): Promise<void>
      }
      export interface Opts {
        transaction: any
      }

    }
  }
}

export { }
