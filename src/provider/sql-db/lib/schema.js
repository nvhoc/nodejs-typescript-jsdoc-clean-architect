import { DataTypes } from 'sequelize'

const BASE_SCHEMA_SEQ = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  created: DataTypes.DATE,
  updated: DataTypes.DATE,
  is_deleted: DataTypes.BOOLEAN,
  is_active: DataTypes.BOOLEAN,
}

/**
 *
 * @param {object} schema
 */
export default function getSchema(schema) {
  return { ...schema, ...BASE_SCHEMA_SEQ }
}
