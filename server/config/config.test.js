export default {
  isTest: true,
  server: {
    port: 3030,
    host: 'localhost',
  },
  bodyParser: {
    extended: true,
  },
  mongodb: {
    uri: 'mongodb://localhost:27017/task_test',
  },
  consign: [
    {
      cwd: 'server',
      verbose: false,
    },
  ],
};
