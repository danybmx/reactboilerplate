export default {
  name: 'ReactBoilerplate',
  port: 3000,
  host: 'localhost',
  url: 'http://localhost:3000/',
  apiUrl: 'http://localhost:3000/api/',
  mongoDB: 'mongodb://localhost/reactboilerplate-dev',
  sessionSecret: 'I3f6KL3y1wr2Y45J4BKC4OQG7wxy0uQd',
  meta: {
    title: '',
    description: '',
    keywords: '',
  },
  passport: {
    twitter: {
      consumerKey: '-',
      consumerSecret: '-',
    },
    facebook: {
      clientID: '-',
      clientSecret: '-',
      scope: ['public_profile', 'email'],
    },
  },
};
