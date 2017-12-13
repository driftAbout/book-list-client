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
  Book.prototype.oneToHtml = function() {
    let template = Handlebars.compile($('#detail-view-template').text());
    return template(this);
  };

  Book.all = [];

  Book.loadAll = function(rows){
    rows.sort((a,b) => b.title - a.title);
    rows.map(row => Book.all.push(new Book(row)));
    console.log('loadAll Book.all', Book.all);
  };

  Book.fetchAll = function (callback){
    $.get(`${__API_URL__}/api/v1/books`)
      .then(data => {
        Book.loadAll(data)
        if (callback) callback();
      })
      .catch(err => errorCallback(err));

  }

  Book.fetchOne = function (ctx, next()) {
    $.get(`${__API_URL__}/${ctx.params.id}`)
    .then(data => {
      ctx.author = this.author;
      ctx.title = this.title;
      ctx.description = this.description;
      ctx.image_url = this.image_url;
      ctx.book_id = this.book_id;
    })
    .catch(errorCallback(err))
  }

  function errorCallback(error) {
    console.error('this is the error message',error);
    app.errorView.initErrorPage(error);
  }
  module.Book = Book;
})(app);
