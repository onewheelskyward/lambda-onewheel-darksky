// var DarkSky = require('darksky-node');
var superagent = require('superagent');

// console.log("Key: " + process.env.FORECASTIO_KEY);

// var darkSkyClient = DarkSky(process.env.FORECASTIO_KEY);

// exports.handler = function(event, context) {
//     console.log(event);
//     var ds = DarkSky.constructor(process.env.FORECASTIO_KEY);
//     ds.forecast(45.2, -122.2, {}, function(err, forecast) {
//         console.log(forecast);
//     });

    superagent.get('https://api.darksky.net/forecast/5537a6b7a8e2936dc7ced091b999d60a/37.8267,-122.4233')
        .end(function (err, res) {
            console.log(res.body);
        });
    // context.succeed({
    //     statusCode: 200,
    //     headers: {},
    //     body: ""
    // })
// };
