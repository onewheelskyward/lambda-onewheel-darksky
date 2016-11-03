var Darksky = require('darksky-node');

exports.handler = function(event, context) {
    console.log(event);
    context.succeed({
        statusCode: 200,
        headers: {},
        body: ""
    })
};
