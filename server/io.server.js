export default function (socket) {
  console.log('New client connected');

  socket.on('addCount', (count) => {
    console.log(count);
    socket.broadcast.emit('count', count + 1);
  });
}
