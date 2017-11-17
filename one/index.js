var spawn = require('child_process').spawn;

var invokeRubyApp = "./hello-1.0.0-linux-x86_64/lib/ruby/bin/ruby";

exports.handler = function(event, context) {
    var output;
    console.log("Starting process: " + invokeRubyApp);
    console.log( process.env.PATH );
    var child = spawn(invokeRubyApp, ['hello.rb'])
        .on('error', function( err ){
            console.log(err)
        });//, [JSON.stringify(event, null, 2), JSON.stringify(context, null, 2)]);

    child.stdout.on('data', function (data) {
        console.log("stdout: " + data);
        output = data;
    });
    child.stderr.on('data', function (data) { console.log("stderr: " + data); });

    child.on('close', function (code) {
        if(code === 0) {
            context.succeed({
                statusCode: 200,
                headers: {},
                body: output.toString()
            });
        } else {
            context.fail("Process \"" + invokeRubyApp + "\" exited with code: " + code);
        }
    });
};

