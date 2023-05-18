const socket = socketServer();

socket.on("products", (data) => {
  console.log(data);
  
});