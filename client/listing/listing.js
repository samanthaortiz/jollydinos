angular.module('gitHired.listing', [])

.controller('JobsController', function ($scope, Jobs, $http) {
  $scope.data = {};
  $scope.getJobs = function () {
    Jobs.getAll()
      .then(function (jobs) {
        $scope.data.jobs = jobs.data;
        console.log("Jobs received:", $scope.data.jobs);
      })
      .catch(function (err) {
        console.log('Error receiving jobs', err);
      });
  };

  $scope.link = {};
  $scope.postJob = function () {
    Jobs.postOne($scope.link)
      .then(function (job) {
        console.log('Job posted');
      })
      .catch(function (err) {
        console.log('Error posting job', err);
      });
  };

  $scope.delJob = function(job) {
    Jobs.delOne(job)
  	.then(function(res){
  		console.log('Job deleted');
  	})
    .catch(function(err) {
      console.log('Error deleting job', err);
    });
  };

  $scope.editJob = function(job) {
    Jobs.editOne(job)
    .then(function(res){
      console.log('Job edited');
    })
    .catch(function(err) {
      console.log('Error editing job'), err;
    });
  };

  $scope.toggleFav = function(job) {
    Jobs.toggleOne(job)
    .then(function(res){
      console.log('Favorite toggled');
    })
    .catch(function(err) {
      console.log('Error toggling favorite'), err;
    });
  };

  $scope.getJobs();
});
