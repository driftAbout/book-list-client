'use strict'

page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', ctx => app.bookView.initFormPage(ctx));
page('/books/delete/:id', ctx => app.Book.delete(ctx));
page('/books/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
page('/books/update/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initUpdatePage));
page();
