module.exports = ( posts, knex, jwt ) => {
    
    // At this endpoint user posting a post on to the database.
    posts.post ("/" , ( req, res ) => {
        if (req.body.title === undefined || req.body.description === undefined) {
            res.send ( "Please fill the title or description" )
        }else {
            let cookie = req.headers.cookie;
            let token = cookie.slice(6);
            let user_id = jwt.verify ( token , "bhavnesh" ).id;
            let dateTime = new Date();
            knex( "posts" ).insert ({
                "title" : req.body.title,
                "description" : req.body.description,
                "userid" : user_id,
                "Created_on" : dateTime
            })
            .then (( data ) => {
                console.log ( "Data inserted succesfully....");
                res.send ( "Your blog is posted succesfully....!");
            }).catch (( err ) => {
                console.log ( err );
                res.send ( "There are some errors..." );
            });
        };
    });

    // At this endpoint user can get all post of that user.
    posts.get ( "/postsofuser" , ( req, res ) => {
        let cookie = req.headers.cookie;
        let token = cookie.slice(6);
        let user_id = jwt.verify ( token , "bhavnesh" ).id;
        knex.from ( "posts" ).orderBy ( "id" , "desc" ).where ( "userid" , user_id )
        .then (( data ) => {
            res.send ( data );
        }).catch (( err ) => {
            res.send ( "There are some errors" );
        });
    });

    // At this endpoint user will get all post posted by users.
    posts.get ( "/getallposts" , ( req, res ) => {
        knex.from ( "posts" ).orderBy ( "id" , "desc" )
        .then (( data ) => {
            res.send ( data );
        }).catch (( err ) => {
            res.send ( "There are some errors" );
            console.log ( err );
        });
    });
}