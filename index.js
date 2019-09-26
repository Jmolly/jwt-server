require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV; // development
const stage = require('./config')[environment];

const cors = require('cors')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.use(cors({
  origin: 'http://localhost:3001',
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.all('', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  //Auth Each API Request created by user.
  next();
});

// app.use('/api/v1', (req, res, next) => {
//   res.send('Hello');
//   next();
// });

app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;

app.use('/api/v1', routes(router));
