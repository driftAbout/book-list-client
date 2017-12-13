'use strict'
let errorView = {};

errorView.initErrorPage(err) {
  $('.container').hide();
  $('.error-view').show();
  $('#error-message').empty();
  var template = Handlebars.compile($('#error-template').text());
  $('#error-message').append(template);

}
function errorCallback(error) {
  console.error('this is the error message',error);
  errorView.initErrorPage(error);
}
