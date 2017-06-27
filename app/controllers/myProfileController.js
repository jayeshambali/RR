RollsRoyceApp.controller('myProfileController', function ($scope, $routeParams, loginDataService, API_URL, $localStorage, $location, $rootScope) {
	$scope.quiz_ready = 0;
	$rootScope.fetchQuizreadystatus = function(){
		
		loginDataService.fetchQuizreadystatus($localStorage.user_id).then(function (results) {
		           
		            if( parseInt(results.data.data) === 1 )
		            	$scope.quiz_ready = 1;
		            else
		            	$scope.quiz_ready = 0;
		           return false;
		      
		        }, function (error) {
		            console.log(error);
		        });
		       
	};

	 //Method to update the push notification settings of the user
    $scope.onNotificationSettingChange = function (notification_setting) {
    	switch(notification_setting){
    		case "quiz_ready":
		        loginDataService.notificationSettingUpdate($scope.quiz_ready, $localStorage.user_id, 'quiz_ready').then(function (results) {
		            console.log(results);
		           
		            response = results.data;
		            if (response.status_code == 404) {
		                $scope.errorMessage = response.message;
		                console.log("something went wrong in updating notification settings");
		            } else if (response.status_code == 201) {
		            	 console.log("Successfully updated notification settings");
		            }
		
		            return false;
		
		        }, function (error) {
		            console.log(error);
		        });
		        
		        break;
		        
    		case "vip_room_update":
    	    	
		        loginDataService.notificationSettingUpdate($scope.vip_room_update, $localStorage.user_id, 'vip_room').then(function (results) {
		            console.log(results);
		           
		            response = results.data;
		            if (response.status_code == 404) {
		                $scope.errorMessage = response.message;
		                console.log("something went wrong in updating notification settings");
		            } else if (response.status_code == 201) {
		            	 console.log("Successfully updated notification settings");
		            	 $scope.note = response.note;
		            }
		
		            return false;
		
		        }, function (error) {
		            console.log(error);
		        });
		        
		        break;
		        
		        
    	}
        return false;
        
    };
});