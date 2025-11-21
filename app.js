const express = require('express')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

app
    .use(favicon(__dirname+'/favicon.ico'))
    .use(morgan('dev'))
    .use(cors())
    .use(bodyParser.json())

require

app.use(({res}) => {
  const message = 'Unable to find the resource requested! You can try another URL.'
  res.status(404).json({message})
})

app.listen(port, () => {
    console.log(`\nMy API is running on : http://localhost:${port}`)
})