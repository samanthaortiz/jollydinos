angular.module('gitHired', [
  // Other modules that will provide controllers and services.
  'gitHired.listing',
  'gitHired.services',
   // Angular plugin that provides $routeProvider and the $routeChangeStart event.
  'ngRoute',
  // Angular plugin for progress bars.
  'ui.bootstrap'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/listing', {
    templateUrl: 'listing/listing.html',
    controller: 'JobsController'
  })
  .otherwise({
    redirectTo: '/listing'
  });
});


$routeProvider
  .when('/login', {
    // Templates are loaded from the server by ngRoute via http
    // Controllers are automatically connected to the Templates
    // A single controller can be used to control multiple views
    // Beware nested controllers!
    templateUrl: 'app/auth/login.html',
    controller: 'AuthController'
  })
  .when('/signup', {
    templateUrl: 'app/auth/signup.html',
    controller: 'AuthController'
  })
  .when('/tasks', {
    templateUrl: 'app/tasks/tasks.html',
    controller: 'TasksController',
    authenticate: true,
  })
  .when('/create', {
    templateUrl: 'app/create/create.html',
    controller: 'createController',

  })
  .otherwise({
    redirectTo: '/tasks'
  });