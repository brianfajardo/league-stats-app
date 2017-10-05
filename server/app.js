const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./router')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())

router(app)

// Serve build in production.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../build/index.html'))
  )
}

app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`))
