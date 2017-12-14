'use strict'

var app = app || {};
(function (module){
  let adminView = {};
  let __API_URL__ = 'http://localhost:3000'; //dev
  //let __API_URL__ = 'https://rd-km-booklist.herokuapp.com'; //production
  function resetView() {
    $('.container').hide();
  }

  adminView.initAdminViewPage = function() {
    console.log('inside init admin view');
    resetView();
    $('#admin-view').show();

    $('#admin-form').on('submit', function(event) {
      event.preventDefault();
      let token = $('#admin-form input[name="token"]').val();
      $.get(`${__API_URL__}/api/v1/books/${token}`)
        .then(() => {
          $('.admin-btns').addClass('visible');
        })
        .then(() => page('/'))
        .catch(() => {
          prompt('not correct')
        })
    })
  }
  module.adminView = adminView;
})(app)
