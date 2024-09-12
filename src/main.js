const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const hbr = require('express-handlebars');
const path = require('path');

//Static file
app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined'))

//Template engine
app.engine('hbr', hbr.engine({
  extname: '.hbr',
}));
app.set('view engine', 'hbr');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});

app.get('/login', (req, res) => {
  res.render('login', { layout: 'login'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
