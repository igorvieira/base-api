import consign from 'consign';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import config from './config';

const app = express();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


require('./database')(config.mongodb.uri);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.static('./client'));
app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json());
app.use(compression());
consign({ cwd: 'server', verbose: false })
  .include('models')
    .then('middleware')
    .then('controllers')
    .then('routes')
    .into(app);


const auth = app.middleware.auth;
app.use(auth.initialize());


app.listen(config.server.port, () => {
  if (!config.isTest) {
    console.log('Todo-server Started');
    console.log(`Address: ${config.server.host}:${config.server.port}`);
  }
});

export default app;
