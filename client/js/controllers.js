'use strict';

var trainingTimerControllers = angular.module('trainingTimerControllers', []);

trainingTimerControllers.controller('aboutController', [
	function () {

	}]);

trainingTimerControllers.controller('indexController', ['$scope',
	function ($scope) {
		$scope.timerMenuStyle = "";
		$scope.configureMenuStyle = "";

		$scope.timerMenuClicked = function() {
			$scope.timerMenuStyle = "active";
			$scope.configureMenuStyle = "";
		};

		$scope.configureMenuClicked = function() {
			$scope.timerMenuStyle = "";
			$scope.configureMenuStyle = "active";
		};

		$scope.aboutMenuClicked = function() {
			$scope.timerMenuStyle = "";
			$scope.configureMenuStyle = "";
		};
	}]);

trainingTimerControllers.controller('timerController', ['$scope',
	function ($scope) {
		$scope.startTimer = function() {
			$('#defaultCountdown').countdown({until: '+3m +30', format: 'MS'}); 
		};
	}]);

trainingTimerControllers.controller('configureController', [
	function () {

	}]);
