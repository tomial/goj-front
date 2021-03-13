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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Hidden,
  IconButton,
  Link as MLink,
} from '@material-ui/core'
import { useState, Fragment } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import ForumRoundedIcon from '@material-ui/icons/ForumRounded'
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
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

export default function App() {
  const classes = useStyles()
  const [loggedIn, setLoggedIn] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [drawerAnchor, setDrawerAnchor] = useState(null)

  // 点击用户菜单
  const handleUserButtonClick = event => {
    setUserMenuAnchor(event.currentTarget)
  }

  // 用户菜单关闭
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
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
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Box className={classes.title}>
            <Typography variant='h6'>
              <MLink href='#' color='inherit' underline='none'>
                GOJ
              </MLink>
            </Typography>
          </Box>

          <Hidden xsDown>
            <Box className={classes.menu}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label='题目' icon={<MenuBookRoundedIcon />} />
                <Tab label='社区' icon={<ForumRoundedIcon />} />
                <Tab label='题解' icon={<CreateRoundedIcon />} />
              </Tabs>
            </Box>

            <Box
              display={loggedIn ? 'none' : 'flex'}
              className={classes.userButton}
            >
              <Button color='inherit' size='large'>
                登录
              </Button>
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
              <MenuItem onClick={handleUserMenuClose}>退出</MenuItem>
            </Menu>
          </Hidden>

          <Hidden smUp>
            <Fragment>
              <IconButton
                color='inherit'
                edge='end'
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor='left'
                open={Boolean(drawerAnchor)}
                onClose={toggleDrawer(false)}
              >
                <List>
                  <ListItem button key='drawerHome'>
                    <ListItemIcon>
                      <HomeRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'首页'} />
                  </ListItem>

                  <Divider />

                  <ListItem button key='drawerProblems'>
                    <ListItemIcon>
                      <MenuBookRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'题目'} />
                  </ListItem>

                  <ListItem button key='drawerCommunity'>
                    <ListItemIcon>
                      <ForumRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'社区'} />
                  </ListItem>

                  <ListItem button key='drawerSolutions'>
                    <ListItemIcon>
                      <CreateRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'题解'} />
                  </ListItem>
                </List>
              </Drawer>
            </Fragment>
          </Hidden>
        </Toolbar>{' '}
      </AppBar>

      <TabPanel
        value={tabValue}
        index={0}
        onClick={() => setLoggedIn(!loggedIn)}
      >
        题目
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        社区
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        题解
      </TabPanel>
    </div>
  )
}
