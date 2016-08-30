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

  //NOT CURRENTLY USED. REINTRODUCE AFTER.
  var delOne = function (id) {
    return $http({
      method: 'DELETE',
      url: '/api/listing',
      data: {id: id},
      headers: {'Content-Type': 'application/json'}
    })
  };

	// return
	return {
		getAll: getAll,
    postOne: postOne,
    delOne: delOne
	};
})
