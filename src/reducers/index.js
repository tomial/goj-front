import { combineReducers } from 'redux'
import login from './login'
import setuid from './setuid'
import setusername from './setusername'
import switchTab from './switchTab'

const gojApp = combineReducers({
  loggedIn: login,
  tabSelected: switchTab,
  uid: setuid,
  username: setusername,
})

export default gojApp
