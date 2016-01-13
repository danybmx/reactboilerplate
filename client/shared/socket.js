import ioClient from 'socket.io-client';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

let io;// = ioServer;
if (canUseDOM) {
  io = ioClient;
}

export default io;
