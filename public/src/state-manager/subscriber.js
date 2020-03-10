let subscriber

class Subscriber {
  constructor () {
    this.listeners = []
  }
  removeListener (listenerIndex) {
    if (typeof listenerIndex !== 'number') {
      throw new Error('removeListener requires a number')
    }
    if (this.listeners.length === 0) return this
    this.listeners = [
      ...this.listeners.slice(0, listenerIndex),
      ...this.listeners.slice(listenerIndex + 1)
    ]
    return this
  }
  addListener (callback) {
    if (typeof callback !== 'function') {
      throw new Error('subscribe requires a function')
    }
    const index = this.listeners.length
    this.listeners = [
      ...this.listeners,
      callback
    ]
    return index
  }
  publish () {
    this
      .listeners
      .forEach(listener => listener())
    return this
  }
}

export function subscribe (callback) {
  if (typeof callback !== 'function') {
    throw new Error('subscribe requires a function')
  }
  if (!subscriber) {
    subscriber = new Subscriber()
  }
  return subscriber.addListener(callback)
}

export function unsubscribe (listenerIndex) {
  if (typeof listenerIndex !== 'number') {
    throw new Error('unsubscribe requires a number')
  }
  subscriber.removeListener(listenerIndex)
}

export function publish () {
  if (subscriber) {
    subscriber.publish()
  }
}
