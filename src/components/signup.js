import React, { useState } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { signUp } from '../service'
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core'

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

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignUp() {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [response, setResponse] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [failureMsg, setFailureMsg] = useState('')
  const [successAlertOpen, setSuccessAlertOpen] = useState(false)
  const [failureAlertOpen, setFailureAlertOpen] = useState(false)

  const onUsernameChange = event => {
    // console.log("username:", event.target.value)
    setUsername(event.target.value)
  }

  const onPasswordChange = event => {
    // console.log("password:", event.target.value)
    setPassword(event.target.value)
  }

  const onAccountChange = event => {
    // console.log("account:", event.target.value)
    setAccount(event.target.value)
  }

  const onEmailChange = event => {
    // console.log("email:", event.target.value)
    setEmail(event.target.value)
  }

  const handleSuccessAlertClose = (event, reason) => {
    if (reason == 'clickaway') {
      return
    }
    setSuccessAlertOpen(false)
  }

  const handleFailureAlertClose = (event, reason) => {
    if (reason == 'clickaway') {
      return
    }
    setFailureAlertOpen(false)
  }

  const handleSignUp = () => {
    signUp({ username, account, password, email, setResponse })

    if (response == null || response.status >= 500) {
      setFailureMsg('服务器错误')
      setFailureAlertOpen(true)
    } else if (response.StatusCode === 100) {
      setSuccessMsg(response.Msg)
      setSuccessAlertOpen(true)
    } else if (response.StatusCode > 0 || response.StatusCode === 400) {
      setFailureMsg(response.Msg)
      setFailureAlertOpen(true)
    }
    setResponse(null)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          注册
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={onUsernameChange}
                variant='outlined'
                required
                fullWidth
                id='username'
                label='用户名'
                name='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onAccountChange}
                variant='outlined'
                required
                fullWidth
                id='account'
                label='帐号'
                name='account'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onEmailChange}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='邮箱'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onPasswordChange}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='密码'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSignUp}
          >
            注册
          </Button>

          <Snackbar
            open={successAlertOpen}
            autoHideDuration={3000}
            onClose={handleSuccessAlertClose}
          >
            <Alert onClose={handleSuccessAlertClose} severity='success'>
              {successMsg}
            </Alert>
          </Snackbar>

          <Snackbar
            open={failureAlertOpen}
            autoHideDuration={3000}
            onClose={handleFailureAlertClose}
          >
            <Alert onClose={handleFailureAlertClose} severity='error'>
              {failureMsg}
            </Alert>
          </Snackbar>

          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                登陆
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
