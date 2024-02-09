import { DataTypes, Sequelize } from 'sequelize'
import config from '@/config'
import Support from '@/support'

const models = {}

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  dialect: config.db.dialect,
  storage: config.db.storage,
  host: config.db.host,
  port: config.db.port,
  define: {
    underscored: true,
    freezeTableName: false,
    charset: 'utf8',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
  pool: {
    min: 5,
    max: 25,
    idle: 10000,
    acquire: 60000,
  },
  logging: false,
  timezone: '+00:00',
})

Support.utils.readModules('models', ({ value }: any): void => {
  if (!!value?.model) {
    const model = value.model(sequelize, DataTypes)
    models[model.name] = model
  }
})

Object.keys(models).forEach(modelName => {
  !!models[modelName]?.associate && models[modelName].associate(models)
})

export {
  sequelize,
  models
}
