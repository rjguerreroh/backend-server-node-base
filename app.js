require('dotenv').config();
const Server = require('./models/server');

const port = process.env.PORT;

const server = new Server();

server.listen();