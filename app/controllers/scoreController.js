RollsRoyceApp.controller('scoreController', function ($scope, quizDataService, API_URL, MARKS, $location, $rootScope, $localStorage) {

    $scope.background = true;
    //method to get all total score and rank


    $scope.init = function () {

        if (angular.isDefined($localStorage.user_id) && angular.isDefined($localStorage.email_id)) {

            console.log($localStorage.result_graph);

            $scope.user_id = $localStorage.user_id;
            $scope.firstName = $localStorage.first_name;
            $scope.lastName = $localStorage.last_name;
            $scope.correct_answers = $localStorage.correct_answers;
            $scope.result_graph = $localStorage.result_graph;

            $scope.current_score = $scope.correct_answers * MARKS;
            console.log($scope.current_score);
            $scope.total_questions = $localStorage.total_questions;
            $scope.current_percentage = $localStorage.current_quiz_percentage;
            console.log("curent-percentage", $scope.current_percentage);

            quizDataService.RankAndScore($scope.user_id).then(function (results) {
                var response = results.data;
                $scope.total_score = response.total_score;
                $scope.rank = response.rank;

            }, function (error) {
                console.log(error);
            });


            $location.path('/total_score');
        } else {
            $location.path('/login');
        }
    }
    
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

});