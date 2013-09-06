'use strict';

var demoApp = angular.module('appModule', [ 'ngResource','ngCookies' ]);

demoApp.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/home', {
		templateUrl : 'views/public/home.html'
	}).when('/settings', {
		templateUrl : 'views/settings.html'
	}).when('/login', {
		controller : 'LoginCtrl',
		templateUrl : 'views/login.html'
	}).when('/about', {
		templateUrl : 'views/public/about.html'
	}).when('/users', {
		controller : 'UserCtrl',
		templateUrl : 'views/user/list.html'
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