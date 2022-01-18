var createError = require('http-errors');
var express = require('express');
var path = require('path');

var app = express();

app.use(express.json()); // What's this for?
app.use(express.static(path.join(__dirname, 'public'))); // What's this for?

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err);

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err.message || `UNKNOWN ERROR!` }); // What does A || B do?
});

module.exports = app;
