import { join } from 'path';

export default {
  port: 3000,
  env: process.env.NODE_ENV || 'development',
  paths: {
    root: __dirname,
    tools: join(__dirname, 'tools'),
    src: join(__dirname, 'src'),
    server: join(__dirname, 'src', 'server'),
    client: join(__dirname, 'src', 'client'),
    views: join(__dirname, 'src', 'server', 'views'),
    dist: join(__dirname, 'dist'),
    assets: join(__dirname, 'dist', 'assets'),
  },
};
