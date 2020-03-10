import { getState, setState } from './state.js'
import { getMainReducer } from './reducer.js'
import { publish } from './subscriber.js'

export function dispatch (action) {
  const currentState = getState()
  const mainReducer = getMainReducer()
  const newState = mainReducer(currentState, action)
  setState(newState)
  publish()
}
