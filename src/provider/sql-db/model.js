/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import {
  underscoreKeys,
  revertUnderscoreKeys,
  removeUnusedKeys,
} from './lib/obj'
import Transaction from './transaction'
import DatabaseConnection from './connection'
import config from '../../config'

class SQLModel {
  /**
   *
   * @param {string} connName
   * @param {*} table
   * @param {*} schema
   * @param {*} opts
   */
  constructor(connName, table, schema, opts = { isUnderscore: true }) {
    this._conn = new DatabaseConnection(
      config.get(`connection.${connName}`, {}),
    )
    this._sequelize = this._conn._sequelize
    this._schema = schema
    this._seqSchema = schema.sequelize({ isUnderscore: opts.isUnderscore })

    /**
     * @type {import }
     */
    this._model = this._sequelize.define(table, this._seqSchema, {
      timestamps: false,
    })
    this._table = `${table}s`
    this._opts = opts

    // wait for @implement tags of typescript and jsdoc
    /** @type {CA.BaseModel} */
    const instance = this // eslint-disable-line no-unused-vars
  }

  /**
   *
   * @param {*} obj
   */
  _transformQuery(obj) {
    const { isUnderscore } = this._opts
    removeUnusedKeys(obj)
    if (!isUnderscore) return obj
    return underscoreKeys(obj)
  }

  /**
   *
   * @param {*} obj
   */
  _mappingResult(obj) {
    console.log('mapping', obj)
    const { isUnderscore } = this._opts
    if (!isUnderscore) return obj
    for (const key in obj) {
      const schema = this._schema._schema[key]
      const value = obj[key]
      if (schema && schema.rawType === 'json' && typeof value === 'string') {
        obj[key] = JSON.parse(value)
      }
    }
    return revertUnderscoreKeys(obj)
  }

  /**
   *
   * @param {*} where
   * @param {CA.Model.Opts} param1
   */
  async findOne(where, { limit, offset, order, transaction } = {}) {
    const result = await this._model.findOne(
      { where: this._transformQuery(where), limit, offset, order },
      { transaction },
    )
    return this._mappingResult(result && result.dataValues)
  }

  /**
   *
   * @param {*} where
   * @param {CA.Model.Opts} param1
   */
  async findOrCreate(where, { transaction }) {
    /**
     *
     * @type {CA.Model.TransactionHandler}
     */
    const getResult = async t => {
      let result = await this.findOne(where, { transaction: t })
      if (!result) result = await this.create(where, { transaction: t })
      return result
    }
    if (transaction) return getResult(transaction)
    return this.openTransaction(async t1 => getResult(t1))
  }

  /**
   *
   * @param {*} where
   * @param {CA.Model.Opts} param1
   */
  async find(where, { limit, offset, order, transaction } = {}) {
    /**
     * @type {CA.Model.Row[]}
     */
    const result = await this._model.findAll(
      { where: this._transformQuery(where), limit, offset, order },
      { transaction },
    )
    return result.map(item => this._mappingResult(item.dataValues))
  }

  /**
   *
   * @param {*} data
   * @param {CA.Model.Opts} param1
   */
  async create(data, { transaction } = {}) {
    const result = await this._model.create(this._transformQuery(data), {
      transaction,
    })
    return this._mappingResult(result && result.dataValues)
  }

  /**
   *
   * @param {*} where
   * @param {*} updateData
   * @param {CA.Model.Opts} param2
   */

  async update(where, updateData, { transaction } = {}) {
    // eslint-disable-next-line no-param-reassign
    const result = await this._model.update(this._transformQuery(updateData), {
      where: this._transformQuery(where),
      ...{ transaction },
    })
    return this._mappingResult(result && result[0])
  }

  /**
   *
   * @param {*} where
   * @param {CA.Model.Opts} param1
   */

  async remove(where, { transaction } = {}) {
    const result = await this._model.destroy({
      where: this._transformQuery(where),
      ...{ transaction },
    })
    return this._mappingResult(result && result.dataValues)
  }

  /**
   *
   * @param {*} query
   * @param {any[]} replacements
   * @param {CA.Model.Opts} param2
   */
  async nativeQuery(query, replacements, { transaction } = {}) {
    const result = await this._sequelize.query(query.replace(/\n/g, ''), {
      replacements,
      transaction,
    })
    return this._mappingResult(result && result[0])
  }

  /**
   *
   * @param {CA.Model.TransactionHandler} func
   */
  openTransaction(func) {
    return Transaction(this._conn, func)
  }
}

export default SQLModel
