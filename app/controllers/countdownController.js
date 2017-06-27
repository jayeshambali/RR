RollsRoyceApp.controller('countdownController', function ($scope, quizDataService, leaderboardDataService, API_URL, MARKS, $location, $rootScope, $localStorage, $interval) {
    $scope.background = true;
     $rootScope.isArticle = false;
    $scope.init = function () {

    		
        if (angular.isDefined($localStorage.user_id) && angular.isDefined($localStorage.email_id)) {
            quizDataService.weeklyQuizStatus($localStorage.user_id).then(function (results) {
                response = results.data;
                var quiz_appeared = response.data.quiz_appeared;
                if (quiz_appeared == 0) {
                    $localStorage.quiz_appeared = 0;
                }
                else{
               	 $localStorage.quiz_appeared = 1;
               }
                /*console.log(typeof($localStorage.quiz_appeared));
                console.log("local",$localStorage.quiz_appeared);*/
                
                if ($localStorage.quiz_appeared == 0) {
                	//console.log("hernhjkhjh"); 
                    $location.path('/start_quiz'); /*return false;*/
                } else {
                	
                    $location.path('/countdown');
                }
               // console.log("heredfgdfg111gggggg");
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

    //method to get getNextQuizTime
    $scope.getNextQuizTime = function () {
        //alert(index);

        quizDataService.NextQuizTime($scope.user_id).then(function (results) {

            //response = results.data;
            console.log(results.data);
            if (results.data.no_quiz == 1) {
                $scope.nextQuizExists = 0;
                //console.log('val=',$scope.nextQuizExists);

            } else {
                $scope.nextQuizExists = 1;
                $scope.nextQuizTime = results.data;
                // console.log('val=',$scope.nextQuizExists);

            }
        }, function (error) {
            console.log(error);
        });

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
    $scope.getNextQuizTime();
    $scope.getLoggedinUsersScore();
    //$interval($scope.getNextQuizTime(), 60000);
    $interval(function () {
        $scope.getNextQuizTime();
    }, 60000);
});