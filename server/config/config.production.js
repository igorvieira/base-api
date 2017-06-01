export default {
  isTest: false,
  server: {
    port: process.env.PORT || 8080,
    host: 'https://api-vuejs.herokuapp.com/',
  },
  bodyParser: {
    extended: true,
  },
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  consign: [
    {
      cwd: 'server',
      verbose: false,
    },
  ],
};
