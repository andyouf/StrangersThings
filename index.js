const express = require('express');
const server = express();
const cors = require("cors");
const { client } = require('./db/index');
const apiRouter = require('./api');
// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// handle application/json requests
const bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(cors());
// bring in the DB connection
client.connect();

//here's an API
server.use('/api', apiRouter);

// connect to the server
const { PORT = 3000 } = process.env
server.listen(PORT, () => {
    console.log(`Server is running on ${ PORT }!`);
});