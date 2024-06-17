const folders = ['models', 'views', 'routes', 'logs', 'json'];

const configjson = { 
    name: 'AppConfigCLI',
    version: '1.0.0',
    description: 'The Command Line Interface (CLI) for the MyApp.',
    main: 'myapp.js',
    superuser: 'adm1n',
    database: 'exampledb'
  };
  module.exports = {
    folders,
    configjson
  };