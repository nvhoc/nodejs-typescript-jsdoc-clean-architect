import yaml from 'js-yaml'
import fs from 'fs'

function getEnv(x1) {
  const env = process.env[x1]
  if (
    env === 'undefined' ||
    env === undefined ||
    env === null ||
    env === 'null'
  ) {
    return ''
  }
  return env
}
// eslint-disable-next-line import/no-mutable-exports
function getConfigFile(fileName) {
  let localConfig = {}
  try {
    let yamlFile = fs.readFileSync(`${__dirname}/${fileName}.yaml`, 'utf8')
    yamlFile = yamlFile.replace(/\$\{([^}]*)\}/g, (x, x1) => {
      return getEnv(x1)
    })
    localConfig = yaml.safeLoad(yamlFile)
  } catch (e) {
    logger.error(e)
  }
  logger.info(`read config in file ${fileName}`, localConfig)
  return localConfig
}

const _config = {
  ...getConfigFile('base'),
  ...getConfigFile(process.env.NODE_ENV || 'development'),
}
logger.info('app configuration: ', _config)

function getFromConfig(key) {
  const keys = key.split('.')
  let ptr = _config
  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i]
    ptr = ptr[k]
    if (!ptr) {
      return null
    }
  }
  return ptr
}

function getFromEnv(key) {
  const envKey = key
    .toUpperCase()
    .split('.')
    .join('_')
  return process.env[envKey]
}

const config = {
  get(key, _default = null) {
    return getFromConfig(key) || getFromEnv(key) || _default
  },
}

export default config
