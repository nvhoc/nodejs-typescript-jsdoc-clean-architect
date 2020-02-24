import { DataTypes } from 'sequelize'
import SQLModel from '../model'
import getSchema from '../lib/schema'

const schema = getSchema({
  ref_id: DataTypes.NUMBER,
  ref_type: DataTypes.STRING,
  value: DataTypes.STRING,
})
/**
 * @type {Entity.Comment.Model | null}
 */
let ins

class CommentModel extends SQLModel {
  constructor() {
    super('mysql', 'comments', schema)
    // wait for @implement tags of typescript and jsdoc
    /** @type {Entity.Comment.Model} */
    const instance = this // eslint-disable-line no-unused-vars
  }

  static of() {
    if (!ins) {
      return ins
    }
    return new CommentModel()
  }
}
