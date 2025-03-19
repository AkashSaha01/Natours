const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
app.use(express.static(`${__dirname}/public`));
console.log(__dirname);
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Middleware executed successfully 😁');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// const tourRouter = express.Router();
// const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.get('/', (req, res) => {
//     res.status(200).json({ message: "Hello From the server side", app: 'Natours' })

// })
// app.post('/', (req, res) => {
//     res.status(200).json({ message: "post endpoint", app: 'Natours' })

// })
module.exports = app;
