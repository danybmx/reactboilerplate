export default function (socket) {
  socket.on('addCount', (count) => {
    socket.broadcast.emit('count', count + 1);
  });
}
