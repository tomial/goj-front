import { Box } from '@material-ui/core'
import { connect } from 'react-redux'
import Problems from './problem/problems.js'
import { Route, useLocation } from 'react-router'
import Content from './problem/content.js'
import Submission from './problem/submission.js'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

const Tab = ({ dispatch }) => {
  const location = useLocation()
  let path = location.pathname
  const id = path.split('/').pop()
  console.log(path)

  return (
    <div>
      <Route path='/'>
        <TabPanel value={path} index={'/'}>
          Welcome to GOJ!
        </TabPanel>
      </Route>

      <Route path='/problems/content/:id'>
        <TabPanel value={path} index={'/problems/content/' + id}>
          <Content />
        </TabPanel>
      </Route>

      <Route path='/problems/content/submission/:id'>
        <TabPanel value={path} index={'/problems/content/submission/' + id}>
          <Submission />
        </TabPanel>
      </Route>

      <Route path='/problems'>
        <TabPanel value={path} index={'/problems'}>
          <Problems />
        </TabPanel>
      </Route>

      <Route path='/community'>
        <TabPanel value={path} index={'/community'}>
          建设中...
        </TabPanel>
      </Route>
      <Route path='/solutions'>
        <TabPanel value={path} index={'/solutions'}>
          建设中...
        </TabPanel>
      </Route>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(Tab)
