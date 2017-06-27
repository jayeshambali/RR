RollsRoyceApp.controller('registrationController', function ($scope, registrationDataService, loginDataService,  API_URL, $location, $rootScope, $localStorage,loginDataService) {
     $scope.background = false;
     $scope.email_error=false;
    //Method to redirect if user loggedin
    $scope.init = function () {
        if (angular.isDefined($localStorage.user_id) && angular.isDefined($localStorage.email_id)) {
            if ($localStorage.quiz_appeared == 0) {
                $location.path('/start_quiz');
            } else {
                $location.path('/start_quiz');
            }
        }
    }
    //method to register sales associate
    $scope.registerSalesAssociate = function () {
        registrationDataService.registration($scope.email, $scope.password).then(function (results) {
            response = results.data;
            $scope.result_code = results.data.status_code;
            console.log(results);
            //$scope.message = results.data.message;
            if ($scope.result_code == 201)
            {
                $rootScope.message = 'You have registered Successfully. Please Login';
                loginDataService.loginSetValues(response);
                $location.path('/start_quiz');
            }else if ($scope.result_code == 418) //if email error exists
            {
            	$scope.email_error = true;
                $scope.errorMessage = results.data.message;
            }else if ($scope.result_code == 417)  //if password error exists
            {
            	$scope.password_error = true;
                $scope.errorMessage = results.data.message;
            }else if($scope.result_code == 419){ // if both email and password error exists
            	$scope.email_error = true;
            	$scope.password_error = true;
                $scope.errorMessage = results.data.message;
            }

        }, function (error) {
            console.log(error);
        });
        return false;
    };
     //Method to redirect users to login page
   $scope.loginUsers = function (){
        $location.path('/login');
   };
   
 //Method to forgotpwd the sales associate
   $scope.forgotpwdSalesAssociate = function () {
       loginDataService.forgotpwd($scope.email).then(function (results) {
           console.log(results);
           response = results.data;
           if (response.status_code == 404) {

               $scope.errorMessage = response.message;
           } else if (response.status_code == 201) {
               $localStorage.$reset();

               $localStorage.user_id = response.data['user_id'];
               $rootScope.user_id = $localStorage.user_id;
               $scope.message = response.message;
               console.log($scope.message);
//               $location.path('/login');
           }

           return false;

       }, function (error) {
           console.log(error);
       });
       return false;
   };

   
   $scope.reloadlogin=function()
   {
   	$('#myModal').modal('hide');
   	$('#checkmail').modal('hide');
   	
   }
   
   $scope.onEmailChange=function()
   { 
	   if($scope.email_error || $scope.password_error){
		   $scope.email_error=false;
		   $scope.password_error=false;
	   }
   }
   $scope.onPasswordChange=function()
   {
	   if($scope.email_error || $scope.password_error){
		   $scope.email_error=false;
		   $scope.password_error=false;
	   }
   }
   
    $scope.init();
});