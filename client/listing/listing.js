angular.module('gitHired.listing', ['ui.bootstrap', 'angularMoment'])

//Used to create edit modal from JobsController
.controller('EditController', function ($scope, $uibModalInstance, job) {
  $scope.job = job;
})

//Primary controller of job listing view
.controller('JobsController', function ($scope, Jobs, $http, $uibModal) {
  $scope.data = {};

  //SORTING
  $scope.propertyName = 'deadline';
  $scope.reverse = false;
  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  //DEADLINES
  $scope.deadlineClass = function(difference) {
    if (difference < 0) return 'passed';
    else if (difference < 2) return 'urgent';
    else if (difference < 4) return 'upcoming';
    else return '';
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

    console.log('POSTING JOB', $scope.job);
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

  // CLOSE MODAL WINDOW
    //Because of the way the Add Job / Edit Jobs are differently created, they also need to be differently closed.
  $scope.closeAdder = function() {
    $('#userModal').modal('hide');
  }
  $scope.closeEditor = function() {
    $scope.modalInstance.close();
  }

  /* TOGGLE FAV:
    Clicking on star will make a PUT request to the "fav" key in schema, toggling between "unfav" and "fav".
    Then updates the value in $scope
  */
  $scope.toggleFav = function(job) {
    job.fav = !job.fav;
    Jobs.editOne(job)
    .then(function(res){
      $scope.faved = job.fav;
      console.log('Favorite toggled');
    })
    .catch(function(err) {
      console.log('Error toggling favorite'), err;
    });
  };

  $scope.editModal = function(_job) {
    $scope.selected = _job;
    $scope.modalInstance = $uibModal.open({
      controller: "EditController",
      templateUrl: 'editModal.html', //This is the ID assigned to the edit Modal within the View
      scope: $scope,
      resolve: {
        job: function() {
          return $scope.selected;
        }
      }
    });
  };

  //PROGRESS BAR
    //NOTE: Any changes to these labels MUST identical to each other, and MUST match the label options in server-side router

  var options = 6;
  //Array used to populate ng-options in modal
  $scope.progressionArr = [
    {label: 'Interested', value: 5, type: 'info'},
    {label: 'Outreach', value: 1/options * 100, type: 'info'},
    {label: 'Phone Interview', value: 2/options * 100, type: 'warning'},
    {label: 'Coding Challenge', value: 3/options * 100, type: 'warning'},
    {label: 'Onsite Interview', value: 4/options * 100, type: 'warning'},
    {label: 'Offer Received', value: 5/options * 100, type: 'success'},
    {label: 'Employer Declined', value: 6/options * 100, type: 'danger'},
    {label: 'Offer Accepted', value: 6/options * 100, type: 'success'},
    {label: 'Offer Declined', value: 6/options * 100, type: 'success'}
  ];

  //Obj used to easily reference the value of each status, to build the progress bar
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
  };

  $scope.getJobs();
});
