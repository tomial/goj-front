import MonacoEditor from 'react-monaco-editor'
import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Divider,
  makeStyles,
  Paper,
  IconButton,
  TextField,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { submitProblem } from '../../service/index'

const monacoOptions = {
  minimap: {
    enabled: false,
  },
  selectOnLineNumbers: true,
  fontSize: 18,
  automaticLayout: true,
}

const useStyles = makeStyles(theme => ({}))

let testcases = []

export default function AddProblem() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [tlimit, setTlimit] = useState(1000)
  const [rlimit, setRlimit] = useState(10)

  const onMonacoChange = (newValue, e) => {
    setDescription(newValue)
  }

  const handleTitleChange = event => {
    setTitle(event.target.value)
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

  const handleAddClick = event => {
    if (input === '' || output === '') return
    addCase()
    setInput('')
    setOutput('')
  }

  const handleSubmitClick = event => {
    if (
      description === '' ||
      testcases.length <= 0 ||
      tlimit <= 0 ||
      rlimit <= 0
    )
      return
    console.log(testcases)
    submitProblem({ description, testcases, tlimit, rlimit })
  }

  const addCase = () => {
    testcases.push({
      input,
      output,
    })
  }

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
            onChange={handleTitleChange}
            value={title}
            id='input'
            label='标题'
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            variant='filled'
          />
        </Box>
        <Typography variant='h4' gutterBottom>
          <Box m={2}>题目描述</Box>
          <Divider />
        </Typography>

        <Box height={300} border={1} borderRadius='borderRadius' m={2}>
          <MonacoEditor
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
                  defaultValue={c.input}
                  onChange={handlePreviewInputChange(i)}
                  id='output'
                  label='输入'
                  fullWidth
                  margin='normal'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='filled'
                />
                <TextField
                  defaultValue={c.output}
                  onChange={handlePreviewOutputChange(i)}
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
            )
          })}
        </Box>
        <Button fullWidth variant='contained' onClick={handleSubmitClick}>
          提交
        </Button>
      </Paper>
    </Box>
  )
}
