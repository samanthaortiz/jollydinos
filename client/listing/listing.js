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
    Jobs.postOne($scope.job)
      .then(function (job) {
        console.log('Job posted');
        $scope.getJobs();
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
      $scope.getJobs();
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

  // Close window
  $scope.closeModal = function(){
    $('#userModal').modal('hide');
  }
  /* TOGGLE FAV:
    Clicking on star will make a PUT request to the "fav" key in schema between "unfav" and "fav".
    Next step will be to change the CSS class based on the job's fav value, which seems it could be a Bootstrap thing.
    Keep in mind that clicking the FAV text should only change that one job's fav value.
  */
  $scope.toggleFav = function(job) {
    Jobs.toggleOne(job)
    .then(function(res){
      $scope.faved = job.fav;
      console.log('Favorite toggled');
    })
    .catch(function(err) {
      console.log('Error toggling favorite'), err;
    });
  };

  //PROGRESS BAR
  var options = 6;
    //NOTE: Any changes to these fields MUST match the options in View modal's options
  $scope.progression = {
    'Interested': {value: 5, type: 'info'},
    'Outreach': {value: 1/options * 100, type: 'info'},
    'Phone Interview': {value: 2/options * 100, type: 'warning'},
    'Coding Challenge': {value: 3/options * 100, type: 'warning'},
    'Onsite Interview': {value: 4/options * 100, type: 'warning'},
    'Offer Received': {value: 5/options * 100, type: 'success'},
    'Employer Declined': {value: 6/options * 100, type: 'danger'},
    'Offer Accepted': {value: 6/options * 100, type: 'success'},
    'Offer Declined': {value: 6/options * 100, type: 'success'}
  }
  //'success', 'info', 'warning', and, 'danger'

  $scope.getJobs();
});
