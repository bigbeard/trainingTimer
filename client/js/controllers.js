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
		var planIntervals = undefined;

		var plan = {name: "Plan 1",
					intervals: [
						{ name: "interval 1", seconds: 5, cadence: 90, effort: 8},
						{ name: "interval 2", intervals: [
							{name: "sub interval 1", seconds: 5, cadence: 20, effort: 4},
							{name: "sub interval 2", seconds: 3, cadence: 50, effort: 9}
						]},
						{ name: "interval 3", seconds: 3, cadence: 80, effort: 3}
					]
				};

		var getIntervalListFromIntervals = function (intervals, parentInterval) {
			var planIntervals = new intervalList();

			for(var i=0; i < intervals.length; i++) {
				var planInterval = intervals[i];
				var subIntervals = undefined;
				
				var newInterval = new interval(planInterval.name, planInterval.seconds, 
										planInterval.cadence, planInterval.effort);

				if (planInterval.intervals) {
					var subIntervals = getIntervalListFromIntervals(planInterval.intervals, newInterval);
				}

				newInterval.parentInterval = parentInterval;
				newInterval.intervals = subIntervals;

				planIntervals.add(newInterval);
			};

			return planIntervals;
		};

		$scope.startTimer = function() {
			planIntervals = getIntervalListFromIntervals(plan.intervals);
			console.log(planIntervals);
			$scope.sessionTitle = plan.name;
			planIntervals.start(onExpiry, onIntervalStarted);
		};

		$scope.stopTimer = function() {
			planIntervals.stop();
		};

		$scope.pauseTimer = function() {
			planIntervals.pause();
		};

		$scope.unpauseTimer = function() {
			planIntervals.unpause();
		};

		var onExpiry = function () {
			alert("finished!");
		};

		var onIntervalStarted = function(interval) {
			console.log("controller onIntervalStarted", interval);

			if (interval.parentInterval) {
				$scope.parentIntervalName = displayIntervalDetails(interval.parentInterval);
			}
			else
			{
				$scope.parentIntervalName = "";
			}
			$scope.intervalName = displayIntervalDetails(interval);
			setTimeout(function(){ $scope.$apply(); });
		};

		var displayIntervalDetails = function (interval) {
			var intervalDisplay = interval.name;

			if (interval.seconds) {
				intervalDisplay = intervalDisplay.concat(" : length ", interval.seconds, " seconds");
			}

			if (interval.cadence) {
				intervalDisplay = intervalDisplay.concat(" : cadence ", interval.cadence);
			}

			if (interval.effort) {
				intervalDisplay = intervalDisplay.concat(" : effort ", interval.effort);
			}

			return intervalDisplay;
		}
	}]);

trainingTimerControllers.controller('configureController', [
	function () {

	}]);
