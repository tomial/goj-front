import MonacoEditor from 'react-monaco-editor'
import DeleteIcon from '@material-ui/icons/Delete'
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Divider,
  Paper,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Snackbar,
  TextField,
  Radio,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import Alert from '../alert'
import { getRole, submitProblem } from '../../service/index'

const monacoOptions = {
  minimap: {
    enabled: false,
  },
  selectOnLineNumbers: true,
  fontSize: 18,
  automaticLayout: true,
}

export default function AddProblem() {
  const [testcases, setTestcases] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('简单')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [tlimit, setTlimit] = useState(1000)
  const [rlimit, setRlimit] = useState(10)

  const [successMsg, setSuccessMsg] = useState('')
  const [failureMsg, setFailureMsg] = useState('')
  const [successAlertOpen, setSuccessAlertOpen] = useState(false)
  const [failureAlertOpen, setFailureAlertOpen] = useState(false)

  const [role, setRole] = useState('')

  useEffect(() => {
    getRole().then(response => {
      setRole(response.data)
    })
  })

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

  const onMonacoChange = (newValue, e) => {
    setDescription(newValue)
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleInputChange = event => {
    setInput(event.target.value)
  }

  const handleOutputChange = event => {
    setOutput(event.target.value)
  }

  const handleRlimitChange = event => {
    setRlimit(parseInt(event.target.value))
  }

  const handleTlimitChange = event => {
    setTlimit(parseInt(event.target.value))
  }

  const handlePreviewInputChange = index => {
    return event => {
      testcases[index].input = event.target.value
    }
  }

  const handlePreviewOutputChange = index => {
    return event => {
      testcases[index].input = event.target.value
    }
  }

  const handleRemoveCaseClick = index => {
    return event => {
      testcases.splice(index, 1)
      setTestcases([...testcases])
    }
  }

  const handleAddClick = event => {
    if (input === '' || output === '') return
    addCase()
    setInput('')
    setOutput('')
  }

  const handleDiffChange = event => {
    setDifficulty(event.target.value)
  }

  const handleSubmitClick = event => {
    if (
      name === '' ||
      description === '' ||
      testcases.length <= 0 ||
      tlimit <= 0 ||
      rlimit <= 0
    ) {
      return
    }
    console.log({ name, description, difficulty, testcases, tlimit, rlimit })
    submitProblem({ name, description, difficulty, testcases, tlimit, rlimit })
      .then(response => {
        if (response.data.StatusCode === 210) {
          setSuccessMsg(response.data.Msg)
          setSuccessAlertOpen(true)
        }
      })
      .catch(error => {
        if (error.message === 'Network Error') {
          setFailureMsg('网络错误')
          setFailureAlertOpen(true)
        } else if (error === null || error.response.status === 400) {
          setFailureMsg('请求错误：' + error.response.data.Msg)
          setFailureAlertOpen(true)
        } else if (error.response.status === 500) {
          setFailureMsg('服务器错误：' + error.response.data.Msg)
          setFailureAlertOpen(true)
        }
      })
  }

  const addCase = () => {
    setTestcases([...testcases, { input, output }])
  }

  if (role === '管理员') {
    return (
      <Box>
        <Paper>
          <Typography variant='h3' gutterBottom>
            <Box m={2}>添加自定义题目</Box>
          </Typography>

          <Divider />

          <Typography variant='h4' gutterBottom>
            <Box m={2}>题目标题</Box>
          </Typography>

          <Box m={2}>
            <TextField
              onChange={handleNameChange}
              value={name}
              id='title'
              label='标题'
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
              variant='filled'
            />
          </Box>

          <Box m={2}>
            <RadioGroup
              name='difficulty'
              value={difficulty}
              onChange={handleDiffChange}
            >
              <FormControlLabel value='简单' control={<Radio />} label='简单' />
              <FormControlLabel value='中等' control={<Radio />} label='中等' />
              <FormControlLabel value='困难' control={<Radio />} label='困难' />
            </RadioGroup>
          </Box>
          <Typography variant='h4' gutterBottom>
            <Box m={2}>题目描述</Box>
            <Divider />
          </Typography>

          <Box height={300} border={1} borderRadius='borderRadius' m={2}>
            <MonacoEditor
              language='markdown'
              theme='vs-dark'
              options={monacoOptions}
              value={description}
              onChange={onMonacoChange}
            />
          </Box>

          <Box m={2}>
            时间限制：
            <TextField value={tlimit} onChange={handleTlimitChange} /> ms
          </Box>
          <Box m={2}>
            空间限制：
            <TextField value={rlimit} onChange={handleRlimitChange} /> MB
          </Box>

          <Typography variant='h5' gutterBottom>
            <Box m={2}>添加测试用例</Box>
            <Divider />
          </Typography>

          <Box m={2}>
            <TextField
              multiline
              onChange={handleInputChange}
              value={input}
              id='input'
              label='输入'
              fullWidth
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
              variant='filled'
            />

            <TextField
              multiline
              onChange={handleOutputChange}
              value={output}
              id='output'
              label='输出'
              fullWidth
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
              variant='filled'
            />
          </Box>

          <Box m={2}>
            <IconButton onClick={handleAddClick}>
              <AddIcon />
            </IconButton>
          </Box>

          <Box m={2}>
            <Typography>已添加的用例：</Typography>
          </Box>
          <Box>
            {testcases.map(function (c, i) {
              return (
                <Box m={2}>
                  <Typography>用例 {i + 1}</Typography>
                  <TextField
                    multiline
                    defaultValue={c.input}
                    onChange={handlePreviewInputChange(i)}
                    id={'input-prev' + i}
                    label='输入'
                    fullWidth
                    margin='normal'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='filled'
                  />
                  <TextField
                    multiline
                    defaultValue={c.output}
                    onChange={handlePreviewOutputChange(i)}
                    id={'output-prev' + i}
                    label='输出'
                    fullWidth
                    margin='normal'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='filled'
                  />
                  <IconButton onClick={handleRemoveCaseClick(i)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )
            })}
          </Box>

          <Box>
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
          </Box>

          <Button
            fullWidth
            variant='contained'
            onClick={handleSubmitClick}
            disabled={
              name === '' ||
              description === '' ||
              difficulty === '' ||
              testcases.length === 0
            }
          >
            提交
          </Button>
        </Paper>
      </Box>
    )
  } else return <Typography variant='h1'>用户无权访问该页面</Typography>
}
