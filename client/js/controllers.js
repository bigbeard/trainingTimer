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

		$scope.plan = {name: "Plan 1",
				intervals: [
					{ name: "interval 1", time: "+5", cadence: 90, effort: 8},
					{ name: "interval 2", time: "+3", candence: 100, effort: 4},
					{ name: "interval 3", time: "+2", candence: 100, effort: 4}]
				};

		$scope.sessionTitle = $scope.plan.name;
		//$scope.intervalCount = 0;

		$scope.startTimer = function() {
			$scope.intervalCount = 0;
			var time = $scope.plan.intervals[$scope.intervalCount].time; 

//			$('#defaultCountdown').countdown('destroy');
			$('#defaultCountdown').countdown({until: time, onExpiry: expired, format: 'MS'}); 
		};

		$scope.resetTimer = function() {
			$('#defaultCountdown').countdown('destroy');
		};

		var expired = function () {
			$scope.intervalCount += 1;
			console.log($scope.intervalCount);
			console.log($scope.plan);
			
			if ($scope.intervalCount > $scope.plan.intervals.count-1) {
				alert('Finished!');
			} else if ($scope.intervalCount = $scope.plan.intervals.count-1) {
 				var time = $scope.plan.intervals[$scope.intervalCount].time; 
				$('#defaultCountdown').countdown('destroy');
				$('#defaultCountdown').countdown({until: time, onExpiry: expired, format: 'MS'}); 
			} else {
 				var time = $scope.plan.intervals[$scope.intervalCount].time; 
				$('#defaultCountdown').countdown('destroy');
				$('#defaultCountdown').countdown({until: time, onExpiry: expired2, format: 'MS'}); 				
			}
		};

		var expired2 = function () {
			alert("all done!");
		};
	}]);

trainingTimerControllers.controller('configureController', [
	function () {

	}]);
