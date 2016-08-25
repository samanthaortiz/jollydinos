angular.module('gitHired.jobs', [])

.controller('JobsController', function ($scope, Jobs) {
  $scope.data = {};
  $scope.getJobs = function () {
    Jobs.getAll()
      .then(function (jobs) {
        $scope.data.jobs = jobs.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $scope.getJobs();
});
