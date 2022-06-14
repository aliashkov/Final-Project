const express = require('express');
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = []
let amountRefreshes = 0;

console.log(users)

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log("User connected")
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("refreshPost", () => {
        amountRefreshes++;
        io.emit("refreshPosts", amountRefreshes);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        console.log(senderId, receiverId, text)
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });


    socket.on("disconnect", () => {
        console.log("User disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users);
    })

})


const connect = require("./connection/connection");
const userRoute = require("./routes/users")
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const uploadRoute = require('./routes/upload')
const conversationRoute = require('./routes/conversations')
const messageRoute = require('./routes/messages')

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
app.use('/api/comments', commentRoute)
app.use('/api/upload', uploadRoute)
app.use('/api/conversations', conversationRoute)
app.use('/api/messages', messageRoute)


app.listen(8000, () => {
    console.log('Server is running')
}) 