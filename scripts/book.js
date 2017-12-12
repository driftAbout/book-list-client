'use strict';

let __API_URL__ = 'http://localhost:3000/api/v1/books'; //dev
//let __API_URL__ = 'https://rd-km-booklist.herokuapp.com/api/v1/books'; //production

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

Book.all = [];

Book.loadAll = function(rows){
  rows.sort((a,b) => a.title - b.title);
  rows.map(row => Book.all.push(new Book(row)));
  console.log('loadAll Book.all', Book.all);
};

Book.fetchAll = function (callback){
  $.get(__API_URL__)
    .then(data => {
      Book.loadAll(data)
      if (callback) callback();
    })
    .catch(err => errorCallback(err));

}
