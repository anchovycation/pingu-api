/*
It reads the index.js files of all folders in the src/Events folder and
keeps them as an array in the eventsHandlers variable
*/

import fs from 'fs';

let eventsHandlers = [];

fs
  .readdirSync(__dirname)
  .filter((file) => ((file.indexOf('.') !== 0) && (file !== 'index.js')))
  .forEach((file) => {
    const eventHandler = require('./' + file).default; // eslint-disable-line
    eventsHandlers = [...eventsHandlers, ...eventHandler];
  });

export default eventsHandlers;
