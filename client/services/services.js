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
    // job.fav = false;
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
    job.fav = !job.fav;
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
// .factory('Login', function($scope, $location){
//    $scope.FBLogin = function(){
//     var statusChangeCallback = function(response) {
//     // console.log('statusChangeCallback');
//     if (response.status === 'connected') {
//       testAPI();
//       // $location.path('/listing');
//     } else if (response.status === 'not_authorized') {
//       document.getElementById('status').innerHTML = 'Please log ' +
//         'into this app.';
//       console.log("Please log into this app")
//     } else {
//       document.getElementById('status').innerHTML = 'Please log ' +
//         'into Facebook.';
//       console.log("Please log into FB")
//     }
//   };
//    $scope.checkLoginState = function() {
//     FB.getLoginStatus(function(response) {
//       statusChangeCallback(response);
//     });
//   };

//   var status = function(){
//     // checkLoginState();
//     FB.getLoginStatus(function(response) {
//       return response.status === "connected";
//     });
//   }
//    var testAPI = function() {
//     console.log('Welcome!  Fetching your information.... ');
//     FB.api('/me', function(response) {
//       console.log('Successful login for: ' + response.name);
//       document.getElementById('status').innerHTML =
//         'Thanks for logging in, ' + response.name + '!';
//     });
//   }

// window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '326417324371711',
//       xfbml      : true,
//       version    : 'v2.7',
//       status     : true
//     });
//      FB.getLoginStatus(function(response) {
//       statusChangeCallback(response);
//   });
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = 'https://connect.facebook.net/en_US/all.js"'
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// }

// return{
//   checkLoginState: checkLoginState,
//   status: status,
//   FBLogin: FBLogin
// }
// })
