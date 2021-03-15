import { combineReducers } from 'redux'
import login from './login'
import switchTab from './switchTab'

const gojApp = combineReducers({
  loggedIn: login,
  tabSelected: switchTab,
})

export default gojApp
