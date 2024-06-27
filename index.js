global.DEBUG = true;

const fs = require('fs');
const { initializeApplication } = require('./init.js');
const { configApplication } = require('./config.js');
const { tokenApplication } = require('./token.js');

const myArgs = process.argv.slice(2);

if(DEBUG) if(myArgs.length >= 1) console.log('myArgs: ', myArgs);

switch(myArgs[0]) {
    case 'init':
    case 'i':
      if (DEBUG) console.log(myArgs[0], '- init the app.');
      initializeApplication();
      break;
    case 'config':
    case 'c':
      if (DEBUG) console.log(myArgs[0], '- create the config folders and files.');
      configApplication();
      break;
    case 'token':
    case 't':
      if (DEBUG) console.log(myArgs[0], '- manage the tokens');
      tokenApplication();
      break;
    case '--help':
    case '--h':
    default:
      if (DEBUG) console.log(myArgs[0], '- display help');
      //myEventEmitter.emit('event', process.argv, 'WARNING', 'Unrecognized CLI item requested.');
      fs.readFile(__dirname + "/usage.txt", (error, data) => {
        if(error) throw error;
        console.log(data.toString());
      });
  }