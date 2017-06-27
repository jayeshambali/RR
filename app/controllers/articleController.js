RollsRoyceApp.controller('articleController', function ($scope, articleDataService, ARTICLE_URL, ARTICLES_IMAGES_DIR, $localStorage, $rootScope, $location) {
    //Method to redirect if user loggedin
    $scope.background = true;
    $rootScope.isArticle = true;
    $scope.article_link = 'articles';
    $scope.article_url = ARTICLE_URL + '/app/uploads/articles/';
    $scope.message='';


    //pagination
    $scope.totalRecordsCount = 0;
    //$scope.pageSize = 2;
    $scope.currentPage = 1;
    $scope.filtered_articles = [];
    $scope.numPerPage = 2;
    $scope.maxSize = 2;

    $scope.init = function () {
        if (angular.isDefined($localStorage.user_id) && angular.isDefined($localStorage.email_id)) {
            $rootScope.user_id = $localStorage.user_id;
            $scope.firstName = $localStorage.first_name;
            $scope.lastName = $localStorage.last_name;
        }

    };

    $scope.pageChanged = function () {
        //console.log("page change");
        $scope.getAllUserArticles();
    };
    //method to get the article list
    $scope.getAllUserArticles = function () {
        //if ($scope.articles == '') {
            articleDataService.articleList($localStorage.user_id).then(function (results) {
                //console.log(results);
                var article_lists = results.data.data;
                console.log(article_lists);
                $scope.filtered_articles = article_lists;
                $scope.totalRecordsCount = article_lists.length;
                $scope.message=results.data.message;

            }, function (error) {
                console.log(error);
            });
       // }
    };
   /* $scope.$watch('articles', function () {
        console.log("page", $scope.currentPage);
        if ($scope.articles) {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage);
            var end = begin + $scope.numPerPage;
            console.log('begin', begin);
            console.log('end', end);
            $scope.filtered_articles = $scope.articles.slice(begin, end);
            console.log($scope.filtered_articles);
        }
    });*/

    $scope.showArticleDetails = function (article_id) {
        //console.log('articleId', article_id);
        //console.log("useridinsingle", $localStorage.user_id);
        articleDataService.getArticleById(article_id, $localStorage.user_id).then(function (results) {
            //console.log(results);
            var article_details = results.data.data;
            console.log("details", article_details);
            $rootScope.article_title = article_details.article_title;
            $rootScope.article_content = article_details.article_content;
            $rootScope.article_image = article_details.image;
            $rootScope.expiry_date = article_details.end_date;
            
            $rootScope.article_img_dir = ARTICLE_URL + ARTICLES_IMAGES_DIR;
            
            $location.path('/view_article');
        }, function (error) {
            console.log(error);
        });
    };

  //method to redirect page
    $scope.redirectToChangePassword = function(){
    	$('#profileModal').modal('hide');
    	$location.path('/change_password');
    };
    $scope.redirectToLogout = function(){
    	$('#profileModal').modal('hide');
    	$location.path('/logout');
    };
    
    $scope.init();
    $scope.getAllUserArticles();
});
