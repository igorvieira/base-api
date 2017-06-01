export default {
  isTest: false,
  server: {
    port: process.env.PORT,
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
