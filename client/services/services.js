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

  var postOne = function(job) {
    job.fav = 0;
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
    job.company = prompt('Please enter a new company name.', job.company);

    return $http({
      method: 'PUT',
      url: '/api/listing',
      data: job,
      headers: {'Content-Type': 'application/json'}
    })
  };

  //How do we just merge this with above, as one PUT function?
  var toggleOne = function(job) {
    // job.fav = !job.fav;
    job.fav = (job.fav === undefined || job.fav === 'unfav') ? 'fav' : 'unfav';
    return $http({
      method: 'PUT',
      url: '/api/listing',
      data: job,
      headers: {'Content-Type': 'application/json'}
    })
  }

	return {
		getAll: getAll,
    postOne: postOne,
    delOne: delOne,
    editOne: editOne,
    toggleOne: toggleOne
	};
})
