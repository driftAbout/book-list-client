'use strict'

page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));

page();
