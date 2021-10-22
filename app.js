const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dependentRoute = require('./routes/dependents');
const userRoute = require('./routes/user');

app.use(bodyParser.json());
app.use('/dependent',dependentRoute);
app.use('/user', userRoute);

module.exports = app;