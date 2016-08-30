angular.module('gitHired.listing', [])

.controller('JobsController', function ($scope, Jobs, $http) {
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

  $scope.delJob = function(id) {
    Jobs.delOne(id)
  	.then(function(res){
  		console.log('Job deleted');
  	})
    .catch(function(res) {
      console.log('Error deleting job');
    });
  };

  $scope.getJobs();
});
