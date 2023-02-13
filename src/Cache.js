import 'dotenv/config';
import {
  Metronom, Model, Types, LogLevels,
} from 'metronom';

const metronom = new Metronom({
  redisClientOptions: {
    url: process.env.REDIS_CONNECTION_STRING,
  },
  log: LogLevels.All,
});

export {
  metronom,
  Model,
  Types,
  LogLevels,
};
