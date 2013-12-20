
var routesConfig = require('./routes-config');
var controllerView = require('./controller-view');


module.exports = [
  { method: 'GET', path: '/{path*}',handler: {directory: { path: './public', listing: false, index: true }}},
  { method: 'GET', path: '/', config: controllerView.getRoot},
  { method: 'GET', path: '/api/events', config: routesConfig.getEventsRouteConfig},
  { method: 'GET', path: '/api/temp_delete_me', config: routesConfig.getEventsRouteConfig}
];





