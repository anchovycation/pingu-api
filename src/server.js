import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import 'dotenv/config';
import 'colors';

const port = process.env.PORT || 3000;

const server = express();
server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, res) => res.send('Welcome to the Pingu'));

server.listen(port, () => {
  console.log(`🚀 Server listening to ${`http://localhost:${port}`.green} , NODE_ENV=${`${process.env.NODE_ENV}`.green}`);
});
