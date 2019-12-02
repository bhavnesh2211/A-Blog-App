module.exports = ( login, knex, jwt ) => {

    // Here are login into the app.
    login.post ( "/", (req, res) => {

        if ( req.body.email_id === undefined || req.body.password === undefined ) {
            res.send ( "Please enter your full details" )
        }else {
            knex.from ( "signup" ).select ( "id" ).where (req.body)
            .then (( data ) => {
                let id = data[0].id;
                var token = jwt.sign ({id}, "bhavnesh", { expiresIn : "24h"})
                res.cookie("Token",token)
                res.send ( "You sucessfully login into the app...." )

            }).catch (( err ) => {
                res.send ( "There are some errors in app...." )
                console.log ( err )
            })
        }
    })
}