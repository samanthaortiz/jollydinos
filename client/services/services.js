angular.module('gitHired',[])
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
	// return
	return {
		getAll:getAll
	};
})


