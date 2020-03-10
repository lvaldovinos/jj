export function strToBoolean (value = '') {
  if (!Object.is(typeof value, 'string')) {
    throw new Error('value string is required')
  }
  return value === 'true'
}

