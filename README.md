# A-Blog-App
In this project, I have made a backend of a blog-app website using Express framework of NodeJS. I have also used JWT-authentication token to verify the if the user is valid or not.
# Task Details:

Lets make a simple blog app with only the home page functional. a user should be able to:
~~~
-Register using email & password ( use JWT for authentication )
-Login
-Create a post
-See all posts from other users on home page ( sorted from most recent )
-Like/Dislike a post
-see how many likes/dislikes a post
~~~

In this project I have used **MySQL**, **JSONWEBTOKEN**, **Express**, **body-parser**,**nodemon**,**knex**.

## Installation
***NodeJs*** and ***NPM***

~~~
$ sudo apt-get update 

$ sudo apt-get install curl 

$ sudo apt install build-essential apt-transport-https lsb-release ca-certificates curl 

$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

$ sudo apt install nodejs
~~~

***MYSQL***

~~~
$ sudo apt-get update
$ sudo apt-get install mysql-server
$ sudo mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
~~~


### Package Installation

```
$ npm install 'pakage_name' (ex. express)
```

