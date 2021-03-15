import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { connect } from 'react-redux'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const Tab = ({ tabSelected, dispatch }) => {
  return (
    <div>
      <TabPanel value={tabSelected} index={0}>
        题目
      </TabPanel>
      <TabPanel value={tabSelected} index={1}>
        社区
      </TabPanel>
      <TabPanel value={tabSelected} index={2}>
        题解
      </TabPanel>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    tabSelected: state.tabSelected,
  }
}

export default connect(mapStateToProps)(Tab)
