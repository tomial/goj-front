import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Link,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableFooter,
  TablePagination,
} from '@material-ui/core'
import { useState } from 'react'

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
})

function createData(name, id, percent, diff) {
  return { name, id, percent, diff }
}

const rows = [
  createData('A + B', 1, 50.0, '简单'),
  createData('A + B', 2, 50.0, '简单'),
  createData('A + B', 3, 50.0, '简单'),
  createData('A + B', 4, 50.0, '简单'),
  createData('A + B', 5, 50.0, '简单'),
  createData('A + B', 6, 50.0, '简单'),
  createData('A + B', 7, 50.0, '简单'),
  createData('A + B', 8, 50.0, '简单'),
  createData('A + B', 9, 50.0, '简单'),
  createData('A + B', 10, 50.0, '简单'),
  createData('A + B', 11, 50.0, '简单'),
  createData('A + B', 12, 50.0, '简单'),
  createData('A + B', 13, 50.0, '简单'),
  createData('A + B', 14, 50.0, '简单'),
  createData('A + B', 15, 50.0, '简单'),
  createData('A + B', 16, 50.0, '简单'),
]

export default function BasicTable() {
  const classes = useStyles()

  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align='left'>#</TableCell>
            <TableCell>标题</TableCell>
            <TableCell align='left'>通过率</TableCell>
            <TableCell align='left'>难度</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * 10, page * 10 + 10).map(row => (
            <TableRow key={row.id}>
              <TableCell align='left'>{row.id}</TableCell>
              <TableCell component='th' scope='row'>
                <Link
                  component={RouterLink}
                  to={'problems/content/' + row.id}
                  underline='none'
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell align='left'>{row.percent}%</TableCell>
              <TableCell align='left'>{row.diff}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={rows.length}
              rowsPerPage={10}
              rowsPerPageOptions={[]}
              onChangePage={handleChangePage}
              page={page}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
