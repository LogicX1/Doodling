const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

app.use(helmet())

const routes = require('./routes/routes');
// const helpers = require('./views/')

// const data = require('../src/views')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine(
    'hbs',
    exphbs({
        extname: 'hbs',
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
        partialsDir: path.join(__dirname, 'views', 'partials'),
        defaultLayout: 'main',
        // helpers: helpers
    })
)

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('port', process.env.PORT || 5000);
app.use(routes);

module.exports = app;