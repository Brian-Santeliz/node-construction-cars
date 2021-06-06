const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router/router');
const { connect } = require('./database/database');
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/autos', router);
app.listen(port, () => {
  console.log('Servidor en el puerto', port);
  connect();
});
