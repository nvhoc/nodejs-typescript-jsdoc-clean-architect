export const removeUnusedKeys = obj => {
  Object.keys(obj).forEach(k => {
    if (obj[k] === null || obj[k] === undefined) {
      // eslint-disable-next-line no-param-reassign
      delete obj[k]
    }
  })
}

export const underscoreKeys = obj => {
  if (!obj) return obj
  const newObj = obj
  Object.keys(newObj).forEach(k => {
    const kk = k.replace(/[A-Z]/g, x => `_${x.toLowerCase()}`)
    if (k === kk) {
      return
    }
    newObj[kk] = obj[k]
    delete newObj[k]
  })
  return newObj
}
export const revertUnderscoreKeys = obj => {
  if (!obj) return obj
  const newObj = obj
  Object.keys(newObj).forEach(k => {
    const kk = k.replace(
      /(.)_([a-z])/g,
      (x, x1, x2) => `${x1}${x2.toUpperCase()}`,
    )
    if (k === kk) {
      return
    }
    newObj[kk] = obj[k]
    delete newObj[k]
  })
  return newObj
}

export const toArray = (obj, sep = ',') => {
  if (typeof obj === 'string') return obj.split(sep)
  if (Array.isArray(obj)) return obj
  if (typeof obj === 'boolean') return [obj]
  if (!obj) return null
  return [obj]
}
