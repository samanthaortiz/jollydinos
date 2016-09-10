angular.module('gitHired.leaderboard', ['ui.bootstrap', 'angularMoment'])

//Primary controller of job listing view
.controller('LeaderController', function ($scope, Users, $http, $location, $uibModal, Upload, $timeout, $window) {
  $scope.data = {};
  // $scope.passed = 'Passed';
  // $scope.name = '';
  // $scope.mode = '';
  // $scope.job;

  //SORTING
  $scope.propertyName = 'jobsApplied';
  $scope.reverse = false;
  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  //GET USERS
  $scope.getUsers = function () {
    Users.getAll()
      .then(function (res) {
        console.log(res.data);
        $scope.name = res.data.name;
        $scope.data.users = res.data.users;
        console.log('Users received:', $scope.data.users);
      })
      .catch(function (err) {
        $location.path('/login');
      });
  };

  $scope.getUsers();
});
