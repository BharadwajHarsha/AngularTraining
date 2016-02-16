(function(){
	
	var pmModule = angular.module("pm", ['ui.router']);

pmModule.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'templates/pm-home.html'
	}).state('viewAll', {
		url:'/view-all',
		templateUrl:'templates/pm-grid.html',
		controller: 'ViewAllController'
	}).state('newProduct', {
		url:'/new',
		templateUrl:'templates/pm-product-form.html',
		controller:'SaveOrUpdateOrViewController'
	}).state('viewAll.editProduct', {
		url:'/edit/:prodId',
		views: {
			columnOne: {
				templateUrl : "templates/pm-product-form.html",
				controller : 'SaveOrUpdateOrViewController'
			},
			columnTwo: {
				templateUrl : "templates/pm-product-view.html",
				controller : 'SaveOrUpdateOrViewController'
			}
		}
	}).state('viewAll.viewProduct', {
		url : "/view/:prodId",
		views : {
			columnOne : {
				templateUrl : "templates/pm-product-view.html",
				controller : 'SaveOrUpdateOrViewController'
			}
		}
	});
	//);
	
	
});
pmModule.controller('ViewAllController', function($scope, productsService,
		$state) {
	productsService.loadAll().then(function(value) {
		$scope.products = value;
	});
	$scope.remove = function(id) {
		console.log("In ViewAllController remove:"+id);
		productsService.remove(id).then(function(value) {
			$state.reload();
		});
	};
});

pmModule.controller('SaveOrUpdateOrViewController', function($scope,
		productsService, $location, $stateParams) {

	var prodId = $stateParams.prodId;

	if (!prodId) {
		$scope.product = {};
	} else {
		productsService.viewById(prodId).then(function(value) {
			$scope.product = value;
			$scope.action = 'update';
		});
	}

	$scope.save = function() {

		if ($scope.action !== 'update') {
			productsService.addNew($scope.product).then(function(value) {
				$scope.product = {};
				// $scope.message='New Product saved..'
				$location.path('view-all');
			});
		} else {
			productsService.update($scope.product).then(function(value) {
				$scope.product = {};
				// $scope.message='New Product saved..'
				$location.path('view-all');
			});
		}

	};

});

// -------------------------------------------------------------------------

pmModule.factory('productsService', function($q, $http) {

	//var url = "http://localhost:3000/api/products";
	var url = "http://localhost:3000/posts";
	var service = {
		loadAll : function() {
			var defer = $q.defer();
			$http.get(url).then(function(result) {
				defer.resolve(result.data);
			});
			return defer.promise;
		},
		viewById : function(id) {
			var defer = $q.defer();
			$http.get(url + "/" + id).then(function(result) {
				defer.resolve(result.data);
			},
			function errorCallback(error){
				console.log(error);
			});
			return defer.promise;
		},
		addNew : function(newProduct) {
			console.log("AddNew Called");
			var defer = $q.defer();
			var promise = $http.post(url, newProduct);
			promise.then(function(result) {
				defer.resolve(result.data);
			}, 
			function errorCallback(error){
				console.log(error);
			});
			return defer.promise;
		},
		update : function(product) {
			console.log("ProdctService Update called");
			var defer = $q.defer();
			console.log("Product ID for Update fn");
			console.log(product);
			var promise = $http.put(url + "/" + product.id , product);
			promise.then(function(result) {
				defer.resolve(result.data);
			},
			function errorCallback(error){
				console.log(error);
			}
			);
			return defer.promise;
		},
		remove : function(id) {
			var defer = $q.defer();
			$http['delete'](url + "/" + id).then(function(result) {
				defer.resolve(result.data);
			},
			function errorCallback(error){
				console.log(error);
			}
			);
			return defer.promise;

		}

	};
	return service;
});

// --------------------------------------------------------------------------

})();
