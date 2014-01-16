var countdownTimer = function(newCounter) {
    this.remainingTime = undefined;
    this.counter = newCounter;
    this.timer = undefined;
    this.timeout = undefined;
}

// A function for starting a counter
countdownTimer.prototype.start = function() {
    console.log("start", this.remainingTime);

    if (!this.remainingTime) {
        this.remainingTime = ((this.counter.minutes * 60) + this.counter.seconds) * 1000;
        console.log("remaing time set");
    };

    console.log("start", this.remainingTime);
    // Find the time (in ms since The Epoch) at which
    // this item expires
    this.timeout = new Date().getTime() + this.remainingTime;
    console.log("start", (new Date(this.timeout).toUTCString()));

    // Get this counter's target element
    this.counter.element = document.getElementById(this.counter.id);
    if (this.counter.element) {
        var t = this;
        // Do the first update      
        t.tick();
        // Schedule the remaining ones to happen *roughly*
        // every quarter second. (Once a second will look
        // rough).
        this.timer = setInterval(function() { t.tick(); }, 250);
    }
};

// Function to stop a counter
countdownTimer.prototype.stop = function() {
    if (this.timer) {
        clearInterval(this.timer);
        delete this.remainingTime;
        delete this.timer;
    }
    //delete counter.element;
};

countdownTimer.prototype.pause = function() {
    if (this.timer)
    {
        this.remainingTime = Math.floor(this.timeout - new Date().getTime());
        console.log("pause", this.remainingTime);
        clearInterval(this.timer);
        delete this.timer;
        console.log("pause", "timer cleared");
    }
};

// The function called on each "tick"
countdownTimer.prototype.tick =  function() {
    var remaining, str;

    console.log("tick", (new Date(this.timeout).toUTCString()));

    // How many seconds left?
    remaining = Math.floor(
        (this.timeout - new Date().getTime()) / 1000
    );
    console.log("tick", remaining);
    
    // Same as last time?
    if (remaining != this.counter.lastRemaining) {
        // No, do an update
        this.counter.lastRemaining = remaining;
        if (remaining <= 0) {
            // Done! Stop the counter.
            str = "done";
            //alert("Stopped " + counter.id);
            this.stop(this.counter);
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
        
            // Finish up
            str += " left";
        }
      
        // Write to the element
        this.counter.element.innerHTML = str;
    }
};
