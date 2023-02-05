import { Metronom, Model, Types, LogLevels } from 'metronom';

const metronom = new Metronom({
    redisClientOptions: {
        host: '172.168.1.123',
        port: 1234
    }
});

export {
    metronom,
    Model,
    Types,
    LogLevels,
};
