require('sugar');

var ONE_SECOND = 1000;

var Waiter = module.exports = function (requestsPerSecond) {
    var requests = [];

    this.wait = function (callback) {
        var now = Date.create();

        while (! requests.isEmpty() && now - requests[0] > ONE_SECOND) {
            requests.shift();
        }

        if (requests.length >= requestsPerSecond) {
            return setTimeout(this.wait.bind(this, callback), ONE_SECOND - (now
                        - requests[0]));
        }

        requests.add(Date.create());
        callback();
    };
};
