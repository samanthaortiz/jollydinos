angular.module('gitHired.services',[])

.factory('Jobs', function($http, $window) {
  var getAll = function () {
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

  return {
    getAll: getAll,
    postOne: postOne,
    delOne: delOne,
    editOne: editOne,
  };
});
