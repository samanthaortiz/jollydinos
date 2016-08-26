angular.module('gitHired', [
  // Other modules that will provide controllers and services.
  'gitHired.listing',
  'gitHired.services',
   // Angular plugin that provides $routeProvider and the $routeChangeStart event.
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/listing', {
    // Templates are loaded from the server by ngRoute via http
    // Controllers are automatically connected to the Templates
    // A single controller can be used to control multiple views
    // Beware nested controllers!
    templateUrl: 'listing/listing.html',
    controller: 'JobsController'
  })
  .otherwise({
    redirectTo: '/listing'
  });
});
