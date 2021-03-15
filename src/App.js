import { Provider } from 'react-redux'
import NavBar from './components/navbar'
import Tab from './components/tab'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from './configureStore'

const store = configureStore()

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <NavBar />
          <Tab />
        </Router>
      </Provider>
    </div>
  )
}
