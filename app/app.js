var RollsRoyceApp = angular.module('RollsRoyceApp',
  ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngStorage', 'ngSanitize'])
  .constant('API_URL', 'http://www.mobile.rolls-royce/data/rest.php/')
  .constant('MARKS', 1)
  .constant('LEADERBOARD_LIMIT', 10)
  .constant('ARTICLE_URL', 'http://www.admin.rolls-royce/')
  .constant('ARTICLES_IMAGES_DIR', 'app/uploads/articles/');
//var app = angular.module('RollsRoyceApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);
RollsRoyceApp.config(function ($routeProvider) {

    $routeProvider.when("/", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });
    
    $routeProvider.when("/register", {
        controller: "registrationController",
        templateUrl: "/app/views/registration.html"
    });
    
    
    $routeProvider.when("/forgot_password", {
        controller: "loginController",
        templateUrl: "/app/views/forgot_password.html"
    });
    
    $routeProvider.when('/logout', {
        controller: "logoutController",
        template: " "
    });

    $routeProvider.when("/change_password", {
        controller: "loginController",
        templateUrl: "/app/views/change_password.html"
    });
    
    $routeProvider.when("/change_password/:encrypt", {
        controller: "loginController",
        templateUrl: "/app/views/change_password.html"
    });
    
    $routeProvider.when("/change_password_confirmation", {
        controller: "loginController",
        templateUrl: "/app/views/change_password_confirmation.html"
    });
    
    $routeProvider.when("/start_quiz", {
        controller: "quizController",
        templateUrl: "/app/views/start_quiz.html"
    });
    
    $routeProvider.when("/countdown", {
        controller: "countdownController",
        templateUrl: "/app/views/countdown.html"
    });

    $routeProvider.when("/questions", {
        controller: "questionsController",
        templateUrl: "/app/views/questions.html"
    });

    $routeProvider.when("/total_score", {
        controller: "scoreController",
        templateUrl: "/app/views/total_score.html"
    });

    $routeProvider.when("/leaderboard", {
        controller: "leaderboardController",
        templateUrl: "/app/views/leaderboard.html"
    });
    
  /*  $routeProvider.when("/articles", {
        controller: "articleController",
        templateUrl: "/app/views/articles.html"
    });
    $routeProvider.when("/view_article", {
        controller: "articleController",
        templateUrl: "/app/views/article_detail.html"
    });*/
    
    $routeProvider.otherwise({ redirectTo: "/" });

});

