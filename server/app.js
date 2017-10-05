const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())

router(app)

app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`))
