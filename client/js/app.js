'use strict';

var demoApp = angular.module('appModule', [ 'ngResource','ngCookies' ]);

demoApp.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/home', {
		templateUrl : 'partials/index'
	}).when('/settings', {
		templateUrl : 'partials/settings'
	}).when('/about', {
		templateUrl : 'partials/about'
	}).when('/users', {
		controller : 'UserCtrl',
		templateUrl : 'partials/users'
	}).when('/addUser', {
		controller : 'AddUserCtrl',
		templateUrl : 'partials/userDetail'
	}).when('/editUser/:id', {
		controller : 'EditUserCtrl',
		templateUrl : 'partials/userDetail'
	}).otherwise({
		redirectTo : '/home'
	});
});

demoApp.config(function($httpProvider) {

	var logsOutUserOn401 = function($location, $q, SessionService) {
		var success = function(response) {
			return response;
		};

		var error = function(response) {
			if (response.status === 401) {
				SessionService.unset('authenticated');
				$location.path('/login');
				return $q.reject(response);
			} else {
				return $q.reject(response);
			}
		};

		return function(promise) {
			return promise.then(success, error);
		};
	};

	$httpProvider.responseInterceptors.push(logsOutUserOn401);
});

//.when('/login', {
//	controller : 'LoginCtrl',
//	templateUrl : 'views/login.html'
//})