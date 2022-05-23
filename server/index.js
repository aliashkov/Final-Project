const express = require('express');
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const connect = require("./connection/connection");
const userRoute = require("./routes/users")
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

dotenv.config()

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

app.listen(8000, () => {
    console.log('Server is running')
}) 