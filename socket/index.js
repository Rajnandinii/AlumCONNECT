const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  let users = [];

  // const addUser = (userId, socketId) => {
  //   !users.some((user) => user.userId === userId) &&
  //     users.push({ userId, socketId });
  // };


const addUser = (userId, socketId) => {
  if (userId) {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
    console.log('Users after adding:', users);
  } else {
    console.log('Attempted to add user with null userId');
  }
};

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  

  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
  console.log('recid', receiverId);
  const user = getUser(receiverId);
  console.log('user:', user);
  if (user) {
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  } else {
    console.error(`User with receiverId ${receiverId} not found in the list of user with senderId ${senderId}`);
  }
});
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });