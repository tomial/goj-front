import React, { useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { login } from '../service/index'
import { Redirect } from 'react-router-dom'
import { logIn, setUID, setUsername } from '../actions'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        GOJ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export default function Login() {
  const classes = useStyles()
  const store = useStore()
  const [account, setAccount] = useState(null)
  const [password, setPassword] = useState(null)

  const [successMsg, setSuccessMsg] = useState('')
  const [failureMsg, setFailureMsg] = useState('')
  const [successAlertOpen, setSuccessAlertOpen] = useState(false)
  const [failureAlertOpen, setFailureAlertOpen] = useState(false)

  const dispatch = useDispatch()

  const handleSuccessAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSuccessAlertOpen(false)
  }

  const handleFailureAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setFailureAlertOpen(false)
  }

  const handleLogin = () => {
    setFailureAlertOpen(false)
    setSuccessAlertOpen(false)

    login({ account, password })
      .then(function (response) {
        dispatch(setUID(response.data.Username))
        dispatch(setUsername(response.data.Username))
        dispatch(logIn)
        setSuccessMsg('登陆成功')
        setSuccessAlertOpen(true)
      })
      .catch(function (error) {
        if (error.message === 'Network Error') {
          console.log(error.message)
        } else if (
          error.response === undefined ||
          error.response.status === 400
        ) {
          console.log(error.response)
          setFailureMsg('请求错误：' + error.response.data.Msg)
          setFailureAlertOpen(true)
        } else if (error.response.status >= 500) {
          console.log(error.response)
          setFailureMsg('服务器错误')
          setFailureAlertOpen(true)
        }
      })
  }

  const handleAccountChange = event => {
    setAccount(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  if (!store.getState().loggedIn) {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            用户登录
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={handleAccountChange}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='account'
              label='账号'
              name='account'
              autoComplete='off'
              autoFocus
            />
            <TextField
              onChange={handlePasswordChange}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='密码'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='记住我'
            />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={handleLogin}
            >
              登录
            </Button>
            <Snackbar
              open={successAlertOpen}
              autoHideDuration={1000}
              onClose={handleSuccessAlertClose}
            >
              <Alert onClose={handleSuccessAlertClose} severity='success'>
                {successMsg}
              </Alert>
            </Snackbar>

            <Snackbar
              open={failureAlertOpen}
              autoHideDuration={1000}
              onClose={handleFailureAlertClose}
            >
              <Alert onClose={handleFailureAlertClose} severity='error'>
                {failureMsg}
              </Alert>
            </Snackbar>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  忘记密码
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant='body2'>
                  {'注册'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    )
  } else {
    return <Redirect to='/' />
  }
}
