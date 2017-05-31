import consign from 'consign';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import config from './config';

const app = express();


require('./database')(config.mongodb.uri);

app.use(express.static('./client'));
app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json());
app.use(compression());

consign({ cwd: 'server', verbose: false })
  .include('models')
    .then('controllers')
    .then('routes')
    .into(app);

app.listen(config.server.port, () => {
  if (!config.isTest) {
    console.log('Todo-server Started');
    console.log(`Address: ${config.server.host}:${config.server.port}`);
  }
});

export default app;
