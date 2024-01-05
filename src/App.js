import { Provider } from 'react-redux'
import NavBar from './components/navbar'
import Tab from './components/tab'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import configureStore from './configureStore'
import Login from './components/login'
import SignUp from './components/signup'
import AddProblem from './components/problem/add'

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <SignUp />
          </Route>

          <Route path='/problems/add'>
            <AddProblem />
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
