'use strict';

///////////////// User Start///////////////////////
demoApp.controller('UserCtrl', function ($scope, $http, User) {
	$scope.users = User.query();
	
	$scope.selectUser = function(row) {
		$scope.selectedRow = row;
	};
	
	$scope.deleteUser = function(user, index) {
		console.log('delete user._id->' + user._id);
		user.$delete({id:user._id});
		$scope.users.splice(index, 1);
	};
});

demoApp.controller('AddUserCtrl', function($scope, $location, User) {
	
	$scope.saveUser = function() {
		User.save($scope.user, function() {
			$location.path('/users');
		});
	};
});

demoApp.controller('EditUserCtrl', function($scope, $location, $routeParams, User ) {
	
	$scope.user = User.get({
		id : $routeParams.id
	});
	
	$scope.saveUser = function() {
		$scope.user.$update();
		$location.path('/users')
	}
});

///////////////// Other Start///////////////////////

demoApp.controller("NavCtrl", function($scope, $location, AuthenticationService) {
	$scope.logout = function() {
		AuthenticationService.logout().success(function() {
			$location.path('/home');
		});
	};
});

demoApp.controller('LoginCtrl', function ($scope, $location, $cookieStore, AuthenticationService) {
	$scope.credentials = { username: "", password: ""};
	
	$scope.login = function() {
		AuthenticationService.login($scope.credentials).success(function() {
			var nextView = $cookieStore.get('nextView');
			$cookieStore.remove('nextView');
			if (nextView != null) {
				console.log('login good, get nextView=' + nextView);
				$location.path(nextView);
			} else {
				$location.path('/settings');
			}
		});
//		$http({url:'/api/users', 
//			method:'POST',
//			data: $scope.credentials	
//		}).success(function(data, status, headers, config) {
//		    $scope.data = data;
//		}).error(function(data, status, headers, config) {
//		    $scope.status = status;
//		});
//		
//		if($scope.credentials.username === "dustin") {
//			$location.path('/home');
//		}
		//console.log($scope.credentials.username);
	};
	
});
