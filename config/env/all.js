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
      consumerKey: 'mE2Q0rChZNHkTpjR2D27PUQOM',
      consumerSecret: 'CivHRMQnMvrRL4Ma4cnkZkdasTJMLoWymC8ogVBXc8B4RqomUj',
    },
    facebook: {
      clientID: '1604517466466155',
      clientSecret: '9c45b5a4513782ac982528f2e071cb4e',
      scope: ['public_profile', 'email'],
    },
  },
};
