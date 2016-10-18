var NodeGeocoder = require('node-geocoder');

exports.handler = function(event, context) {
    var geocoderOptions = {
        provider: 'google',

        // Optional depending on the providers
        httpAdapter: 'https', // Default
        // apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
        formatter: null         // 'gpx', 'string', ...
    };

    var geocoder = NodeGeocoder(geocoderOptions);
    geocoder.geocode('29 champs elysée paris', function(err, res) {
        console.log(res);
    });

    // const message = JSON.parse(event.Records[0].Sns.Message);
    // context.succeed();
};
