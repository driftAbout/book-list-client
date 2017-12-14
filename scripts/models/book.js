'use strict';

var app = app || {};

(function(module) {
  let __API_URL__ = 'http://localhost:3000'; //dev
  //let __API_URL__ = 'https://rd-km-booklist.herokuapp.com'; //production

  function Book(dataObj){
    Object.keys(dataObj).forEach(key => {
      this[key] = dataObj[key];
    }, this);
  }


  Book.prototype.toHtml = function() {
    console.log('this', this);
    let template  = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };
  // Book.prototype.oneToHtml = function(bookObj) {
  //   let template = Handlebars.compile($('#detail-template').text());
  //   return template(bookObj);
  // };

  Book.oneToHtml = function(bookObj) {
    let template = Handlebars.compile($('#detail-template').text());
    return template(bookObj);
  };

  Book.all = [];

  Book.loadAll = function(rows){
    rows.sort((a,b) => b.title - a.title);
    rows.map(row => Book.all.push(new Book(row)));
    //Book.all = rows.map(row => new Book(row));
    console.log('loadAll Book.all', Book.all);
  };

  Book.fetchAll = function (callback){
    $.get(`${__API_URL__}/api/v1/books`)
      .then(data => {
        Book.loadAll(data)
        if (callback) callback();
      })
      .catch(errorCallback);

  };

  Book.fetchOne = function (ctx, callback) {
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.id}`)
      .then(data => {
        //ctx.book = results[0]
        console.log('data', data);
        ctx.author = data[0].author;
        ctx.title = data[0].title;
        ctx.description = data[0].description;
        ctx.image_url = data[0].image_url;
        ctx.book_id = data[0].book_id;
        //let this_book = new Book({'author': data[0].author});
      })
      //.then(callback)
      .then(() => callback(ctx))
      .catch(errorCallback)
  }

  function errorCallback(error) {
    console.error('this is the error message',error);
    app.errorView.initErrorPage(error);
  }
  module.Book = Book;
})(app);
