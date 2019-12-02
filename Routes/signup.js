module.exports = ( signUp, knex ) => {

    
    // At this endpoint we are singup in the app and add that data in the databasae.
    signUp.post ("/" , ( req , res ) => {
        if ( req.body.email_id === undefined || req.body.password === undefined || req.body.name === undefined ) {
            res.send ( "Please enter your full details" )
        }else {
            knex( "signup" )
            .insert( req.body ).then (( data ) => {
                    res.send ( "Signup succesfully into the app...!" );
                    console.log ( data )
                }).catch (( err ) => {
                    res.send ( "EmailId is already exists....!" );
                    // console.log ( err ) 
                });                        
        };
        
    });
}