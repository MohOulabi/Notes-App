const express = require('express');
const bodyParser = require('body-parser');
const expressApp = express();

const userRoutes = require('./user');
const tasksRoutes = require('./tasks');
module.exports = (app = expressApp) => {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(userRoutes);
    app.use(tasksRoutes);

    //route for 404
    app.all('*', (_, response) => {
        response.status(404).send('Page not found!');
    });

}

