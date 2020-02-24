import logger from '../../utils/logger'

export default async (db, func) => {
  let transaction
  let result
  try {
    transaction = await db._sequelize.transaction()
    result = await func(transaction)
    transaction.commit()
  } catch (e) {
    logger.info('TRANSACTION ERROR', e)
    transaction.rollback()
    throw e
  }
  return result
}
