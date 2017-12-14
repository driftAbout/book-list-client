'use strict';
var app = app || {};
(function (module){
  let bookView = {};


  bookView.initIndexPage = function() {
    console.log('book.all',app.Book.all);
    $('.container').hide();
    $('#book-view').show();
    $('#book-list').empty();

    app.Book.all.map(book => {
      console.log('book', book);
      $('#book-list').append(book.toHtml())
    });
  };

  bookView.oneToHtml = function(book_ctx) {
    console.log('callback:', book_ctx);
    console.log('title:', book_ctx.title);
    let template = Handlebars.compile($('#detail-template').text());
    //let x = {'title': bookObj.title}
    //console.log('x', x);
    //$('#detail-view').append(template(bookObj));
    return template(book_ctx);
  };

  bookView.initDetailPage = function(bookObj) {

    $('.container').hide();
    $('#detail-view').show();
    $('#detail-view').empty();
    // $('#detail-view').append(app.Book.oneToHtml(bookObj));
    $('#detail-view').append(bookView.oneToHtml(bookObj));
    //let template = Handlebars.compile($('#detail-template').text());
    //template(book_ctx)
  }

  $(document).ready(()=> {
    app.Book.fetchAll(bookView.initIndexPage)
  })

  module.bookView = bookView;

})(app);
