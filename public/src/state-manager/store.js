import { setState } from './state.js'
import { dispatch } from './dispatch.js'
import { setMainReducer } from './reducer.js'

export function createStore (reducer) {
  if (typeof reducer !== 'function') {
    throw new Error('createStore requires valid function')
  }
  setMainReducer(reducer)
}
