'use strict'
page('/', app.bookView.initIndexPage);
//page('/books/new', app.bookView.initCreateFormPage);
page('/books/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));

page();
