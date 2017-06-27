RollsRoyceApp.factory('quizDataService',function ($http, API_URL) {

    var serviceBase = API_URL;
    var quizDataFactory = {};
    
    //Method to call the weekly quiz status API service for logged in user
    var getWeeklyQuizStatus = function (user_id) {
        var apiData = {basic:{controller:"quiz",action:"get_current_quiz_status"},formdata:{user_id:user_id}};
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
    
    //Method to call the weekly quiz status API service for logged in user
    var getQuestions = function () {
        var apiData = {basic:{controller:"quiz",action:"get_questions"}};
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
    //Method to update quiz score API service for logged in user
    var updateScore = function (quiz_id,current_answers,user_id, marks, percentage_marks) {
        var apiData = {basic:{controller:"quiz",action:"update_quiz_results"},formdata:{user_id:user_id,current_answers:current_answers,quiz_id:quiz_id,marks: marks, percentage:percentage_marks}};
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
 
    //Method to score and rank API service for logged in user
    var getRankAndScore = function (user_id) {
        var apiData = {basic:{controller:"quiz",action:"get_total_score"},formdata:{user_id:user_id}};
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
   
    //Method getNextQuizTime API service for logged in user
    var getNextQuizTime = function () {
    	
        var apiData = {basic:{controller:"quiz",action:"get_next_quiz_time"}};
        return $http({
            method: 'POST',
            url: serviceBase,
            data : apiData
          }).then(function successCallback(response) {
              return  response;
            }, function errorCallback(response) {
            	//alert(response.data);
              return response;
            });
    };
    quizDataFactory.weeklyQuizStatus = getWeeklyQuizStatus;
    quizDataFactory.Questions = getQuestions;
    quizDataFactory.Score = updateScore;
    quizDataFactory.RankAndScore = getRankAndScore;
    quizDataFactory.NextQuizTime = getNextQuizTime;
    return quizDataFactory;
    
});