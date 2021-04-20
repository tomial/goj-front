import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {
  Box,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Hidden,
  IconButton,
  ButtonGroup,
} from '@material-ui/core'
import { useState, Fragment } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import ForumRoundedIcon from '@material-ui/icons/ForumRounded'
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded'
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded'
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded'
import { logIn, logOut } from '../actions'
import { connect } from 'react-redux'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    flexGrow: 1,
    display: 'flex',
  },
  menu: {
    display: 'flex',
    justifyContent: 'center',
  },
  userButton: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
}))

const NavBar = ({ loggedIn, dispatch }) => {
  const classes = useStyles()
  const location = useLocation()
  let path = location.pathname
  const [drawerAnchor, setDrawerAnchor] = useState(null)
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)
  const [tabSelected, setTabSelected] = useState(path.slice(1, path.length))

  // 点击用户菜单
  const handleUserButtonClick = event => {
    setUserMenuAnchor(event.currentTarget)
  }

  // 用户菜单关闭
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const handleUserLogOut = () => {
    handleUserMenuClose()
    dispatch(logOut)
  }

  const handleTabSelected = (event, newValue) => {
    if (['problems', 'solutions', 'community'].includes(newValue)) {
      setTabSelected(newValue)
    } else {
      setTabSelected(null)
    }
  }

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    if (open) {
      setDrawerAnchor(event.currentTarget)
    } else {
      setDrawerAnchor(null)
    }
  }

  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <Box className={classes.title}>
          <Typography
            variant='h6'
            onClick={() => handleTabSelected(null, 'index')}
          >
            <Link
              component={RouterLink}
              to='/'
              color='inherit'
              underline='none'
            >
              GOJ
            </Link>
          </Typography>
        </Box>

        <Hidden xsDown>
          <Box className={classes.menu}>
            <Tabs value={tabSelected} onChange={handleTabSelected}>
              <Tab
                value='problems'
                label='题目'
                icon={<MenuBookRoundedIcon />}
                component={RouterLink}
                to='/problems'
              />
              <Tab
                value='community'
                label='社区'
                icon={<ForumRoundedIcon />}
                component={RouterLink}
                to='/community'
              />
              <Tab
                value='solutions'
                label='题解'
                icon={<CreateRoundedIcon />}
                component={RouterLink}
                to='/solutions'
              />
            </Tabs>
          </Box>

          <Box
            display={loggedIn ? 'none' : 'flex'}
            className={classes.userButton}
          >
            <ButtonGroup color='primary' size='large' variant='contained'>
              <Button>
                <Link
                  onClick={() => {
                    dispatch(logIn)
                  }}
                  component={RouterLink}
                  to='/login'
                  color='inherit'
                  underline='none'
                >
                  登录
                </Link>
              </Button>
              <Button>
                <Link
                  component={RouterLink}
                  to='/register'
                  color='inherit'
                  underline='none'
                >
                  注册
                </Link>
              </Button>
            </ButtonGroup>
          </Box>

          <Box
            display={loggedIn ? 'flex' : 'none'}
            className={classes.userButton}
          >
            <Button
              onClick={handleUserButtonClick}
              color='inherit'
              size='large'
              startIcon={<AccountCircleIcon />}
            >
              Mudai
            </Button>
          </Box>
          <Menu
            id='simple-menu'
            anchorEl={userMenuAnchor}
            keepMounted
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
          >
            <MenuItem onClick={handleUserMenuClose}>个人信息</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>账号设置</MenuItem>
            <Divider />
            <MenuItem onClick={handleUserLogOut}>退出</MenuItem>
          </Menu>
        </Hidden>

        <Hidden smUp>
          <Fragment>
            <IconButton color='inherit' edge='end' onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor='left'
              open={Boolean(drawerAnchor)}
              onClose={toggleDrawer(false)}
            >
              <List>
                <ListItem
                  button
                  component={RouterLink}
                  to='/'
                  key='drawerHome'
                  onClick={() => {
                    toggleDrawer(false)
                    handleTabSelected(null, null)
                  }}
                >
                  <ListItemIcon>
                    <HomeRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'首页'} />
                </ListItem>
                <Divider />
                <ListItem
                  button
                  key='drawerProblems'
                  component={RouterLink}
                  to='/problems'
                  onClick={() => {
                    toggleDrawer(false)
                    handleTabSelected(null, 'problems')
                  }}
                >
                  <ListItemIcon>
                    <MenuBookRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'题目'} />
                </ListItem>
                <ListItem
                  button
                  key='drawerCommunity'
                  component={RouterLink}
                  to='/community'
                  onClick={() => {
                    toggleDrawer(false)
                    handleTabSelected(null, 'community')
                  }}
                >
                  <ListItemIcon>
                    <ForumRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'社区'} />
                </ListItem>
                <ListItem
                  button
                  key='drawerSolutions'
                  component={RouterLink}
                  to='/solutions'
                  onClick={() => {
                    toggleDrawer(false)
                    handleTabSelected(null, 'solutions')
                  }}
                >
                  <ListItemIcon>
                    <CreateRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'题解'} />
                </ListItem>
                <Divider />

                {loggedIn ? (
                  <ListItem
                    button
                    key='drawerUser'
                    onClick={handleUserButtonClick}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={'用户'} />
                  </ListItem>
                ) : (
                  <div>
                    <ListItem
                      button
                      component={RouterLink}
                      to='/login'
                      key='drawerLogin'
                    >
                      <ListItemIcon>
                        <PowerSettingsNewRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary='登录' />
                    </ListItem>
                    <ListItem
                      button
                      component={RouterLink}
                      to='register'
                      key='drawerRegister'
                    >
                      <ListItemIcon>
                        <PersonAddRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary='注册' />
                    </ListItem>
                  </div>
                )}
              </List>
              <Menu
                id='simple-menu'
                anchorEl={userMenuAnchor}
                keepMounted
                open={Boolean(userMenuAnchor)}
                onClose={handleUserMenuClose}
              >
                <MenuItem onClick={handleUserMenuClose}>个人信息</MenuItem>
                <MenuItem onClick={handleUserMenuClose}>账号设置</MenuItem>
                <Divider />
                <MenuItem onClick={handleUserLogOut}>退出</MenuItem>
              </Menu>
            </Drawer>
          </Fragment>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
  }
}

export default connect(mapStateToProps)(NavBar)
