angular.module('gitHired.leaderboard', ['ui.bootstrap', 'angularMoment'])

//Primary controller of job listing view
.controller('LeaderController', function ($scope, Jobs, $http, $location, $uibModal, Upload, $timeout, $window) {
  $scope.data = {};
  // $scope.passed = 'Passed';
  // $scope.name = '';
  // $scope.mode = '';
  // $scope.job;

  //SORTING
  $scope.propertyName = 'josApplied';
  $scope.reverse = false;
  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  //GET JOBS
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

  /*
    ROUTE TO ABSOLUTE URL
  */
  $scope.routeToUrl = function(url) {
    if(url.slice(0, 7) !== 'http://' && url.slice(0, 8) !== 'https://') 
      url = 'http://' + url;
    $window.location.href = url;
  }

  $scope.getUsers();
});
