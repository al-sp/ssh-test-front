import createError from 'http-errors';
import appModulePath from 'app-module-path';
import express from 'express';
import cors from 'cors';
var indexRouter = require('../routes/index');
var connectRouter = require('../routes/connect');

appModulePath.addPath(`${__dirname}`);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/api', connectRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
