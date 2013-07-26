var Waiter = require('../lib/waiter');

var async = require('async'),
    xrange = require('xrange');

var assert = require('assert');


describe('waiter', function () {
    var waiter = new Waiter(10),
        minDelay = 20;

    it('first call has no delay', function (done) {
        var now = Date.create();

        waiter.wait(function () {
            assert(Date.create() - now < 5);
            done();
        });
    });

    it('calls 2-10 have no delay', function (done) {
        var now = Date.create();

        async.each(xrange(2, 11), function (each, callback) {
            waiter.wait(function () {
                assert(Date.create() - now < minDelay, each);
                callback();
            });
        }, done);
    });

    it('call 11 has delay', function (done) {
        var now = Date.create();

        waiter.wait(function () {
            assert(Date.create() - now >= 900);
            done();
        });
    });

    it('call 12 has small delay', function (done) {
        var now = Date.create();

        waiter.wait(function () {
            assert(Date.create() - now < minDelay);
            done();
        });
    });

    it('many at once', function (done) {
        this.timeout(5000);
        var waiter = new Waiter(2);
        var start = Date.create();

        async.each(xrange(10), function (each, callback) {
            waiter.wait(callback);
        }, function (err) {
            console.log(Date.create() - start);
            assert(Date.create() - start >= 4000);
            done();
        });
    });
});
