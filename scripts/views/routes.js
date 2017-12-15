'use strict'

//page.base('/book-list-client');
//page.base('.');

page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', ctx => app.bookView.initFormPage(ctx));
page('/books/delete/:id', ctx => app.Book.delete(ctx));
page('/admin', app.adminView.initAdminViewPage);
page('/books/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
page('/books/update/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initUpdatePage));
page('books/search', app.bookView.initSearchFormPage(app.bookView.initSearchResultsPage));
page();
