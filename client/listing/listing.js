angular.module('gitHired.listing', ['ui.bootstrap', 'angularMoment', 'ngFileUpload'])

//Used to create edit modal from JobsController
.controller('EditController', function ($scope, $uibModalInstance, job) {
  $scope.job = job;
})
//Primary controller of job listing view
.controller('JobsController', function ($scope, Jobs, $http, $location, $uibModal, Upload, $timeout, $window) {
  $scope.data = {};
  $scope.passed = 'Passed';
  $scope.name = '';
  $scope.mode = '';
  $scope.job;
  $scope.setSchedule;

  $scope.changeMode = function(mode, job) {
    $scope.mode = mode;
    if(mode === 'edit') {
      var date = job.deadline.split('T')[0].split('-').reverse();
      var t = date[1];
      date[1] = date[0];
      date[0] = t;
      $scope.job = job;
      $scope.job.deadline = date.join('/');
    }
    if(mode === 'add') {
      $scope.job = {};
      $scope.job.status = 'Interested'
    }
  }

  //SORTING
  $scope.propertyName = 'deadline';
  $scope.reverse = false;
  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  //DEADLINES - accepts arg "difference" as a number representing how many days from today.
    // ex. -1 = yesterday, 0 = today, 2 = day after tomorrow
  $scope.getDeadlineClass = function(difference) {
    if (difference < 0) return 'passed';
    else return 'normalDeadline';
  };

  //GET JOBS
  $scope.getJobs = function () {
    Jobs.getAll($scope.archiveState)
      .then(function (res) {
        console.log(res.data);
        $scope.name = res.data.name;
        $scope.data.jobs = res.data.jobs;
        console.log('Jobs received:', $scope.data.jobs);
      })
      .catch(function (err) {
        $location.path('/login');
      });
  };

  //Modified At
  $scope.modifiedAt = {};
  $scope.CurrentDate = new Date();

  //POST JOB
  $scope.link = {};
  $scope.postJob = function () {
    console.log('POSTING JOB', $scope.job);
    Jobs.postOne($scope.job)
      .then(function (job) {
        console.log('Job posted');
        $scope.getJobs();
        $scope.job = {status: 'Interested'};
      })
      .catch(function (err) {
        console.log('Error posting job', err);
      });
  };


  $scope.uploadFile = function (file) {
    Upload.upload({
        url: 'upload/url',
        data: {file: file, 'username': $scope.username}
    }).then(function (res) {
        console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data);
    }, function (res) {
        console.log('Error status: ' + res.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
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
      $scope.getJobs();
      console.log('Job edited');
    })
    .catch(function(err) {
      console.log('Error editing job'), err;
    });
  };

  $scope.archiveJob = function(job) {
    Jobs.archiveOne(job)
    .then(function(res){
      $scope.getJobs();
      console.log('Job archived');
    })
    .catch(function(err) {
      console.log('Error editing job'), err;
    });
  };

  /* TOGGLE FAV:
  Clicking on star will make a PUT request to the "fav" key in schema, toggling between "unfav" and "fav".
  Then updates the value in $scope
  (Almost identical to $scope.editJob, with different text)
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

  /* 
    TOGGLE ARCHIVE:
  */
  $scope.archiveState = false;
  $scope.archiveDestination = "Archive"
  $scope.archiveOption = "archive"
  $scope.toggleArchive = function() {
    $scope.archiveState = !$scope.archiveState;
    if($scope.archiveDestination === "Archive") {
      $scope.archiveDestination = "Listing";
      $scope.archiveOption = "relist";
    } else {
      $scope.archiveDestination = "Archive";
      $scope.archiveOption = "archive";
    }
    $scope.getJobs();
  };

  /*
    ROUTE TO ABSOLUTE URL
  */
  $scope.routeToUrl = function(url) {
    if(url.slice(0, 7) !== 'http://' && url.slice(0, 8) !== 'https://') 
      url = 'http://' + url;
    $window.location.href = url;
  }

  // CLOSE MODAL WINDOW
    //Because of the way the Add Job / Edit Jobs are differently created, they also need to be differently closed.
  $scope.closeAdder = function() {
    $('#userModal').modal('hide');
  }
  $scope.closeEditor = function() {
    $scope.getJobs();
    $scope.modalInstance.close();
  }

  // CREATE DELETE MODAL - creates a new uibModal instance, pre-populated with the job's info
  $scope.delModal = function(_job) {
    console.log('opening modal');
    $scope.selected = _job;
    $scope.modalInstance = $uibModal.open({
      controller: 'EditController',
      templateUrl: 'delModal.html', //This is the ID assigned to the edit Modal within the View
      scope: $scope,
      resolve: {
        job: function() {
          return $scope.selected;
        }
      }
    });
  };

  // CREATE ARCHIVE MODAL - creates a new uibModal instance, pre-populated with the job's info
  $scope.archiveModal = function(_job) {
    console.log('opening modal');
    $scope.selected = _job;
    $scope.modalInstance = $uibModal.open({
      controller: 'EditController',
      templateUrl: 'archiveModal.html', //This is the ID assigned to the edit Modal within the View
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
  $scope.minStatus = 0;
  $scope.maxStatus = 8; //Represents highest possible statusOrder, as indicated by router.js
  //Array used to populate ng-options in modal
  $scope.progressionArr = [
    {label: 'Interested', value: 5, type: 'info'},
    {label: 'Outreach', value: 1/options * 100, type: 'info'},
    {label: 'Phone Interview', value: 2/options * 100, type: 'warning'},
    {label: 'Coding Challenge', value: 3/options * 100, type: 'warning'},
    {label: 'Onsite Interview', value: 4/options * 100, type: 'warning'},
    {label: 'Offer Received', value: 5/options * 100, type: 'success'},
    {label: 'Employer Declined', value: 6/options * 100, type: 'danger'},
    {label: 'Offer Declined', value: 6/options * 100, type: 'success'},
    {label: 'Offer Accepted', value: 6/options * 100, type: 'success'}
  ];

  //Obj used to easily reference the value of each status, to build the progress bar
  $scope.progression = {
    'Interested': {value: .05 * 100, type: 'info'},
    'Outreach': {value: 1/options * 100, type: 'info'},
    'Phone Interview': {value: 2/options * 100, type: 'warning'},
    'Coding Challenge': {value: 3/options * 100, type: 'warning'},
    'Onsite Interview': {value: 4/options * 100, type: 'warning'},
    'Offer Received': {value: 5/options * 100, type: 'success'},
    'Employer Declined': {value: 6/options * 100, type: 'danger'},
    'Offer Declined': {value: 6/options * 100, type: 'success'},
    'Offer Accepted': {value: 6/options * 100, type: 'success'}
  };

  //Move progress bar if arrow is clicked on view
  $scope.adjustStatus = function(job, val) {
    if (( job.statusOrder > 0 && val === -1 )  ||
        ( job.statusOrder < $scope.progressionArr.length - 1 && val === 1 )) { //This max value MUST match the highest value in router.js
      job.statusOrder += val;
      job.status = $scope.progressionArr[job.statusOrder].label;
      $scope.editJob(job);

      // checking the status if it's an interview stage and set it on the Google calendar.
      if ((job.status === "Phone Interview" || job.status === "Onsite Interview"
        || job.status === "Coding Challenge") && val === 1) {
        $scope.setSchedule = job.status;
        $scope.calendarModal(job.status);
      }
    }
  };

   // CREATE CALENDAR MODAL - asks user's confirmation to add the schedule to Google Calendar
  $scope.calendarModal = function(schedule) {
    $scope.modalInstance = $uibModal.open({
      templateUrl: 'calendarModal.html', //This is the ID assigned to the edit Modal within the View
      scope: $scope
    });
  };

  // open google calendar if user wants to add the interview / coding schedule
  $scope.addToCalendar = function(jobStatus) {
    console.log("addToCalendar Called");
    window.open("http://calendar.google.com", "_blank");
  };


  //Return style for progress bar arrow
  $scope.getArrowClass = function(job, direction) {
    var limiters = {
      'left': $scope.minStatus,
      'right': $scope.maxStatus
    }
    return job.statusOrder === limiters[direction] ? 'trans' : 'clickable';
  };

  $scope.getJobs();
});
