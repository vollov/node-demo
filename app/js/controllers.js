'use strict';

demoApp.controller('UserCtrl', function ($scope, User) {
	$scope.users = User.query();
});

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
