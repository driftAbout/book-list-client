'use strict'

var app = app || {};
(function (module){
  let adminView = {};
  let __API_URL__ = 'http://localhost:3000'; //dev
  // let __API_URL__ = 'https://rd-km-booklist.herokuapp.com'; //production
  function resetView() {
    $('.container').hide();
  }

  adminView.initAdminViewPage = function() {
    resetView();
    $('#admin-view').show();

    $('#admin-form').on('submit', function(event) {
      event.preventDefault();
      let token = $('#admin-form input[name="token"]').val();
      $.get(`${__API_URL__}/api/v1/books/admin/${token}`)
        .then(data => {
          if (data === '1') {
            localStorage.admin = '1';
            page('/');
          }
          if (data === '0') {
            app.errorView.initErrorPage({status: 'invalid', statusText: 'Incorrect Pass Code'});
          }
        })
        .catch(() => {

        })
    })
  }
  module.adminView = adminView;
})(app)
