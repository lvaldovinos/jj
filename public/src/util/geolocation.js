export function getDeviceLocation () {
  if (!navigator.geolocation) {
    const error = new Error('Device does not support location')
    error.code = 'NO_DEVICE_SUPPORT'
    throw error
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}
