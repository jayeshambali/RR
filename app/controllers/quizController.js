RollsRoyceApp.controller('quizController', function ($scope, quizDataService, leaderboardDataService, API_URL, MARKS, $location, $rootScope, $localStorage, $interval) {
     $scope.background = false;
    $scope.init = function () {


        if (angular.isDefined($localStorage.user_id) && angular.isDefined($localStorage.email_id)) {
            quizDataService.weeklyQuizStatus($localStorage.user_id).then(function (results) {
                response = results.data;
                //console.log("here",response.data.quiz_appeared);
                var quiz_appear = response.data.quiz_appeared;
               // console.log("ffggg",quiz_appear);
                if (quiz_appear == 0) {
                    $localStorage.quiz_appeared = 0;
                }else{
                    $localStorage.quiz_appeared = 1;
                }
                
                if (quiz_appear == 0) {
                	/*console.log("QCffggg",quiz_appear);
                	console.log("QC 21" );*/
                    $location.path('/start_quiz');
                } else {
                    $location.path('/countdown');
                }
                $scope.user_id = $localStorage.user_id;
                $scope.firstName = $localStorage.first_name;
                $scope.lastName = $localStorage.last_name;

            }, function (error) {
                console.log(error);
            });

            

        } else {
            $location.path('/login');
        }
    };
 
    //method to get all total score and rank of a logged in user
    $scope.getLoggedinUsersScore = function () {
        //alert(index);

    	$rootScope.user_id = $localStorage.user_id;
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
    $scope.getLoggedinUsersScore();
 });