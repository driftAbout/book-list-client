'use strict'
var app = app || {};
(function(module) {
  let errorView = {};

  errorView.initErrorPage = function(err) {
    $('.container').hide();
    $('.error-view').show();
    $('#error-message').empty();
    var template = Handlebars.compile($('#error-template').text());
    $('#error-message').append(template);

  };

  module.errorView = errorView;
})(app);
