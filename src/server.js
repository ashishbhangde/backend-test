import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import apis from './routes/router'
import database from './config/database'

const app = express()
var cors = require('cors')
// require('dotenv').config({ path: './variable.env' });

app.use(cors())

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  //Auth Each API Request created by user.
  next();
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())


// import API for use
apis(app);


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

const port = process.env.PORT || 3001 // set our port

const server = app.listen(port, () => {
  const host = server.address().address
  const port = server.address().port
  // eslint-disable-next-line no-console
  console.log('😀 🙌 app listening at http://%s:%s 🙌 😀', host, port)
})