'use strict';

let bookView = {};

bookView.initIndexPage = function(){
  //console.log('book.all',Book.all);
  $('.container').hide();
  $('.book-view').show();
  app.Book.all.map(book => {
    console.log('book', book);
    $('#book-list').append(book.toHtml())
  });
};


$(document).ready(()=> {
  app.Book.fetchAll(bookView.initIndexPage)
})
