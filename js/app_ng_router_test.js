var app = angular.module("myTestApp", ['ui.router']);
app.config(function($locationProvider, $routeProvider){
	$routeProvider.when('/', {
		
		templateUrl: '/templates/test/home.html',
		controller: 'HomeController'
	}).when('/first-page', {
		
		templateUrl: '/templates/test/first-page.html',
		controller: 'First'
	}).when('/second-page',{
		
		templateUrl: '/templates/test/second-page.html',
			controller: 'Second'
	});
});

app.controller("First", function($scope){
	$scope.message = "First Controller";
	$scope.firstFunction = function(){
		alert("From First COntroller");
	};
});

app.controller("Second", function($scope, $location, $stateParams){
	$scope.message = "Second Controller";
	
	var paramMsg = $stateParams.message;
	$scope.secondFunction = function(){
		console.log($stateParams);
		alert("From Second COntroller");
		alert("Param Message:"+paramMsg);
		$location.path('/');
	};
});
app.controller("HomeController", function($scope){
	$scope.message = "Home Controller";
	$scope.homeFunction = function(){
		alert("From Home COntroller");
	};
});