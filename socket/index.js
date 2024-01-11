const io = require("socket.io")(8900, {
  cors: {
    origin: "*",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // console.log("a user connected");
  io.emit("welcome", "hello this socket server");
  io.emit("chat_room");

  socket.on("addUser", (id) => {
    addUser(id, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("send_message", (id, recepientId, messageType, message) => {
    const user = getUser(id);
    io.emit("receive_message");
  });

  socket.on("disconnect", () => {
    // console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
