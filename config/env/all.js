export default {
  name: 'ReactBoilerplate',
  port: 3000,
  host: 'localhost',
  url: 'http://localhost:3000/',
  apiUrl: 'http://localhost:3000/api/',
  mongoDB: 'mongodb://localhost/reactboilerplate-dev',
  meta: {
    title: '',
    description: '',
    keywords: '',
  },
  passport: {
    twitter: {
      consumerKey: '',
      consumerSecret: '',
    },
    facebook: {
      clientID: '',
      clientSecret: '',
      scope: ['public_profile', 'email'],
    },
  },
};

global.__DEVELOPMENT__ = true;
