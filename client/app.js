angular.module('gitHired', [
  'gitHired.listing',
  'gitHired.services',
  'gitHired.auth',
  'ngRoute',
  'ui.bootstrap',   // Angular plugin for progress bars.
  'ngFileUpload'
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

