const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const router = require('../routes/index.routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());

app.use('/api', router);

module.exports = app;