import { join } from 'path';

global.__DEVELOPMENT__ = false;
if (process.env.NODE_ENV === 'development') {
  global.__DEVELOPMENT__ = true;
}

export default {
  port: 3000,
  env: process.env.NODE_ENV || 'development',
  paths: {
    root: __dirname,
    tools: join(__dirname, 'tools'),
    server: join(__dirname, 'server'),
    client: join(__dirname, 'client'),
    views: join(__dirname, 'server', 'views'),
    static: join(__dirname, 'static'),
    assets: join(__dirname, 'static', 'assets'),
  },
};
