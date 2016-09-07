angular.module('gitHired.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.login = function () {
    Auth.login($scope.user);
  };

  $scope.signup = function () {
    Auth.signup($scope.user);
  };

  $scope.logout = function () {
    Auth.logout();
  };
});
