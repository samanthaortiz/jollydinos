angular.module('gitHired.services',['gitHired.listing'])

.factory('Jobs', function($http, $window, Upload) {
  var getAll = function (archive) {
    if (archive){
      return $http({
        method: 'GET',
        url: '/api/archive'
      });
    } else {
      return $http({
        method: 'GET',
        url: '/api/listing'
      });
    }
  };

  var postOne = function(job) {
    var resume = job.resume;
    delete job.resume;
    
    return Upload.upload({
      url: '/api/listing',
      method: 'POST',
      data: job,
      file: resume
    });
  };

  var delOne = function(job) {
    return $http({
      method: 'DELETE',
      url: '/api/listing',
      data: job,
      headers: {'Content-Type': 'application/json'}
    })
  };

  var editOne = function(job) {
    job.modifiedAt = new Date();
    var resume = job.resume;
    delete job.resume;

    return Upload.upload({
      url: '/api/listing',
      method: 'PUT',
      data: job,
      file: resume
    });
  };

  var archiveOne = function(job) {
    return $http({
      method: 'POST',
      url: '/api/archive',
      data: job
    });
  };

  var update = function() {
    //PLACEHOLDER
    // job.company = prompt('Please enter a new company name.', job.company);
    return $http({
      method: 'PUT',
      url:'/api/users',
      headers: {'Content-Type': 'application/json'}
    })
  };

  return {
    getAll: getAll,
    postOne: postOne,
    delOne: delOne,
    editOne: editOne,
    archiveOne: archiveOne,
    update: update
  };
})
.factory('Auth', function ($http, $location, $window) {
  var isLoggedIn = false;

  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    })
    .then(function (resp) {
      isLoggedIn =  true;
      $location.path('/listing')
    })
    .catch(function (err){
      isLoggedIn = false;
      $location.path('/login')
    });
  };

  // NOTE: This is not an ideal scenario,
  // However, the server doesn't autmatically log new users in.
  // Therefore, the user must signup and then login.
  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function (resp) {
      $location.path('/login')
    });
  };

  // Helper function to read the private variable above.
  var isAuth = function () {
    return isLoggedIn;
  };

  // Server detroy's the session and refreshes the page anyway.
  var logout = function () {
    console.log("logoutCalled");
    return $http({
      method: 'POST',
      url: '/logout'
    })
    .then(function(){
      isLoggedIn = false;
      $location.path('/login');
    })
  };

  // Return Factory API
  return {
    login: login,
    signup: signup,
    isAuth: isAuth,
    logout: logout
  };
})
.factory('Users', function($http, $window) {
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/users'
    });
  };

  var postOne = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: user
    });
  };

  var delOne = function(user) {
    return $http({
      method: 'DELETE',
      url: '/api/users',
      data: user,
      headers: {'Content-Type': 'application/json'}
    })
  };

  return {
    getAll: getAll,
    postOne: postOne,
    delOne: delOne
  };
})
.factory('Resumes', function($http, $window){
  var getOne = function(id) {
    console.log(id);
    return $http({
      method: 'POST',
      url: '/api/resume',
      data: {id:id}
    });
  }

  return {
    getOne: getOne
  }
});
