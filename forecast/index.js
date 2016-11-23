var superagent = require('superagent');

console.log("Key: " + process.env.FORECASTIO_KEY);

// var darkSkyClient = DarkSky(process.env.FORECASTIO_KEY);

exports.handler = function(event, context) {
    console.log(event.queryStringParameters);

    // This doesn't actually work, I'm not sure what's up with lambda proxy integration errors yet.
    if (event.queryStringParameters == null || event.queryStringParameters.loc == null) {
        context.fail({
            statusCode: 400,
            headers: {},
            body: 'loc parameter is required.'
        });
    }

    // Call the geocoder with the loc
    superagent.get(process.env.GEOCODER_URI + event.queryStringParameters.loc)
        .end(function (err, res) {
            console.log("Geocoder result: " + JSON.stringify(res.body));
            // Get the forecast
            superagent.get('https://api.darksky.net/forecast/' + process.env.FORECASTIO_KEY + '/' + res.body.lat + ',' + res.body.lng)
                .end(function (err, forecast) {
                    console.log(forecast.text);
                    context.succeed({
                        statusCode: 200,
                        headers: {},
                        body: forecast.text
                    });
                });
        });
};
