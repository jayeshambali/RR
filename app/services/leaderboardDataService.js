RollsRoyceApp.factory('leaderboardDataService',function ($http, API_URL, LEADERBOARD_LIMIT) {

    var serviceBase = API_URL;
    var leaderboardDataFactory = {};
    
    //Method to call  all users score and rank API service for logged in user
    var getAllUsersScore = function (dealer_id) {
    	console.log("dealer_id", dealer_id);
        var apiData = {basic:{controller:"quiz",action:"get_users_by_score_rank"}, formdata:{limit: LEADERBOARD_LIMIT, dealer_id: dealer_id}};
        return $http({
            method: 'POST',
            url: serviceBase,
            data : apiData
          }).then(function successCallback(response) {
        	  //console.log("users",response);
              return  response;
            }, function errorCallback(response) {
              return response;
            });
    };
 
    //Method to call loggedin users score and rank API service for logged in user
    var getLoggedinUsersScore = function (user_id) {
        var apiData = {basic:{controller:"quiz",action:"get_total_score_rank"},formdata:{user_id:user_id}};
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

    leaderboardDataFactory.AllUsersScore = getAllUsersScore;
    leaderboardDataFactory.LoggedinUsersScore = getLoggedinUsersScore;
        return leaderboardDataFactory;
    
});