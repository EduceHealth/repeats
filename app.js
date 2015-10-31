
var app = angular.module('app',[
  'ngMaterial',
  'ngAnimate',
  'ngAria',]);

app.controller('testCtrl',function($scope, $http){

  $scope.active={};
  
  $http.get('/data.json')
  .then(function(res){
    return res.data
  })
  .then(function(intersection){
    $scope.active.Intersection = intersection;
    //Choose the first chapter just to start things off.
    $scope.active.Chapter = $scope.active.Intersection[0];
  });
})
