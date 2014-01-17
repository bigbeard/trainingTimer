var countdownTimer = function(elementId, expiredCallback) {
    this.remainingTime = undefined;
    this.lastRemaining = undefined;
    this.seconds = 0;
    this.minutes = 0;
    this.elementId = elementId;
    this.element = undefined;
    this.timer = undefined;
    this.timeout = undefined;
    this.onExpiry = expiredCallback;
}

countdownTimer.prototype.start = function() {
    console.log("start", this.minutes, this.seconds);
    if (!this.remainingTime) {
        this.remainingTime = ((this.minutes * 60) + this.seconds) * 1000;
    };

    // Find the time (in ms since The Epoch) at which
    // this item expires
    this.timeout = new Date().getTime() + this.remainingTime;

    this.element = document.getElementById(this.elementId);
    if (this.element) {
        var t = this;
        t.tick();

        this.timer = setInterval(function() { t.tick(); }, 250);
    }
};

countdownTimer.prototype.stop = function() {
    if (this.timer) {
        clearInterval(this.timer);
        delete this.remainingTime;
        delete this.timer;
    }
};

countdownTimer.prototype.pause = function() {
    if (this.timer)
    {
        this.remainingTime = Math.floor(this.timeout - new Date().getTime());
        clearInterval(this.timer);
        delete this.timer;
    }
};

countdownTimer.prototype.tick =  function() {
    var remaining, str;

    remaining = Math.floor(
        (this.timeout - new Date().getTime()) / 1000
    );

    if (remaining != this.lastRemaining) {
        this.lastRemaining = remaining;
        if (remaining <= 0) {
            str = "0 seconds left";
            this.stop();
            this.element.innerHTML = str;
            if (this.onExpiry) {
                this.onExpiry();                
            }
        } else {
            // More than a minute left?
            if (remaining >= 120) {
                // Yup, output a number
                str = Math.floor(remaining / 60) + " minutes";
            } else if (remaining >= 60) {
                // Just one minute left
                str = "1 minute";
            } else {
                // Down to seconds!
                str = "";
            }
            // Truncate the minutes, just leave seconds (0..59)
            remaining %= 60;
        
            // Any seconds?
            if (remaining > 0) {
                // Yes, if there were minutes add an "and"
                if (str.length > 0) {
                    str += " and ";
                }
          
                // If only one second left, use a word; else, 
                // a number
                if (remaining === 1) {
                    str += "1 second";
                } else {
                    str += Math.floor(remaining) + " seconds";
                }
            }
            str += " left";
            this.element.innerHTML = str;
        }
    }
};
