var NodeGeocoder = require('node-geocoder');

exports.handler = function(event, context) {
    var geocoderOptions = {
        provider: 'google',
        // Optional depending on the providers
        httpAdapter: 'https', // Default
        // apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
        formatter: null         // 'gpx', 'string', ...
    };

    console.log(event);
    var geocoder = NodeGeocoder(geocoderOptions);
    geocoder.geocode(event.queryStringParameters.text, function(err, res) {
        if (err || res.length == 0) {
            console.log("Error block");
            console.log(err);
            context.fail({
                statusCode: 200,
                headers: {},
                body: "Unknown place " + event.queryStringParameters.text
            });
        } else {
            console.log("Success block");
            console.log(res);
            console.log(res[0].latitude);
            var place = {
                lat: res[0].latitude,
                lng: res[0].longitude,
                place: res[0].formattedAddress};
            console.log("Returning place: " + JSON.stringify(place));
            context.succeed({
                statusCode: 200,
                headers: {},
                body: JSON.stringify(place)
            });
        }
    });
};
