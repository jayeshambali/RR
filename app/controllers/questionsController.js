RollsRoyceApp.controller('questionsController', function ($scope, quizDataService, MARKS, API_URL, $location, $rootScope, $localStorage) {
    $scope.correct_answers = 0;
    $scope.background = true;
    $scope.init = function () {
    	 $scope.result_graph=[];
        if (angular.isDefined($localStorage.user_id) && angular.isDefined($localStorage.email_id)) {
            quizDataService.weeklyQuizStatus($localStorage.user_id).then(function (results) {
                response = results.data;
               /* console.log("here-quest",response.data.quiz_appeared); 
                console.log("currentvaluye", $localStorage.quiz_appeared); */
                if (response.data.quiz_appeared == 0) {
                    $localStorage.quiz_appeared = 0;
                }else{
                	 $localStorage.quiz_appeared = 1;
                }
                if ($localStorage.quiz_appeared == 0) {
                    $scope.getQuizQuestions();
                    $location.path('/questions');
                } else {
                	//console.log("hererererere");
                    $location.path('/countdown');
                }

            }, function (error) {
                console.log(error);
            });
            
            $scope.user_id = $localStorage.user_id;
            $scope.firstName = $localStorage.first_name;
            $scope.lastName = $localStorage.last_name;

        } else {
            $location.path('/login');
        }
    };

    //method to get all questions
    $scope.getQuizQuestions = function (index = 0) {
        //alert(index);
        $rootScope.enable_button = "disbled";
        $scope.question_result = "";
        $scope.current_question_number = index + 1;
        $scope.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (index == 0) {
            quizDataService.Questions().then(function (results) {

                response = results.data;
                console.log(results);
                if (response.status_code == 404) {
                    $location.path('/countdown');

                } else if (response.status_code == 201) {
                    //console.log(response.data);
                    $scope.questions = response.data;
                    $scope.questions[index][0][0] = "active-question";
                    //console.log($scope.questions[0][0][index]);
                    console.log($scope.questions);
                    $scope.total_questions = response.data.length;
                    $scope.answers = response.data[index];
                    //console.log($scope.answers);
                    $scope.question = $scope.answers[0].question;
                    $rootScope.quiz_id = response.quiz_id;
                    $rootScope.question_id = $scope.answers[0].question_id;
                    $rootScope.correct_answer = $scope.answers[0].correct_answer;

                }
            }, function (error) {
                console.log(error);
            });
        } else
        {
            $scope.questions = response.data;
            // console.log($scope.questions);
            $scope.total_questions = response.data.length;
            $scope.answers = response.data[index];
            //console.log($scope.answers);
            $scope.question = $scope.answers[0].question;
            $scope.questions[index][0][0] = "active-question";
            $rootScope.question_id = $scope.answers[0].question_id;
            //alert($rootScope.question_id);
            $rootScope.correct_answer = $scope.answers[0].correct_answer;
            // console.log($scope.questions[0][0][index]);
            console.log($scope.questions);
        }

    };



    $scope.getQuestionResult = function (answer_id, question_id, current_question_number) {
        if ($scope.questions[current_question_number - 1][0][0] == "active-question")
        {
        	
            if (answer_id == $rootScope.correct_answer && question_id == $rootScope.question_id)
            {
                $scope.question_result = "correct";
                $scope.questions[current_question_number - 1][0][0] = "answered-correct";
                $scope.correct_answers++;
                //$scope.result_graph.push({current_question_number:current_question_number,rsu:1});
                $scope.result_graph.push(1);
            } else
            {
                $scope.question_result = "incorrect";
                $scope.questions[current_question_number - 1][0][0] = "answered-incorrect";
                //$scope.result_graph.push({current_question_number:current_question_number,rsu:1});
                $scope.result_graph.push(0);
            }
            if (current_question_number == $scope.total_questions)
            {
            	
            	//$location.path('/total_score');
                //alert($scope.correct_answers);
                //method to update quiz score
            	$scope.correct_answers=$scope.correct_answers*MARKS;
                $localStorage.correct_answers = $scope.correct_answers;
                $localStorage.total_questions = $scope.total_questions;
                $localStorage.result_graph = $scope.result_graph;
                $localStorage.result_graph = $scope.result_graph;
                
                //percentage calculations
                $scope.quiz_result_percentage = ($scope.correct_answers * 100)/$scope.total_questions;
                $localStorage.current_quiz_percentage = $scope.quiz_result_percentage;
                console.log("percentage",$scope.quiz_result_percentage);
                console.log("correct answers", $scope.correct_answers);
                console.log("totalquestions", $scope.total_questions);
                $scope.updateQuizScore = function () {
                    quizDataService.Score($rootScope.quiz_id,$scope.correct_answers, $scope.user_id, MARKS,$scope.quiz_result_percentage).then(function (results) {

                        console.log(results);
                        $localStorage.quiz_appeared = 1;
                        $location.path('/total_score');

                    }, function (error) {
                        console.log(error);
                    });

                };
                $scope.updateQuizScore();

            } else {
                $rootScope.enable_button = "";
            }
        }
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
});