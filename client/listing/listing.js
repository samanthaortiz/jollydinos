angular.module('gitHired.listing', [])

.controller('JobsController', function ($scope, Jobs, $http) {
  $scope.data = {};

  //SORTING
  $scope.propertyName = 'company';
  $scope.reverse = false;
  $scope.sortBy = function(propertyName) {
    console.log('propname', propertyName);
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  //GET JOBS
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

  //POST JOB
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

  //DELETE JOB
  $scope.delJob = function(job) {
    Jobs.delOne(job)
  	.then(function(res){
  		console.log('Job deleted');
  	})
    .catch(function(err) {
      console.log('Error deleting job', err);
    });
  };

  //EDIT JOB
  $scope.editJob = function(job) {
    Jobs.editOne(job)
    .then(function(res){
      console.log('Job edited');
    })
    .catch(function(err) {
      console.log('Error editing job'), err;
    });
  };

  /* TOGGLE FAV:
    Clicking on "Unfav" will make a PUT request to the "fav" key in schema between "unfav" and "fav.
    Next step will be to change the CSS class based on the job's fav value, which seems it could be a Bootstrap thing.
    Keep in mind that clicking the FAV text should only change that one job's fav value.
  */
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
