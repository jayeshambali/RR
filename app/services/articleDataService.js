RollsRoyceApp.factory('articleDataService',function ($http, API_URL,$rootScope) {

    var serviceBase = API_URL;
    
    var articleDataFactory = {};
    
    //Method to call the login API service
    var getAllArticleList = function (user_id) {
        
            var apiData = {basic:{controller:"article",action:"get_articles"},formdata:{user_id:user_id}};
            return $http({
                method: 'POST',
                url: serviceBase,
                data : apiData
              }).then(function successCallback(response) {
                  //var logged_in = response.data.data.logged_in;
                  //console.log("user_logged", logged_in);
                  // when the response is available
                  return  response;
                  //console.log(resp);
                }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                  return response;
                });
    };
    //Method to get article details using article id
    var getArticleInfoById = function(article_id, user_id){
        var apiData = {basic:{controller:"article",action:"get_article_by_id"},formdata:{article_id:article_id,user_id:user_id}};
            return $http({
                method: 'POST',
                url: serviceBase,
                data : apiData
              }).then(function successCallback(response) {
                  //var logged_in = response.data.data.logged_in;
                  //console.log("user_logged", logged_in);
                  // when the response is available
                  return  response;
                  //console.log(resp);
                }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                  return response;
                });
    };
    
    
     articleDataFactory.articleList = getAllArticleList;
     articleDataFactory.getArticleById = getArticleInfoById;

    return articleDataFactory;
});
