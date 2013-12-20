var events = require('./controller-events');

module.exports.getEventsRouteConfig = {
  handler: events.getEvents,
  description: 'this is a super awesome route!',
  notes: 'these are some cool note'
};