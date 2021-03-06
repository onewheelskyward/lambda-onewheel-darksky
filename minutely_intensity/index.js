var superagent = require('superagent');

exports.handler = function(event, context) {
    console.log(event.queryStringParameters);

    // Call the geocoder with the loc
    superagent.get(process.env.MINUTELY_URI + event.queryStringParameters.loc)
        .end(function (err, forecast) {
            console.log("Forecast result: " + JSON.stringify(forecast.body));
            // Get the forecast
            var intensities = forecast.body.data.map(function(minute) {return minute.precipIntensity;});
            context.succeed({
                statusCode: 200,
                headers: {},
                body: JSON.stringify(intensities)
            });
        });
};
