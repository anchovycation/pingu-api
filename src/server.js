/*
Startup file
Create Express server and socket
*/

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import { bindSocket } from './Socket';

import 'dotenv/config';
import 'colors';
import router from './Router';

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(router);
const server = http.createServer(app);
bindSocket(server);

app.get('/', (req, res) => res.send('Welcome to the Pingu'));

server.listen(port, () => {
  console.log(`🚀 Server listening to ${`http://localhost:${port}`.green} , NODE_ENV=${`${process.env.NODE_ENV}`.green}`);
});
