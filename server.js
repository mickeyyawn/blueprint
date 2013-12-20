var Hapi = require('hapi');
var global = require('./api/global');
global.rootDir = __dirname;


var routes = require('./api/routes');

var serverConfig = {
  ip : '0.0.0.0',
  port : 4020
};


process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
process.env.NODE_ENV = (process.env.NODE_ENV || "development");
global.environment = process.env.NODE_ENV;

//
// configure based on environment
//

if (process.env.NODE_ENV.toUpperCase() === 'DEVELOPMENT') {

  // TODO, nothing yet

}
else {

  // configure prod stuffs

}


var server = new Hapi.Server(serverConfig.ip, serverConfig.port);



server.pack.require({ lout: { endpoint: '/docs' } }, function (err) {

  if (err) {
      console.log('Failed loading plugins');
  }

});

server.addRoutes(routes);
server.start();

console.log('server running at the following port and ip:');
console.log(serverConfig);
console.log(global.rootDir);