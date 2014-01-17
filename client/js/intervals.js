Array.prototype.next = function() {
    return this[++this.currentIndex];
};
Array.prototype.prev = function() {
    return this[--this.currentIndex];
};
Array.prototype.current = function() {
    return this[this.currentIndex];
};
Array.prototype.reset = function() {
	this.currentIndex = 0;
};
Array.prototype.currentIndex = 0;



// INTERVAL LIST

var intervalList = function() {
	this.intervals = [];
	this.onListExpired = undefined;
	this.onIntervalStarted = undefined;
	this.currentInterval = undefined;

	this.onIntervalExpired = function() {
		var nextInterval = this.intervals.next();
		this.startInterval(nextInterval);
	};

	this.startInterval = function(interval) {
		this.currentInterval = interval;
		if (interval) {
			if (this.onIntervalStarted) {
				this.onIntervalStarted(interval);
			}
			interval.start(this.onIntervalExpired.bind(this), this.onIntervalStarted);
		} else
		{
			if (this.onListExpired) {
				this.onListExpired();
			}
		}
	};
};

intervalList.prototype.add = function(interval) {
	this.intervals.push(interval);
};

intervalList.prototype.start = function(onListExpired, onIntervalStarted) {
	this.onListExpired = onListExpired;
	this.onIntervalStarted = onIntervalStarted;

	var firstInterval = this.intervals.current();
	this.startInterval(firstInterval);
};

intervalList.prototype.stop = function() {
	console.log("stop");	
};

intervalList.prototype.pause = function() {
	console.log("pause");
	this.currentInterval.pause();
};

intervalList.prototype.unpause = function() {
	console.log("unpause");
	this.currentInterval.unpause();	
};

// INTERVAL

var interval = function(name, seconds, cadence, effort) {
	this.name = name;
	this.seconds = seconds;
	this.cadence = cadence;
	this.effort = effort;
	this.intervals = undefined;
	this.parentInterval = undefined;
	this.timer = undefined;
};

interval.prototype.start = function(onIntervalExpired, onIntervalStarted) {
	//console.log("interval start", this.name, onIntervalStarted);
	if (this.intervals) {
		this.intervals.start(onIntervalExpired, onIntervalStarted);
	} else {
		var t = this;
		this.timer = new countdownTimer("defaultCountdown", onIntervalExpired)
		this.timer.seconds = this.seconds;
		this.timer.start();
	}
};

interval.prototype.pause = function() {
	this.timer.pause();
};

interval.prototype.unpause = function() {
	this.timer.start();
};
