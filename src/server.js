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
import mongoConnect from './Database'

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use((err, req, res, next) => res.status(400).send({ message: err.message }));

const server = http.createServer(app);
bindSocket(server);
mongoConnect();

app.get('/', (req, res) => res.send('Welcome to the Pingu'));

server.listen(port, () => {
  console.log(`🚀 Server listening to ${`http://localhost:${port}`.green} , NODE_ENV=${`${process.env.NODE_ENV}`.green}`);
});
