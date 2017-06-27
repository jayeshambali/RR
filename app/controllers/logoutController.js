RollsRoyceApp.controller('logoutController', function ($scope, $localStorage, $location) {
    //Method to redirect if user loggedin
    $scope.background = false;
    $scope.init = function () {
        $localStorage.$reset();
        //console.log("coming");
        $location.path('/');
    };


    $scope.init();
});
