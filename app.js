const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Baody parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE'
  );

  next();
});

const corsConfig = {
  origin: true,
  credentials: true,
  methods: 'GET,PUT,POST,PATCH',
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

// app.use(helmet.crossOriginResourcePolicy({ policy: 'same-site' }));
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [
//         'self',
//         'https://js.stripe.com/v3/ https://cdnjs.cloudflare.com https://api.mapbox.com http://localhost:3000/ ws://localhost:1234/ http://localhost:5000/',
//       ],
//       connectSrc: [
//         'self',
//         'https://js.stripe.com/v3/ https://cdnjs.cloudflare.com https://api.mapbox.com http://localhost:3000/ ws://localhost:1234/ http://localhost:5000/',
//       ],
//       scriptSrc: [
//         'self',
//         'https://js.stripe.com/v3/ https://cdnjs.cloudflare.com/ https://api.mapbox.com/ http://localhost:3000/ ws://localhost:1234/ blob: http://localhost:5000/',
//       ],
//       fontSrc: ['self', 'https://fonts.google.com/ https: data:'],
//     },
//   })
// );

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// console.log(process.env.NODE_ENV);

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notes', noteRouter);
app.use('/', viewRouter);
module.exports = app;
