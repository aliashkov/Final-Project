const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/socialmedia',{useNewUrlParser: true , useUnifiedTopology : true} , () => {
    console.log('connected')
});

module.exports = connect;
