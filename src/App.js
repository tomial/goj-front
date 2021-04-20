import { Provider } from 'react-redux'
import NavBar from './components/navbar'
import Tab from './components/tab'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import configureStore from './configureStore'
import Login from './components/login'
import SignUp from './components/signup'

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/login'>
            {store.getState().loggedIn ? <Redirect to='/' /> : <Login />}
          </Route>
          <Route path='/register'>
            {store.getState().loggedIn ? <Redirect to='/' /> : <SignUp />}
          </Route>

          <Route path='/'>
            <NavBar />
            <Tab />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}
