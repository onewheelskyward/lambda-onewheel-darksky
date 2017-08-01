var superagent = require('superagent');

exports.handler = function(event, context) {
    console.log(event.queryStringParameters);

    // Call the geocoder with the loc
    console.log("Calling " + process.env.FORECAST_URI + event.queryStringParameters.loc);
    superagent.get(process.env.FORECAST_URI + event.queryStringParameters.loc)
        .end(function (err, forecast) {
            console.log("Forecast result: " + JSON.stringify(forecast.body.hourly));
            var hourly_uv = forecast.body.hourly.data.map(function(hour) {return hour.uvIndex;});

            context.succeed({
                statusCode: 200,
                headers: {},
                body: JSON.stringify(hourly_uv)
            });
        });
};
