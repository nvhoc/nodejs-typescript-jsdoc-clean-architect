import { Sequelize } from 'sequelize'
declare global {
  module Provider {
    module SQL_DB {
      interface Connection {
        _sequelize: Sequelize
      }
    }
  }
}

export { }
