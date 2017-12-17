'use strict'
var app = app || {};
(function(module) {
  let errorView = {};

  errorView.initErrorPage = function(err) {
    //console.log('in errorView');
    $('.container').hide();
    $('#error-view').show();
    $('#error-view').empty();
    var template = Handlebars.compile($('#error-template').text());
    $('#error-view').append(template(err));

  };

  module.errorView = errorView;
})(app);
