var superagent = require('superagent');

console.log("Key: " + process.env.FORECASTIO_KEY);

// var darkSkyClient = DarkSky(process.env.FORECASTIO_KEY);

exports.handler = function(event, context) {
    console.log(event.queryStringParameters);
    superagent.get('https://api.darksky.net/forecast/' + process.env.FORECASTIO_KEY + '/' + event.queryStringParameters.lat + ',' + event.queryStringParameters.lng)
        .end(function (err, forecast) {
            console.log(forecast);
        });


    // superagent.get('https://api.darksky.net/forecast/5537a6b7a8e2936dc7ced091b999d60a/37.8267,-122.4233')
    //     .end(function (err, res) {
    //         console.log(res.body);
    //     });
    // context.succeed({
    //     statusCode: 200,
    //     headers: {},
    //     body: ""
    // })
};
