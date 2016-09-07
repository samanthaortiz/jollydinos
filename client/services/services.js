angular.module('gitHired.services',[])
// called the angular module

//instantiate
.factory('Jobs', function($http, $window) {
  var getAll = function (fbId) {
  // Returnaing a Promise returned by $http
  // sending a Get request that will be routed in the router file
  // console.log("FB ID", fbId);
    return $http({
      method: 'GET',
      url: '/api/listing'
    });
  };

  var postOne = function(job) {
    return $http({
      method: 'POST',
      url: '/api/listing',
      data: job
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
    //PLACEHOLDER
    // job.company = prompt('Please enter a new company name.', job.company);
    job.modifiedAt = new Date();
    var id = job._id;
    return $http({
      method: 'PUT',
      url: '/api/listing',
      data: job,
      headers: {'Content-Type': 'application/json'}
    })
  };

  var archiveOne = function(job) {
    return $http({
      method: 'POST',
      url: '/api/archive',
      data: job
    });
  };

  return {
    getAll: getAll,
    postOne: postOne,
    delOne: delOne,
    editOne: editOne,
    archiveOne: archiveOne
  };
})
.factory('Auth', function ($http, $location, $window) {

var login = function (user) {
    return $http({
      method: 'GET',
      url: '/login',
      data: user
    })
    .then(function (resp) {
      $location.path('/listing/')
    })
    .catch(function (err){
      $location.path('/login')
    });
  };

var logOut = function(req, res) {
  // Destroy the sessions and force a browser reload
  // Angular will no longer have a valid session and route to the login page.
  req.session.destroy();
  res.redirect('/');
}


  return {
    login: login
  }
});
