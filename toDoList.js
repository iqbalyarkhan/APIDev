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
        //Without index, this would display all items
        path: '/api/v1/list',

        //Return response through the handler
        handler: function(request, reply){
            //returning the list
            //Hapi expects a json object to be returned
            //so you can reference the list by name 
            reply(list);

        }

    },

    {
        method: 'POST',
        path: '/api/v1/list',

        //We're taking the information sent by the client
        //and creating a new task ie updating the list
        //The header of the POST request would contain
        //this information
        handler: function(request, reply){
            
            //Creating a new task where the task is 
            //retrieved from the request
            //and a priority that we'll pull from priority
            //This new information will be stored in the new 
            //object called newTask
            newTask = {"task": request.payload.task, 
                    "priority": request.payload.owner};

            //Adding the newly craeted task object to the list
            list.push(newTask);

            //The reply must also deliver a success message along with
            //the newly updated list:
            //Code 201 is the created code 
            reply(list).code(201);

        }

    },

    {
        //Updating an already existing task
        method: 'PUT',
        path: '/api/v1/list/{index}',

        handler: function(request, reply){

            //Gathering information for updating the task
            newTask = {"task": request.payload.task, 
                    "priority": request.payload.owner};
            
            //Replacing old task info with new info    
            list[request.params.index-1] = newTask;

            reply(list[request.params.index - 1]);

        }

    },

    {
        method: 'DELETE',

        //To return the specific item
        path: '/api/v1/list/{index}',

        //Return response through the handler
        handler: function(request, reply){
                
            //Deletes the requested item
            delete list[request.params.index-1];

            //No need to reply with the list, reply 
            //with 204 meaning no content
            reply().code(204);

        }
    },

    {
        method: 'GET',

        //To return the specific item
        path: '/api/v1/list/{index}',

        //Return response through the handler
        handler: function(request, reply){
                
            //To retrieve value from the list by index
            reply(list[request.params.index - 1]);

        }
    }

]);

server.start(function(err){

    console.log("Listening on localhost:8080");

})