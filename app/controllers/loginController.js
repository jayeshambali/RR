RollsRoyceApp.controller('loginController', function ($scope, $routeParams, loginDataService, quizDataService, API_URL, $localStorage, $location, $rootScope) {
    //Method to redirect if user loggedin
     $scope.background = false;
     $scope.email_error = false;
     $scope.password_error = false;
     $scope.message ='';
    $scope.init = function () {
        if (angular.isDefined($localStorage.user_id) && angular.isDefined($localStorage.email_id) && angular.isDefined($localStorage.temppass)) { 
            if($location.path() == '/change_password'){
            	$location.path('/change_password');
            }else if($location.path() == '/change_password_confirmation'){
            	$location.path('/change_password_confirmation');
            }
            else {
                $location.path('/start_quiz');
            }
        }
    };
//Method to login the sales associate
    $scope.loginSalesAssociate = function () {
        loginDataService.login($scope.email, $scope.password).then(function (results) {
            response = results.data;
            if (response.status_code == 404) {

                 $scope.errorMessage = response.message;
                 $scope.email_error = true;
                 $scope.password_error = true;
                
            } else if (response.status_code == 201) {
                var quiz_appeared = response.data.quiz_appeared;
                 $localStorage.temppass = response.data.temppass;
                 $localStorage.dealer_id = response.data.dealer_id;
                loginDataService.loginSetValues(response);
                console.log('emailid',$localStorage.email_id);

                /*if ($localStorage.temppass == 1) {
                    $location.path('/change_password');
                } else {*/
                        $location.path('/start_quiz');
               /* }*/
            }
            return false;

        }, function (error) {
            console.log(error);
        });
        return false;
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
//                $location.path('/login');
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

  // Method to check Change Password Link from the user's email  
   if($location.path() == '/change_password/'+$routeParams.encrypt )
   {
	   loginDataService.checkChangePassLinkService($routeParams.encrypt).then(function (results) 
	   {
           console.log(results);
           response = results.data;
           if (response.status_code == 404) {
               $scope.errorMessage = response.message;
               $location.path('/forgot_password');
           } else if (response.status_code == 201) {
        	   $localStorage.user_id = response.data['user_id']; // assigning user_id to $localStorage
           }

           return false;

       }, function (error) {
           console.log(error);
       });
   }
   
    //Method to changepwd the sales associate
    $scope.changePasswordSalesAssociate = function () {
    	
        loginDataService.changepwd($scope.password, $localStorage.user_id).then(function (results) {
            console.log(results);
            delete $localStorage.user_id; // delete user_id in localStorage
            response = results.data;
            if (response.status_code == 404) {
                $scope.errorMessage = response.message;
            } else if (response.status_code == 201) {
                //$localStorage.$reset(); // need to check what it does..
                $location.path('/change_password_confirmation');
            }

            return false;

        }, function (error) {
            console.log(error);
        });
        return false;
    };
    
 
    
	
    
    //Method to redirect users to sales registration page
    $scope.registerUsers = function (){
       $location.path('/register');

    };
    
    
  
    $scope.init();
});
