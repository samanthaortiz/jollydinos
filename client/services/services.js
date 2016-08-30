angular.module('gitHired.services',[])
// called the angular module

//instantiate
.factory('Jobs', function($http) {
	var getAll = function () {
  // Returnaing a Promise returned by $http
  // sending a Get request that will be routed in the router file
  	return $http({
  		method: 'GET',
  		url: '/api/listing'
    });
	};

  var postOne = function (job) {
    return $http({
      method: 'POST',
      url: '/api/listing',
      data: job
    });
  };

  var delOne = function (job) {
    return $http({
      method: 'DELETE',
      url: '/api/listing',
      data: job,
      headers: {'Content-Type': 'application/json'}
    })
  };

  var editOne = function (job) {
    // console.log('SVC', job);
    return $http({
      method: 'PUT',
      url: '/api/listing',
      data: job,
      headers: {'Content-Type': 'application/json'}
    })
  };

	// return
	return {
		getAll: getAll,
    postOne: postOne,
    delOne: delOne,
    editOne: editOne
	};
})
