const newRoute = require('./news.route')
const siteRoute = require('./site.route')

function route(app){
      
    app.use('/news', newRoute);
    app.use('/', siteRoute);
      
    app.get('/login', (req, res) => {
    res.render('login', { layout: 'login'});
    });
}

module.exports = route;