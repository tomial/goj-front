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
import { useEffect, useState } from 'react'
import { getSubmissions } from '../../service'

const useStyles = makeStyles(theme => {})

function createData(id, createTime, status, tusage, rusage, language) {
  return { id, createTime, status, tusage, rusage, language }
}

const langCode = {
  0: 'C',
  1: 'C++',
  2: 'Go',
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

let rid = 0

export default function Submission() {
  const classes = useStyles()
  const location = useLocation()
  const path = location.pathname
  const [page, setPage] = useState(0)
  const [submissions, setSubmission] = useState([])

  const { id } = useParams()
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  useEffect(() => {
    getSubmissions(id).then(response => {
      setSubmission(
        response.data.map(r => {
          return createData(
            rid,
            r.CreatedAt,
            resultMsg[r.Result],
            r.Tusage,
            r.Rusage,
            langCode[r.Language]
          )
        })
      )
    })
  }, [id])

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
                  <TableCell align='left'>语言</TableCell>
                  <TableCell aligh='left'>状态</TableCell>
                  <TableCell align='left'>运行时间</TableCell>
                  <TableCell align='left'>消耗内存</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {submissions.slice(page * 5, page * 5 + 5).map(record => (
                  <TableRow key={record.id}>
                    <TableCell align='left'>{record.createTime}</TableCell>
                    <TableCell component='th' scope='row'>
                      {record.language}
                    </TableCell>
                    <TableCell align='left'>{record.status}</TableCell>
                    <TableCell align='left'>{record.tusage}</TableCell>
                    <TableCell align='left'>{record.rusage}</TableCell>
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
