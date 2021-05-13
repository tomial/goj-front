import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import marked from 'marked'
import { useState } from 'react'
import MonacoEditor from 'react-monaco-editor'
import { Redirect, useLocation, useParams } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  description: {
    flexGrow: 3,
  },
  limit: {
    flexGrow: 1,
  },
  submit: {
    justifyContent: 'flex-end',
  },
}))

const getSubmissionPath = (path, id) => {
  let arr = path.split('/')
  arr.pop()
  return arr.join('/') + '/submission/' + id
}

const getMarkdownText = raw => {
  let text = marked(`
  # Marked\n\nRendered by **marked**.\n\n# Test\n\n
  # Test\n\n# Test\n\n # Test
  `)
  return { __html: text }
}

const limit = ['难度', '时空限制', '总通过数量', '总尝试数']

function Content({ loggedIn }) {
  const classes = useStyles()
  const location = useLocation()
  const path = location.pathname
  const { id } = useParams()
  const submissionPath = getSubmissionPath(path, id)
  const [code, setCode] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [language, setLanguage] = useState('go')

  const onMonacoChange = (newValue, e) => {
    setCode(newValue)
  }

  const handleLanguageMenuClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const setLang = language => {
    return () => {
      setLanguage(language)
      setAnchorEl(null)
    }
  }

  const handleSubmit = () => {
    if (loggedIn) {
    } else {
      ;<Redirect to='/login' />
    }
  }

  const monacoOptions = {
    minimap: {
      enabled: false,
    },
    selectOnLineNumbers: true,
    fontSize: 18,
    fontFamily: 'monospace',
    automaticLayout: true,
  }

  return (
    <Box>
      <Paper>
        <Typography variant='h3' gutterBottom>
          <Box m={2}>#{id} A + B</Box>
          <Divider />
        </Typography>

        <Box display='flex' m={2}>
          <ButtonGroup color='primary'>
            <Button>
              <Link
                component={RouterLink}
                to={path}
                color='inherit'
                underline='none'
              >
                题目
              </Link>
            </Button>
            <Button>
              <Link
                component={RouterLink}
                to={submissionPath}
                color='inherit'
                underline='none'
              >
                提交记录
              </Link>
            </Button>
          </ButtonGroup>
        </Box>

        <Divider />

        <Box display='flex'>
          <Box className={classes.description} m={2} minHeight={300}>
            <Typography variant='subtitle1'>题目描述</Typography>
            <Box>
              <div dangerouslySetInnerHTML={getMarkdownText()}></div>
            </Box>
          </Box>

          <Box m={2} minHeight={300} className={classes.limit}>
            <List>
              {limit.map(item => {
                return (
                  <div>
                    <ListItem divider alignItems='center'>
                      <ListItemText primary={item} />
                      <ListSubheader>Test</ListSubheader>
                    </ListItem>
                  </div>
                )
              })}
            </List>
          </Box>
        </Box>

        <Divider />
        <Box m={2}>
          <Button onClick={handleLanguageMenuClick} variant='outlined'>
            {language}
          </Button>
          <Menu
            id='language-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={setLang('c')}>C</MenuItem>
            <MenuItem onClick={setLang('cpp')}>C++</MenuItem>
            <MenuItem onClick={setLang('go')}>Go</MenuItem>
          </Menu>
        </Box>

        <Box height={400} border={1} borderRadius='borderRadius' m={2}>
          <MonacoEditor
            options={monacoOptions}
            language={language}
            value={code}
            onChange={onMonacoChange}
          />
        </Box>
        <Box display='flex' mr={2} pb={2} className={classes.submit}>
          <Box mr={2}>
            <Button
              color='secondary'
              variant='outlined'
              onClick={() => setCode('')}
            >
              重置
            </Button>
          </Box>
          <Button color='primary' variant='outlined'>
            {!loggedIn ? (
              <Link
                component={RouterLink}
                to='/login'
                color='inherit'
                underline='none'
              >
                提交
              </Link>
            ) : (
              '登陆'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
  }
}

export default connect(mapStateToProps)(Content)
