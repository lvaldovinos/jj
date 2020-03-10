import {
  createStore,
  dispatch,
  getState,
  subscribe,
  combineReducers
} from '../state-manager/main.js'
import { e } from '../ui/e.js'
import { StateObserver } from '../ui/observer.js'
import { MyCounter, counter } from './components/counter.js' 

function countReducer (state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

createStore(combineReducers({
  count: countReducer
}))

function increment () {
  dispatch({
    type: 'INCREMENT'
  })
}

function decrement () {
  dispatch({
    type: 'DECREMENT'
  })
}

const incButton = e('button', {
  onclick: increment
}, [
  '+'
])

const decButton = e('button', {
  onclick: decrement
}, [
  '-'
])

const App = e('section', {}, [
  counter,
  incButton,  
  decButton
])

subscribe(() => {
  console.log(getState())
})

const app = document.getElementById('app')
app.appendChild(App)
dispatch({})

