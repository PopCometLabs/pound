var Waiter = require('./lib/waiter');

var async   = require('async'),
    xrange  = require('xrange'),
    request = require('request');

var util    = require('util');


var numRequests       = 100,
    simultaneous      = 10,
    requestsPerSecond = 50;

var options = {
    url: process.argv[2]
};

var waiter = new Waiter(requestsPerSecond);

var start = Date.create();

async.eachLimit(xrange(numRequests), simultaneous, function (each, callback) {
    waiter.wait(function () {
        request(options, function (err, resp, body) {
            callback(err, resp && resp.statusCode);
        });
    });
}, function (err) {
    var duration = Date.create().millisecondsSince(start);
    var expected = (1000 * numRequests / requestsPerSecond) - 1000;
    console.log(util.format('Finished in %sms.', duration));
    console.log(util.format('Ideal %sms', expected));

    if (err) {
        console.log('Received error', err);
    }
});
