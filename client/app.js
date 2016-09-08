angular.module('gitHired', [
  // Other modules that will provide controllers and services.
  'gitHired.listing',
  'gitHired.services',
  'gitHired.auth',
   // Angular plugin that provides $routeProvider and the $routeChangeStart event.
  'ngRoute',
  'ngFileUpload',
  // Angular plugin for progress bars.
  'ui.bootstrap'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: '/auth/login.html',
    controller: 'AuthController'
  })
  .when('/signup', {
    templateUrl: '/auth/signup.html',
    controller: 'AuthController'
  })
  .when('/listing', {
    templateUrl: 'listing/listing.html',
    controller: 'JobsController'
  })
  .otherwise({
    redirectTo: '/login'
  });
});

