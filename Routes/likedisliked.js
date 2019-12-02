module.exports = ( likeDisliked, knex, jwt ) => {

    // Here user can get all the post of users.
    likeDisliked.get ( "/" ,( req, res ) => {
        knex.from ( "posts" ).orderBy ( "id" , "desc" )
        .then (( data ) => {
            res.send ( data );
        }).catch (( err ) => {
            res.send ( "There are some errors" );
            console.log ( err );
        });
    });

    // Here user can like or disliked a post.
    likeDisliked.post ( "/:id" , (req, res ) => {
        let post_id = req.params.id;
        let cookie = req.headers.cookie;
        let token = cookie.slice(6);
        let user_id = jwt.verify ( token , "bhavnesh" ).id;
        console.log (user_id)
        if (req.body.reaction !== "like" && req.body.reaction !== "dislike") {
            res.send ( "Please enter your valid reaction...." );
        }else {
            if (req.body.reaction === "like") {
                knex.from ( "LikeDisliked" ).select ( "postId" , "userId")
                .where ( "PostId" , post_id )
                .then (( data ) => {
                    if (data.length === 0) {
                        knex ( "LikeDisliked" ).insert (
                            { "postId" : post_id ,
                            "userId" : user_id ,
                            "Like" : 1,
                            "Dislike" : 0
                        }
                        ).then (( data ) => {
                            res.send ( "You successfully liked this post..." );
                            console.log ( data );
                        }).catch (( err )  => {
                            res.send ( "There is some errors " );
                            console.log ( err );
                        });
                    }else {
                        knex.from ( "LikeDisliked" ).select ( "postId" , "userId" , "Like" , "Dislike")
                        .where ( "PostId" , post_id ).then (( data ) => {
                            let like = data[0].Like;
                            let dislike = data[0].Dislike;
                            if (data[0].postId == post_id && data[0].userId == user_id) {
                                if (req.body.reaction == "Dislike") {
                                    knex ( "LikeDisliked" ). where ( "PsostId" , post_id)
                                    .update ( {"Dislike": dislike + 1, "Like" : like - 1})
                                    .then (( data ) => {
                                        res.send ( "Your reaction was changed...." );
                                    })
                                }else {
                                    res.send ( "You already like this post..." );
                                }
                            }else {
                                if (user_id != data[0].userId) {
                                     
                                    knex ( "LikeDisliked" ).insert (
                                        { "postId" : post_id ,
                                        "userId" : user_id ,
                                        "Like" : like + 1,
                                        "Dislike" : dislike
                                    }
                                    ).then (( data ) => {
                                        res.send ( "You successfully liked this post..." );
                                        console.log ( data );
                                    }).catch (( err )  => {
                                        res.send ( "There is some errors " );
                                        console.log ( err );
                                    });

                                }else {
                                    knex ( "LikeDisliked" ).where ( "PostId" , post_id )
                                    .update ( "Like" , like + 1)
                                    .then (( data ) => {
                                        res.send ( "You successfully liked this post...." );
                                        console.log ( data );
                                    }).err (( err ) => {
                                        res.send ( "There is some errors" );
                                        console.log ( err );
                                    });
                                }
                            };
                        });  
                    };
                });
            }else {
                knex.from ( "LikeDisliked" ).select ( "PostId" , "userId")
                .where ( "PostId" , post_id )
                .then (( data ) => {
                    if (data.length === 0) {
                        knex ( "LikeDisliked" ).insert ([
                            { "PostId" : post_id ,
                            "userId" : user_id ,
                            "Dislike" : 1 ,
                            "Like" : 0
                        }
                        ]).then (( data ) => {
                            res.send ( "You successfully disliked the post..." );
                            console.log ( data );
                        }).catch (( err )  => {
                            res.send ( "There is some errors " );
                            console.log ( err );
                        });
                    }else {
                        knex.from ( "LikeDisliked" ).select ( "PostId" , "userId" , "Dislike" , "like" )
                        .where ( "PostId" , post_id ).then (( data ) => {
                            let dislike = data[0].Dislike;
                            let like = data[0].like;
                            if ( data[0].postId == post_id && data[0].userId == user_id ) {
                                if ( req.body.reaction == "Like" ) {
                                    knex ( "LikeDisliked" ). where ( "PostId" , post_id)
                                    .update ( {"Dislike": dislike + 1, "Like" : like - 1})
                                    .then (( data ) => {
                                        res.send ( "Your reaction was changed...." );
                                    })
                                }else {
                                    res.send ( "You already dislike this post..." );
                                }
                                
                            }else {
                                if ( user_id !== data[0].userId ) {
                                    knex ( "LikeDisliked" ).insert ([
                                        { "PostId" : post_id ,
                                        "userId" : user_id ,
                                        "Dislike" : dislike + 1,
                                        "Like" : like
                                    }
                                    ]).then (( data ) => {
                                        res.send ( "You successfully disliked the post..." );
                                        console.log ( data );
                                    }).catch (( err )  => {
                                        res.send ( "There is some errors " );
                                        console.log ( err );
                                    });
                                }else {

                                    knex ( "LikeDisliked" ).where ( "PostId" , post_id )
                                    .update ( "DisLike" , dislike + 1)
                                    .then (( data ) => {
                                        res.send ( "You successfully disliked this post...." );
                                        console.log ( data );
                                    }).err (( err ) => {
                                        res.send ( "There is some errors" );
                                        console.log ( err );
                                    });
                                };
                            };
                        });    
                    };
                });
            };
        };    
    });
};