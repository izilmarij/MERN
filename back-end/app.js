const express = require('express');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');


const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors('*'));

app.use('/app/v1', cors(),userRouter);
// app.use('/', userRouter);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} here!`,404));  //passing arg implies error has been thrown
});
app.use(globalErrorHandler);

module.exports = app;