var restify = require('restify');

var server = restify.createServer();

server.get('/', function (req, res) {
    res.send(200);
});

server.listen(8000, function () {
});
