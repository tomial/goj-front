import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Link,
  makeStyles,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import { useLocation, useParams } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'

const useStyles = makeStyles(theme => { })

function createData(id, createTime, status, costTime, language) {
  return { id, createTime, status, costTime, language }
}

const submissions = [
  createData(1, '6个月前', 'COMPILE ERROR', '55ms', 'C'),
  createData(2, '6个月前', 'ACCEPTED', '72ms', 'C++'),
  createData(3, '6个月前', 'ACCEPTED', '472ms', 'Go'),
]

export default function Submission() {
  const classes = useStyles()
  const location = useLocation()
  const path = location.pathname
  const [page, setPage] = useState(0)
  const { id } = useParams()
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <Box>
      <Paper>
        <Typography>
          <Box fontSize='h3.fontSize' m={2}>
            #{id} A + B 的提交记录
          </Box>
        </Typography>

        <Divider />

        <Box display='flex' m={2}>
          <ButtonGroup color='primary'>
            <Button>
              <Link
                component={RouterLink}
                to={'/problems/content/' + id}
                color='inherit'
                underline='none'
              >
                题目
              </Link>
            </Button>
            <Button>
              <Link
                component={RouterLink}
                to={path}
                color='inherit'
                underline='none'
              >
                提交记录
              </Link>
            </Button>
          </ButtonGroup>
        </Box>

        <Divider />

        <Box>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>提交时间</TableCell>
                  <TableCell aligh='left'>状态</TableCell>
                  <TableCell align='left'>运行时间</TableCell>
                  <TableCell align='left'>语言</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.slice(page * 5, page * 5 + 5).map(record => (
                  <TableRow key={record.id}>
                    <TableCell align='left'>{record.id}</TableCell>
                    <TableCell component='th' scope='row'>{record.status}</TableCell>
                    <TableCell align='left'>{record.createTime}</TableCell>
                    <TableCell align='left'>{record.language}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={submissions.length}
                    rowsPerPage={5}
                    rowsPerPageOptions={[]}
                    onChangePage={handleChangePage}
                    page={page}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  )
}
