import { Sequelize } from 'sequelize'
import 'mysql2'
import logger from '../../utils/logger'
/**
 * @type {object<>}
 */
const ins = {}

class DatabaseConnection {
  /**
   * @typedef {object} DatabaseOpts
   * @property {string} DatabaseOpts.identify
   * @property {string} DatabaseOpts.host
   * @property {number} DatabaseOpts.port
   * @property {string} DatabaseOpts.db
   * @property {string} DatabaseOpts.uri
   * @param {DatabaseOpts} param0
   */
  constructor({ identify, host, port, db, uri }) {
    const databaseURL =
      uri || `mysql://${identify}${host || '127.0.0.1'}:${port || 3306}/${db}`
    this._sequelize = new Sequelize(databaseURL, {
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    })
    this._sequelize
      .authenticate()
      .then(() => {
        logger.info('Connection has been established successfully.')
      })
      // @ts-ignore
      .catch(err => {
        logger.error('Unable to connect to the database:', err)
        process.exit(1)
      })
    // wait for @implement tags of typescript and jsdoc
    /** @type {Provider.SQL_DB.Connection} */
    const instance = this // eslint-disable-line no-unused-vars
  }

  /**
   *
   * @param {DatabaseOpts} param0
   * @param {string} param0.name
   */
  static of({ name, identify, host, port, db, uri }) {
    if (!name) {
      throw new Error('error in the model when init connection')
    }
    if (ins[name]) return ins[name]
    ins[name] = new DatabaseConnection({ identify, host, port, db, uri })
    return ins[name]
  }
}

export default DatabaseConnection
