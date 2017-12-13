'use strict';

let bookView = {};


bookView.initIndexPage = function() {
  console.log('book.all',app.Book.all);
  $('.container').hide();
  $('#book-view').show();

  app.Book.all.map(book => {
    console.log('book', book);
    $('#book-list').append(book.toHtml())
  });
};

bookView.initDetailPage= function() {
  $('.container').hide();
  $('#detail-view').show();
  $('#detail-view').append(app.Book.oneToHtml());
}

$(document).ready(()=> {
  app.Book.fetchAll(bookView.initIndexPage)
})
