const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = []
let amountRefreshes = 0;


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
    //console.log("User connected")
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendNotification", ({senderName , recieverName}) => {
        console.log(senderName)
        console.log(recieverName)
        console.log('============================')
        const reciever = getUser(recieverName)
        io.to(reciever?.socketId).emit("getNotification", {
            senderName,
            type : 1
        });
    })

    socket.on("refreshPost", () => {
        amountRefreshes++;
        io.emit("refreshPosts", amountRefreshes);
    });


    socket.on("changeName", ({ oldName, newName }) => {
        io.emit("refreshNames", {
            oldName,
            newName,
        });
    });

    socket.on("followUser", ({ followed, userModify}) => {
        io.emit("refreshFollowed", {
            followed,
            userModify,
        });
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
        //console.log("User disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users);
    })

})

module.exports = io;