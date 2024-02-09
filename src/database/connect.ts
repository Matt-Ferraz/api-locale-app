import { sequelize } from './sequelize'
import logger from '@/libs/logger'

export default async (): Promise<any> => {
  try {
    const connection = await sequelize.authenticate()
    logger.info('Database connected')
    return Promise.resolve(connection)
  } catch (error) {
    Promise.reject(error)
  }
}
