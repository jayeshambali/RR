RollsRoyceApp.factory('authorizationDataService',function ($http, API_URL,$rootScope) {

    var serviceBase = API_URL;
    
    var authDataFactory = {};
    
    //Method to call the login API service
    var checkUserSessionExists = function (user_id) {
        
            var apiData = {basic:{controller:"users",action:"check_user_session"},formdata:{user_id:user_id}};
            return $http({
                method: 'POST',
                url: serviceBase,
                data : apiData
              }).then(function successCallback(response) {
                  //var logged_in = response.data.data.logged_in;
                  //console.log("user_logged", logged_in);
                  // when the response is available
                  return  response;
                  //console.log(resp);
                }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                  return response;
                });
    };
    
    
     authDataFactory.sessionExists = checkUserSessionExists;

    return authDataFactory;
});
