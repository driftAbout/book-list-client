'use strict';


//********************************//
/***Code to make <a> tags work with gitHub pages ***/

// var baseURL = '/book-list-client';
// $(function() {
//   //append the baseURL to <a>
//   $('body').on('click', 'a', function() {
//     if (! $(this).attr('href').startsWith(baseURL) ){
//       $(this).attr('href',`${baseURL}${$(this).attr('href')}`);
//     }
//   })
// });

//Big fix... history state will not reload home
//check for home in url when using back and forward buttons
// window.onpopstate = function(event) {
//   if (event.state && event.state.path === `${baseURL}/`){
//   //  console.log(event.state.path);
//     window.history.go(`${baseURL}/`);
//   }
// };

//append the baseURL to the routes
// page.base(baseURL);

///****************************///
///*****End Production code****///

var app = app || {};

(function(module) {

  var linkRoutes = new Map();

  var base;

  function linkRoute(...args){
    //if there are no args, then activate the event handlers
    //the function needs to be called with out args to activate
    if(!args.length) return init_event_handlers();
    //set variables for the first two arguments
    let [route, callback] = args;
    //if there is only one argument, assume it is a route
    //callback will be undefined so fetch the callback for that route
    if(!callback){
      //getRoute returns a function reference and object
      //if the route has parameters, the object will contain the parameter values
      let {callback, ctx, historyOpt} = getRoute(route);
      //if a route was not found, do nothing
      if(!callback) return;
      //if a route was found, set the history state
      //if the route was called from the popstate event, don't set th3 history state again 
      console.log('window.location.pathname', window.location.pathname);
      console.log('BASE AND ROUTE:', `${base}${route}`);
      route = base ? ${base}${route} : route;
      if (window.location.pathname !== route && historyOpt) history.pushState( ctx, null, route);
      //if (window.location.pathname !== route) history.replaceState( ctx, null, route);
      //invoke the callback function with the object as an argument
      return callback(ctx);
    }
    //if there were two arguments, route and callback, set the properties in the linkRoutes map object
    //setRoute.call([route, callback]);
    setRoute.call(args);
  }

  linkRoute.base = function(link_base) {
    base = link_base;
  };

  const getRoute = (route) => {
    //create an object with the route
    //even if the callback doesn't require an object, it is used with the history state
    let ctx = {route: route};
    //if the route does not have parameters, it will have a direct match accessible with standard Map methods
    if (linkRoutes.has(route)){
      let {callback, historyOpt} = linkRoutes.get(route);
      return {callback: callback, ctx: ctx, historyOpt: historyOpt};
    }
    //if there was not a direct match, check the route with regex against routes with parameters
    let value = searchRoutes(route);
    //if no match was found, return an empty object
    if(!value) return {};
    //if a match was found, get the callback function reference from the object
    let callback = value.callback;
    //if a match was found using regex, it means the route had parameters
    //the values of the parameters need to be extracted and added to the ctx object as key value pairs
    //split the called route on "/" into an array
    let route_path_array = route.split(/\//).filter(val=>val);
    //use reduce to compare each part of the called route to the array of the stored route with parameters
    // called route: '/users/23' => ['users', 23]
    //stored route: '/users/:id' => ['users', 'id']
    //params is a key value pair where the path parts do not match i.e. 'id' !== '23' => {id: 23}
    let params = route_path_array.reduce((acc, cur, i) => {
      if (cur !== value.path_array[i]) acc[value.path_array[i]] = cur;
      return acc;
    }, {} );
    ctx.params = params;
    return {callback: callback, ctx: ctx, historyOpt: value.historyOpt};
  };

  function setRoute(){
    let [route, callback] = this;
    let historyOpt = this.length === 2 ? true : this[2];
    //if the route does not contain a parameter, no /:something/, use the Map set method with the route as key and callback as value
    //if (!route.match(/:[^/]+/g)) return linkRoutes.set(route, callback);
    if (!route.match(/:[^/]+/g)) return linkRoutes.set(route, {callback: callback, historyOpt: historyOpt});
    //if the route has a parameter, use the route as key and create a regex expression and array, for comparison for searching, as value
    linkRoutes.set(route, {regex: route.replace(/:[^/]+/g, '[^/]+') , path_array: route.split(/\/:?/).filter(val=>val), callback: callback, historyOpt: historyOpt});
  }

  const hasRoute = (route) => {
    //check for a direct match for a route 
    if (linkRoutes.has(route)) return true;
    //check for a regex match
    if (searchRoutes(route)) return true;
    return false;
  };

  const searchRoutes = (route) => {
    //loop through each value in the linkRoutes Map 
    //use the stored regex, value.regex to see if the called route exists
    for (let value of linkRoutes.values() ){
      let routeMatch = new RegExp(value.regex + '$', 'g');
      if (value.regex && route.match(routeMatch) ) return value;
    }
    return false;
  };

  //set the popstate, click and load handlers
  function init_event_handlers() {

    /*********** History popstate event  ***********/
    window.onpopstate = function (event){
      //if the state is undefined, route to home
      if(!event.state) return linkRoute('/');
      //use the route property of the history state as the route
      linkRoute(event.state.route);
    };

    /*********** <a> click event handler ***********/
    document.body.addEventListener('click', function(e){
    // if the clicked item in the body is not <a> and the target.pathname is a saved route,  prevent default and invoke the callback
      if (e.target.localName !== 'a' || !hasRoute(e.target.pathname)) return;
      e.preventDefault();
      linkRoute(e.target.attributes.href.value);
    });

    /*********** window load event handler ***********/
    //if the page reloads and has been redirected to the home page, check the url to se if it matches
    //if it doesn't invoke the callback for that route
    window.addEventListener('load', function(e) {
      let referrerRoute = e.target.location.pathname
      if( e.target.referrer ){
        referrerRoute = e.target.referrer.replace(e.target.baseURI, '/')
      }
      if(hasRoute(referrerRoute) && referrerRoute !== '/'){
        return linkRoute(referrerRoute);
      }
      if(e.target.location.pathname !== '/') return history.pushState( {}, null, '/');
    });

  }

  module.linkRoute = linkRoute;
  module.linkRoutes = linkRoutes;

})(app);

var route = app.linkRoute;

route.base('/book-list-client');

route('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
route('/books/new', ctx => app.bookView.initFormPage(ctx));
route('/admin', app.adminView.initAdminViewPage);
route('/search', () => app.bookView.initSearchFormPage(app.bookView.initSearchResultsPage));
route('/books/delete/:id', ctx => app.Book.delete(ctx), false);
route('/books/update/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initUpdatePage), false);
route('/books/add/:id', ctx => app.Book.insertFromSearch(ctx), false);
route('/books/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
route('/search-results/:id', ctx => app.bookView.initDetailPage(app.Book.all[ctx.params.id]), false);

//init routes
route();
//call first route
route('/');