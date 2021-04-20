import { createStore } from 'redux'
import gojApp from './reducers'

const configureStore = () => {
  // TODO Persist state to localStorage
  // const persistedState = loadState()
  const store = createStore(gojApp)

  store.getState().loggedIn = window.localStorage.getItem('loggedIn')

  return store
}

export default configureStore
