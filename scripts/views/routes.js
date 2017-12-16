'use strict';

//page.base('/book-list-client');
//page.base('.');

page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', ctx => app.bookView.initFormPage(ctx));
page('/admin', app.adminView.initAdminViewPage);
page('/search', () => app.bookView.initSearchFormPage(app.bookView.initSearchResultsPage));
page('/books/delete/:id', ctx => app.Book.delete(ctx));
page('/books/update/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initUpdatePage));
page('/books/add/:id', ctx => app.Book.insertFromSearch(ctx));
page('/books/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
page('/search-results/:id', ctx => app.bookView.initDetailPage(app.Book.all[ctx.params.id]));

//add book from search results
// the button is in => <script id="detail-template", type="text/x-handlebars-template">
//<button class="book-add primary-btn"><a href="/books/add/{{book_id}}">Add Book</a></button>
// I think we call Book.create in a similar manor to the route in page('/search-results/:id'....

page();
