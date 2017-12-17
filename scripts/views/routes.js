'use strict';


//********************************//
/***Code to make <a> tags work with gitHub pages ***/

var baseURL = '/book-list-client';
$(function() {
  //append the baseURL to <a>
  $('body').on('click', 'a', function() {
    if (! $(this).attr('href').startsWith(baseURL) ){
      $(this).attr('href',`${baseURL}${$(this).attr('href')}`);
    }
  })
});
//append the baseURL to the routes
page.base(baseURL);

///****************************///

page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', ctx => app.bookView.initFormPage(ctx));
page('/admin', app.adminView.initAdminViewPage);
page('/search', () => app.bookView.initSearchFormPage(app.bookView.initSearchResultsPage));
page('/books/delete/:id', ctx => app.Book.delete(ctx));
page('/books/update/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initUpdatePage));
page('/books/add/:id', ctx => app.Book.insertFromSearch(ctx));
page('/books/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
page('/search-results/:id', ctx => app.bookView.initDetailPage(app.Book.all[ctx.params.id]));

page();


//Big fix... history state will not reload home
//check for home in url when using back and forward buttons
window.onpopstate = function(event) {

  if (event.state && event.state.path === `${baseURL}/`){
    console.log(event.state.path);
    //document.location.href=`${baseURL}/`;
  }
};
