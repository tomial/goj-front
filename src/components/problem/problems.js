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
import { useEffect, useState } from 'react'
import { fetchProblemList } from '../../service/index'

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
})

export default function BasicTable() {
  const classes = useStyles()
  // const [list, setList] = useState([])
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    fetchProblemList(page, 10)
      .then(response => {
        // setList(JSON.parse(response.data))
        setRows([...response.data])
      })
      .catch(error => {
        setRows([])
      })
  }, [page])

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
            <TableCell align='left'>难度</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.ID}>
              <TableCell align='left'>{row.ID}</TableCell>
              <TableCell component='th' scope='row'>
                <Link
                  component={RouterLink}
                  to={'problems/content/' + row.ID}
                  underline='none'
                >
                  {row.Name}
                </Link>
              </TableCell>
              <TableCell align='left'>{row.Difficulty}</TableCell>
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
