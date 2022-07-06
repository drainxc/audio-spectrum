const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();
const indexRouter = require('./index.js');

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', indexRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.status = process.env.NODE_ENV != 'production' ? err : {};
    res.status(err.status || 500).json(err);
});

app.set('port', process.env.PORT || '8081');

app.listen(app.get('port'), () => {
    console.log('sever run!!');
});

module.exports = app;