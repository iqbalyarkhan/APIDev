var Hapi = require('hapi');

//Creating a to do list
var list=[


    {

        "task" : "buy grocery",
        "Priority" : "High"

    },
    {

        "task" : "Pick laundry",
        "Priority" : "Medium"

    },
    {

        "task" : "Watch soccer",
        "Priority" : "Low"

    }



]

//Creating the server object and connecting to the
//server
var server = new Hapi.Server();
server.connection({port:8080});


//setting up routes
server.route([

    {
        method: 'GET',
        path: '/',
        handler: function(request, reply){

            reply("Hello world from to do list");

        }
    },
    {
        method: 'GET',

        //the endpoint for getting the list
        //In the browser, based on what the handler
        //is set up to do, the appropriate response
        //would be displayed.
        path: '/api/v1/list',

        //Return response through the handler
        handler: function(request, reply){
            //returning the list
            //Hapi expects a json object to be returned
            //so you can reference the list by name 
            reply(list);

        }

    }

]);

server.start(function(err){

    console.log("Listening on localhost:8080");

})