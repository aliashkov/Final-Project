const express = require('express');
const moongose = require('mongoose');
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()

dotenv.config()

app.listen(8000, () => {
    console.log('Server is running')
}) 