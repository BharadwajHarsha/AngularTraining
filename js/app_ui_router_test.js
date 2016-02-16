var app = angular.module("myTestApp", ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'templates/test/home.html',
		controller: 'HomeController'
	}).state('firstPage',{
		url:'/first-page',
		templateUrl: 'templates/test/first-page.html',
		controller: 'First'
	}).state('secondPage', {
		url: '/second-page/:message?to',
		templateUrl: 'templates/test/second-page.html',
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