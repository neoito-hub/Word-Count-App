import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
import routes from '../_main/index.route';

// db stuff - start
mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
  server: {
    socketOptions: {
      keepAlive: 1
    },
    useNewUrlParser: true
  }
});
mongoose.connection.on('connected', () => {
  console.log('[app]: connected to database - ' + config.db);
});
mongoose.connection.on('error', err => {
  console.error(err);
  console.error('[app]: error in database connection on ', config.db);
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/ping', (req, res) => {
  res.json({ msg: 'pong' });
});
app.use('/', routes);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
  // console.error(err.stack)
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({
      error: 'Something failed!'
    });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  if (config.get('env') == 'development') {
    console.log(err);
    res.status(500).send({
      error: err
    });
  } else {
    console.log(err);
    res.status(500).send({
      error: true
    });
  }
}
app.listen(config.port, () => {
  console.log(`[app] listening on: ${config.port}!`);
});
export default app;
