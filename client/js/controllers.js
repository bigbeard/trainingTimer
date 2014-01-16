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
		var counter1 = {"id":"defaultCountdown","minutes":0,"seconds":10};
		var counter2 = {"id":"defaultCountdown2","minutes":1,"seconds":10};
		var timer1 = new countdownTimer(counter1);
		var timer2 = new countdownTimer(counter2);
	
		$scope.startTimer = function() {
			timer1.start();
			timer2.start();
		};

		$scope.stopTimer = function() {
			timer1.stop();
			timer2.stop();
		};

		$scope.pauseTimer = function() {
			timer1.pause();
			timer2.pause();
		};
	}]);

trainingTimerControllers.controller('configureController', [
	function () {

	}]);
