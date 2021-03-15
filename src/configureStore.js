import { createStore } from 'redux'
import gojApp from './reducers'

const configureStore = () => {
  // TODO Persist state to localStorage
  // const persistedState = loadState()
  const store = createStore(gojApp)

  return store
}

export default configureStore
