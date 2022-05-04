var createError = require('http-errors');
var express = require('express');
var path = require('path');
const { query } = require('./database');

var app = express();

app.use(express.json()); // What is this for?
app.use(express.static(path.join(__dirname, 'public'))); // What is this for?

app.get('/data', (req, res, next) => {
    const offset = req.query.offset;
    const sql = `SELECT * FROM data_table LIMIT 10 OFFSET $1`;
    const params = [offset];
    return query(sql, params)
        .then((result) => {
            const rows = result.rows; // Which step is this?
            return res.json({
                offset: +offset + rows.length,
                data: rows,
            }); // Which step is this?
        })
        .catch(next);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, `Resource ${req.method} ${req.originalUrl} Not Found`));
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.json({ error: err.message || `UNKNOWN ERROR!` }); // What does A || B do?
});

module.exports = app;
