import mongoChat from "../service/chatService";
const db = new mongoChat();


export default (io) => {
    io.on("connection", (socket) => {
      console.log("👤 New user connected. Soquet ID : ", socket.id);
  
      socket.on("new-message", async (message) => {
        db.create(message);
        const messages = await db.getAll();
        console.log(messages);
        socket.emit("refresh-messages", messages);
        socket.broadcast.emit("refresh-messages", messages);
      });
  
      socket.on("disconnect", () => {
        console.log("User was disconnected");
      });
    });
  };