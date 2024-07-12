const { Server } = require("socket.io");

const io = new Server({
  cors: "http://localhost:5173",
});
const port = 3000;

let onlineUser = [];
io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  //listen to a connection
  socket.on("addNewUser", (userId) => {
    !onlineUser.some((user) => user.userId === userId) &&
      onlineUser.push({
        userId,
        socketId: socket.id,
      });
    io.emit("getOnlineUser", onlineUser);
  });

  //Disconnect user
  socket.on("disconnect", () => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUser", onlineUser);
    console.log("user disconnected", onlineUser);
  });

  //add message
  socket.on("sendMessages", (message) => {
    const user = onlineUser.find((user) => user.userId === message.recipientId);
    console.log("user", user);
    if (user) {
      io.to(user.socketId).emit("getMessages", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });
});

io.listen(port);
