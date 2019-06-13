const path = require('path');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

require('./db/mongoose');

//Setting up view engine as handlebars
const viewsPath = path.join(__dirname, '../', 'views');
const layoutPath = path.join(__dirname, '../', 'views/layout');
const partialsPath = path.join(__dirname, '../', 'views/components');

const exphbsOptions = exphbs({
    defaultLayout: 'main',
    layoutsDir: layoutPath,
    partialsDir: partialsPath,
    helpers: {
        section: function (name, options) {
            if (!this.section) this.section = {};
            this.section[name] = options.fn(this);
            return null;
        },
        inc: function (value, options) {
            return parseInt(value) + 1;
        }
    }
});


app.engine('handlebars', exphbsOptions);

app.set('view engine', 'handlebars');
app.set('views', viewsPath);
//Setting up public folder
const publicDir = express.static(path.join(__dirname, '../', 'public'));
app.use(publicDir);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Getting routes from routes folder
require('../routes/routes')(app);



app.listen(port);