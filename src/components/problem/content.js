import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  Snackbar,
  Typography,
  LinearProgress,
  IconButton,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '../alert'
import marked from 'marked'
import { useEffect, useState } from 'react'
import MonacoEditor from 'react-monaco-editor'
import { useLocation, useParams } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProblemContent, submitCode } from '../../service/index'

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
  let text = marked(raw)
  return { __html: text }
}

const resultMsg = {
  0: '提交通过',
  1: '答案错误',
  2: '运行时出现错误',
  3: '编译错误',
  4: '未知错误',
  5: '超过运行时间限制',
  6: '超过运行内存限制',
}

function Content({ loggedIn }) {
  const classes = useStyles()
  const location = useLocation()
  const path = location.pathname
  const { id } = useParams()
  const submissionPath = getSubmissionPath(path, id)

  const [code, setCode] = useState('')

  const [loading, setLoading] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [language, setLanguage] = useState('cpp')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('简单')
  const [rlimit, setRlimit] = useState(10)
  const [tlimit, setTlimit] = useState(1000)

  const [failureMsg, setFailureMsg] = useState('')
  const [failureAlertOpen, setFailureAlertOpen] = useState(false)

  const [result, setResult] = useState(null)

  useEffect(() => {
    getProblemContent(id)
      .then(response => {
        setName(response.data.Name)
        setDescription(response.data.Description)
        setDifficulty(response.data.Difficulty)
        setRlimit(response.data.Rlimit)
        setTlimit(response.data.Tlimit)
      })
      .catch(error => {
        console.log(error.status)
      })
  }, [id])

  const handleFailureAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setFailureAlertOpen(false)
  }

  const handleDialogClose = event => {
    setDialogOpen(false)
  }

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
    setLoading(true)
    submitCode(Number(id), code, language)
      .then(response => {
        setLoading(false)

        setResult({
          code: response.data.Code,
          msg: response.data.Msg,
          tusage: response.data.Tusage,
          rusage: response.data.Rusage,
        })
        console.log(response.data.Msg.split())

        setDialogOpen(true) // 显示提示
      })
      .catch(error => {
        setLoading(false)
        console.log(error === null)
        setFailureMsg('提交失败')
        setFailureAlertOpen(true)
      })
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
          <Box m={2}>
            #{id} {name}
          </Box>
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
              <div dangerouslySetInnerHTML={getMarkdownText(description)}></div>
            </Box>
          </Box>

          <Box m={2} minHeight={300} className={classes.limit}>
            <List>
              <ListItem divider alignItems='center'>
                <ListItemText primary={'难度'} />
                <ListSubheader>{difficulty}</ListSubheader>
              </ListItem>

              <ListItem divider alignItems='center'>
                <ListItemText primary={'时间限制'} />
                <ListSubheader>{tlimit}ms</ListSubheader>
              </ListItem>

              <ListItem divider alignItems='center'>
                <ListItemText primary={'内存限制'} />
                <ListSubheader>{rlimit}MB</ListSubheader>
              </ListItem>
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
            theme='vs-dark'
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
          {!loggedIn ? (
            <Button color='primary' variant='outlined'>
              <Link
                component={RouterLink}
                to='/login'
                color='inherit'
                underline='none'
              >
                登陆
              </Link>
            </Button>
          ) : (
            <Button color='primary' variant='outlined' onClick={handleSubmit}>
              提交
            </Button>
          )}
        </Box>
        {loading ? <LinearProgress /> : ''}

        <Box>
          <Snackbar
            open={failureAlertOpen}
            autoHideDuration={1000}
            onClose={handleFailureAlertClose}
          >
            <Alert onClose={handleFailureAlertClose} severity='error'>
              {failureMsg}
            </Alert>
          </Snackbar>
        </Box>

        {result === null ? (
          ''
        ) : (
          <Box>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <DialogTitle>运行结果：{resultMsg[result.code]}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {result.code === 0 ? (
                    <Box>
                      <Typography>运行时间：{result.tusage}ms</Typography>
                      <Typography>运行内存：{result.rusage}KB</Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant='h6' color='error'>
                        错误信息：
                      </Typography>
                      {result.msg.split(/\r?\n/).map(item => (
                        <Typography noWrap>{item}</Typography>
                      ))}
                    </Box>
                  )}
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <IconButton onClick={handleDialogClose}>
                  <CloseIcon />
                </IconButton>
              </DialogActions>
            </Dialog>
          </Box>
        )}
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
