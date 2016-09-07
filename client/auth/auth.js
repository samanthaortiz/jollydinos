angular.module('gitHired.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.login = function () {
    Auth.login($scope.user)
      .then(function (token) {
        $location.path('/tasks');
      })
      .catch(function (error) {
        $location.path('/login');
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $location.path('/tasks');
      })
      .catch(function (error) {
        $location.path('/login');
      });
  };
});
