import { join, resolve } from 'path';

import configAll from './env/all.js';
import configDevelopment from './env/development.js';
import configTest from './env/test.js';
import configProduction from './env/production.js';

const rootPath = resolve(__dirname + '/..');
let config = Object.assign({
  env: process.env.NODE_ENV || 'development',
  paths: {
    root: rootPath,
    tools: join(rootPath, 'tools'),
    server: join(rootPath, 'server'),
    models: join(rootPath, 'server', 'models'),
    controllers: join(rootPath, 'server', 'controllers'),
    client: join(rootPath, 'client'),
    views: join(rootPath, 'server', 'views'),
    static: join(rootPath, 'static'),
    assets: join(rootPath, 'static', 'assets'),
  },
}, configAll);

switch (config.env) {
  case 'development':
    config = Object.assign(config, configDevelopment);
    break;
  case 'test':
    config = Object.assign(config, configTest);
    break;
  case 'production':
    config = Object.assign(config, configProduction);
    break;
  default:
    // Just use all
    break;
}

global.__DEVELOPMENT__ = (config.env === 'development');

export default config;
