RollsRoyceApp.factory('loginDataService',function ($http, API_URL,$localStorage,$rootScope) {

    var serviceBase = API_URL;
    
    var loginDataFactory = {};
    //Method to call the login API service
    var loginAssociate = function (username, password) {
        var apiData = {basic:{controller:"users",action:"login"},formdata:{username:username,password:password}};
        return $http({
            method: 'POST',
            url: serviceBase,
            data : apiData
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              return  response;
              //console.log(resp);
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              return response;
            });

    };
    //Method to call the forgotpwd API service
    var forgotpwdAssociate = function (username) {
        var apiData = {basic:{controller:"users",action:"forgot_password"},formdata:{username:username}};
        return $http({
            method: 'POST',
            url: serviceBase,
            data : apiData
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              return  response;
              //console.log(resp);
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              return response;
            });

    };
    
    //Method to validate Change password link from e-mail
    var checkChangePassLinkService = function(encrypt){
    	var apiData = {basic:{controller:"users",action:"checkChangePassLink"},formdata:{encrypt:encrypt}};
        return $http({
            method: 'POST',
            url: serviceBase,
            data : apiData
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              return  response;
              //console.log(resp);
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              return response;
            });
    };
    
    
    //Method to call the changepwd API service
    var changepwdAssociate = function (password,user_id) {
        var apiData = {basic:{controller:"users",action:"change_password"},formdata:{password:password,user_id:user_id}};
        return $http({
            method: 'POST',
            url: serviceBase,
            data : apiData
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              return  response;
              //console.log(resp);
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              return response;
            });

    };
    
  //Method to update Notification Setting
    var notificationSettingUpdate = function (update, user_id, type) {
        var apiData = {basic:{controller:"users",action:"notification_setting_update"},formdata:{update_value:update,user_id:user_id, update_type: type}};
        return $http({
            method: 'POST',
            url: serviceBase,
            data : apiData
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              return  response;
              //console.log(resp);
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              return response;
            });

    };

    //Method to update Notification Setting
    var fetchQuizreadystatus = function (user_id) {

        var apiData = {basic:{controller:"users",action:"fetch_quizready_status"},formdata:{user_id:user_id}};
        return $http({
            method: 'POST',
            url: serviceBase,
            data : apiData
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              console.log(response);
              return  response;
              //console.log(resp);
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              return response;
            });

    };


    var loginSuccessAssign = function (response) {
               
                $localStorage.user = response.data;
                $localStorage.email_id = response.data.username;
                $localStorage.user_id = response.data.user_id;
                if (response.data.first_name)
                    $localStorage.first_name = response.data.first_name;
                else
                    $localStorage.first_name = "Firstname";
                if (response.data.first_name)
                    $localStorage.last_name = response.data.last_name;
                else
                    $localStorage.last_name = "Lastname";
                $localStorage.quiz_appeared = response.data.quiz_appeared;
                $rootScope.user = $localStorage.user;
                $rootScope.user_id = $localStorage.user_id;
                $rootScope.firstName = $localStorage.first_name;
                $rootScope.lastName = $localStorage.last_name;
                $rootScope.quiz_appeared = $localStorage.quiz_appeared;
    };
    
     loginDataFactory.login = loginAssociate;
     loginDataFactory.forgotpwd = forgotpwdAssociate;
     loginDataFactory.changepwd = changepwdAssociate;
     loginDataFactory.loginSetValues = loginSuccessAssign;
     loginDataFactory.checkChangePassLinkService = checkChangePassLinkService;
     loginDataFactory.notificationSettingUpdate = notificationSettingUpdate;
     loginDataFactory.fetchQuizreadystatus = fetchQuizreadystatus;

    return loginDataFactory;
});
