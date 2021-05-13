import { createStore } from 'redux'
import gojApp from './reducers'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'

const configureStore = () => {
  const persistedState = loadState()
  const store = createStore(gojApp, persistedState)

  store.subscribe(
    throttle(() => {
      saveState({
        uid: store.getState().uid,
        username: store.getState().username,
        loggedIn: store.getState().loggedIn,
      })
    }),
    2000
  )

  return store
}

export default configureStore
