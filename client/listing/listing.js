angular.module('gitHired.listing', [])

.controller('JobsController', function ($scope, Jobs) {
  $scope.data = {};
  $scope.getJobs = function () {
    Jobs.getAll()
      .then(function (jobs) {
        $scope.data.jobs = jobs.data;
        console.log("scope.data.jobs", $scope.data.jobs);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $scope.link = {};
  $scope.postJob = function () {
    Jobs.postOne($scope.link)
      .then(function (job) {
        console.log('job posted');
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $scope.getJobs();
});
