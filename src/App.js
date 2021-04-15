import { Provider } from 'react-redux'
import NavBar from './components/navbar'
import Tab from './components/tab'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
            <Login />
          </Route>
          <Router path='/register'>
            <SignUp />
          </Router>

          <Route path='/'>
            <NavBar />
            <Tab />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}
