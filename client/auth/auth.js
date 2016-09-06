angular.module('gitHired.auth', [])
.controller('LoginController', function ($scope, $location, $http, $window, Auth) {
  $scope.FBLogin = function(){
    var statusChangeCallback = function(response) {
    // console.log('statusChangeCallback');
    if (response.status === 'connected') {
      // console.log("STATUSSS", response.status);
      testAPI();
      // $location.path('/listing');
    } else if (response.status === 'not_authorized') {
      console.log("Please log into this app")
    } else {
      console.log("Please log into FB")
    }
  };

  $scope.checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    })
  };

  // var status = function(){
  //   FB.getLoginStatus(function(response) {
  //     if(response.status === "connected"){}
  //   });
  // }

   var testAPI = function() {
    $scope.user = {};
    $window.fbId;
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {fields: 'id,name'}, function(response) {
      console.log('res id', response.id)
      $window.fbId = response.id;
        console.log("FB ID", $window.fbId)
      console.log('Successful login for: ' + response.name);
    })
    Auth.login($scope.user)
      .then(function (token) {
        $location.path('/listing/');
      })
      .catch(function (error) {
        $location.path('/login');
      });
  }

//     FB.api('/me',  {fields: 'last_name'}, function(response) {
//   console.log(response);
// });

// FB.api('/me', {fields: 'id,name,gender' }, function(response) {
//     console.log("TOKEN", response);
//     //get request
// });

window.fbAsyncInit = function() {
    FB.init({
      appId      : '326417324371711',
      xfbml      : true,
      version    : 'v2.7',
      status     : true
    });
    FB.Event.subscribe('auth.login', function(){
      window.location.reload();
    })
     FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
  });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = 'https://connect.facebook.net/en_US/all.js"'
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}

$scope.FBLogin();

});