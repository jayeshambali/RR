RollsRoyceApp.controller('leaderboardController', function ($scope, leaderboardDataService, API_URL, $location, $rootScope, $localStorage) {
     $scope.background = true;
    $scope.init = function () {


        if (angular.isDefined($localStorage.user_id) && angular.isDefined($localStorage.email_id)) {

            $rootScope.user_id = $localStorage.user_id;
            $scope.firstName = $localStorage.first_name;
            $scope.lastName = $localStorage.last_name;
            $scope.correct_answers = $localStorage.correct_answers;
            $scope.total_questions = $localStorage.total_questions;

            $location.path('/leaderboard');

        } else {
            $location.path('/login');
        }
    }
    //method to get all users total score and rank
    $scope.getAllUsersScore = function () {
        //alert(index);


        leaderboardDataService.AllUsersScore($localStorage.dealer_id).then(function (results) {

            //response = results.data;
            $scope.userDetails = results.data;
            

        }, function (error) {
            console.log(error);
        });

    };
    //method to get all total score and rank of a logged in user
    $scope.getLoggedinUsersScore = function () {
        //alert(index);


        leaderboardDataService.LoggedinUsersScore($rootScope.user_id).then(function (results) {

            //response = results.data;
            console.log(results.data);
            $scope.LoggedinUserDetails = results.data;

        }, function (error) {
            console.log(error);
        });

    };

  //method to redirect page
    $scope.redirectToChangePassword = function(){
    	$('#profileModal').modal('hide');
    	$location.path('/change_password');
    }
    $scope.redirectToLogout = function(){
    	$('#profileModal').modal('hide');
    	$location.path('/logout');
    }
    
    $scope.init();
    $scope.getAllUsersScore();
    $scope.getLoggedinUsersScore();
});