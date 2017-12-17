'use strict';

var baseURL = '/book-list-client';

$(function(){
  //$('a').attr('href', `${baseURL}${$(this).attr('href')}`);
  $('li, button').on('click', 'a', function() {
    console.log('clicked', $(this).attr('href'))
    $(this).attr('href',`${baseURL}${$(this).attr('href')}`);
  })});

page.base(baseURL);
// page.base('.');
// if(window.location.pathname !== '/') {
//   page.base('/book-list-client');
// }

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
