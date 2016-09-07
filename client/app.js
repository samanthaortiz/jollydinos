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
  .when('/login', {
    templateUrl: 'app/auth/login.html',
    controller: 'AuthController'
  })
  .when('/signup', {
    templateUrl: 'app/auth/signup.html',
    controller: 'AuthController'
  })
  .when('/listing', {
    templateUrl: 'listing/listing.html',
    controller: 'JobsController'
  })
  .otherwise({
    redirectTo: '/listing'
  });
})
.run(function ($rootScope, $location, Auth) {
  // Check whether the user is authenticated to navigate to a route or not on every
  // route change.
  $rootScope.$on('$routeChangeStart', function (event, next, prev) {
    // If the route requires authentication and the user is sauthenticated...
    if (!Auth.isAuth() && next.$$route && next.$$route.authenticate) {
      // Stop any defaults (such as page refreshes on form submissions)
      event.preventDefault();
      $location.path('/login');
    }
  });
});

