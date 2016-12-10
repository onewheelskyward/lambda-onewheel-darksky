var superagent = require('superagent');

exports.handler = function(event, context) {
    console.log(event.queryStringParameters);

    // Call the geocoder with the loc
    console.log("Calling " + process.env.FORECAST_URI + event.queryStringParameters.loc);
    superagent.get(process.env.FORECAST_URI + event.queryStringParameters.loc)
        .end(function (err, forecast) {
            console.log("Forecast result: " + JSON.stringify(forecast.body.hourly));
            var daily = forecast.body.daily.data.map(function(day) {return day.temperatureMax;});

            context.succeed({
                statusCode: 200,
                headers: {},
                body: JSON.stringify(daily)
            });
        });
};
