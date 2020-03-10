let mainReducer

export function getMainReducer () {
  return mainReducer
}

export function setMainReducer (reducer) {
  mainReducer = reducer
}

export function combineReducers (reducers) {
  return (state, action) => {
    return Object
      .keys(reducers)
      .reduce((currState, reducerName) => {
        currState[reducerName] = reducers[reducerName](state && state[reducerName], action)
        return currState
      }, {})
  }
}
