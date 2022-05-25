const express = require('express');
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')


const connect = require("./connection/connection");
const userRoute = require("./routes/users")
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const uploadRoute = require('./routes/upload')

const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet({
    crossOriginResourcePolicy: false,
}))
app.use(morgan('common'))

dotenv.config()

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/upload' , uploadRoute)

app.listen(8000, () => {
    console.log('Server is running')
}) 