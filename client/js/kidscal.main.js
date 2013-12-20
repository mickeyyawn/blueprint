$(document).ready(function() {

  alert('jquery is ready...');

  var evt = new Event();

  console.log(evt);

  evt.announce();

  var loginTemplate = $('#login-template').html();
  loginTemplate = Handlebars.compile(loginTemplate);
  var loginHTML = loginTemplate({});

  $('#content').html(loginHTML);

});