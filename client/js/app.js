var trainingTimerApp = angular.module('trainingTimerApp', [
	'ngRoute',
	'trainingTimerControllers'
]);

trainingTimerApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    	when('/timer', { templateUrl: 'partials/timer.html', controller: 'timerController'}).
    	when('/about', { templateUrl: 'partials/about.html', controller: 'aboutController'}).
    	when('/configure', { templateUrl: 'partials/configure.html', controller: 'configureController'}).
    	otherwise({redirectTo: '/about'});
}]);