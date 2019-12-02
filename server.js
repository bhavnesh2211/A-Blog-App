const express = require ( "express" );
const bodyParser = require ( "body-parser" );
const jwt = require ( "jsonwebtoken" );

const app = express()

app.use ( bodyParser.json() );
app.use ( bodyParser.urlencoded ({ extended : true }));


// Create connection.
const knex = require ( "knex" ) ({
    client : "mysql" , 
    connection : {
        host : "localhost",
        user : "root",
        password : "bhavnes",
        database : "blog_app"
    }
})

//  Here we are cheking that the table has already created or not it not then we are creating it.

knex.schema.createTable( "signup" , table => {
    table.increments ( "id" ).primary(),
    table.string ( "email_id" ).unique(),
    table.string ( "name" ),
    table.string ( "password" )
}).then (() => {
    console.log ( "Table created..." );
}).catch (() => { 
    console.log ( "Table already created..." );
});

knex.schema.createTable ( "posts" , table => {
    table.increments ( "id" ).primary(),
    table.integer ("userid")
    table.string ( "Title"),
    table.string ( "Description" )
    table.dateTime ( "Created_on" )
}).then (() => {
    console.log ( "Table created...." );
}).catch (() => {
    console.log ( "Table already created...." )
})

knex.schema.createTable ( "LikeDisliked" , table => {
    table.integer ( "PostId" ),
    table.integer ( "userId"),
    table.integer ( "Like" ),
    table.integer ( "Dislike" )
}).then (() => {
    console.log ( "Table created...." )
}).catch (() => {
    console.log ( "Table already crated...." )
})

// At this point I created routes
var signUp = express.Router();
app.use ( "/signup" , signUp );
require ( "./Routes/signup" ) ( signUp, knex );

var login = express.Router();
app.use ( "/login" , login );
require ( "./Routes/login" ) ( login, knex, jwt );

var posts = express.Router();
app.use ( "/post" , posts );
require ( "./Routes/posts" ) ( posts, knex, jwt );

var likeDisliked = express.Router();
app.use ("/likeordisliked" , likeDisliked);
require ( "./Routes/likedisliked") ( likeDisliked, knex, jwt );

// PORT
app.listen ( 5000 , () => {
    console.log ("Listen ", 5000)
})