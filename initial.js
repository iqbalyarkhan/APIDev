var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({port: 8080});

//The routes

server.route([
    {
        //for read requests
        method: 'GET',
        path: '/',
        handler: function(request, reply){

            //When you go to localhost:8080 in your browser,
            //it'll show the message below
            reply("Hello world from Happi!");


        }

    }

])

server.start(function(err){

    console.log("Happi is listening on localhost: 8080");

})