RollsRoyceApp.factory('registrationDataService',function ($http, API_URL) {

    var serviceBase = API_URL;
    var registrationDataFactory = {};
    //Method to call the registration API service
    var registerAssociate = function (username, password) {
        var apiData = {basic:{controller:"users",action:"registration"},formdata:{email:username,password:password}};
        //var registrationForm = { username: username,  password: password};
        return $http({
            method: 'POST',
            url: serviceBase,
            data : apiData
          }).then(function successCallback(response) {
              return  response;
            }, function errorCallback(response) {
              return response;
            });
    };
    registrationDataFactory.registration = registerAssociate;
    return registrationDataFactory;
});