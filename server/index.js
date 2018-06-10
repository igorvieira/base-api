import consign from 'consign';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import winston from 'winston';
import config from './config';

require('./database')(config.mongodb.uri);

const app = express();
app.use(express.static('./client'));
app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json());
app.use(compression());

consign({ cwd: 'server', verbose: false })
  .include('models')
    .then('controllers')
    .then('routes')
    .into(app);

app
  .listen(config.server.port, () =>
    !config.isTest, () =>
      winston.info(`Address: ${config.server.host}:${config.server.port}`));

export default app;
