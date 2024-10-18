const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const hbr = require('express-handlebars');
const path = require('path');
const db = require('./config/db/main.js');
const route = require('./routes/main.route')
const bodyParser = require('body-parser');

// Middleware to parse URL-encoded data and JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to db
db.connect();

//Static file
app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined'))

//Template engine
app.engine('hbr', hbr.engine({
  extname: '.hbr',
}));
app.set('view engine', 'hbr');
app.set('views', path.join(__dirname, 'resources/views'));

// routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
