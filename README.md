# Projet 7 - Groupomania
Projet Groupomania - Openclassrooms.
> Enterprise Social Network designed for Openclassrooms web developer training.
## Installation
First time, remember to check and/or configure the .env file :
```
MY_PORT = 8080          // Port used for back server.

// All informations for connect to database.
DB_DIAL = mysql         // Dial for database.
DB_NAME = groupomania   // Database name.
DB_USER = root          // Database username.
DB_PASS = admin         // Database password.
DB_HOST = localhost     // Database host.
DB_PORT = 3306          // Database port.
```

Install all the dependencies with npm.\
In the `front` directory :
```bash
npm install
npm start
```
In the `back` directory :
```bash
npm install
npm run start
```

## Specificities
1. The first registered user will get administrator rights.
2. It is not possible to remove administrator rights from the first user.
3. Only the administrator can permanently delete an account. For others, the account is deactivated and keeps articles, comments and user email address.

## Features
* Signup / Login.
* Post article with/without image.
* Modify article/image.
* Delete article/image.
* Like/Unlike article.
* Post comment in article.
* Modify comment.
* Delete comment.
* Edit profile. (Firstname, Lastname, Email, Password, Avatar)
* Delete account.
* Logout.

## Groupomania Front-End
![](https://img.shields.io/badge/Javascript-build-blue?style=plastic&logo=javascript&logoColor=white)
![](https://img.shields.io/badge/React-build-blue?style=plastic&logo=react&logoColor=white)
### Dependencies
* Axios (used for send request `GET`,`POST`,`PUT`,`DELETE`)
* jwt-decode (used for decode token in front)
### Available Scripts
In the `front` directory, you can run:

`npm start`\
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

`npm run build`\
Builds the app for production to the `build` folder.

## Groupomania Back-End
![](https://img.shields.io/badge/Javascript-build-blue?style=plastic&logo=javascript&logoColor=white)
![](https://img.shields.io/badge/NodeJs-build-blue?style=plastic&logo=node&logoColor=white)
![](https://img.shields.io/badge/Express-build-blue?style=plastic&logo=express&logoColor=white)
### Dependencies
* bcrypt (used to encrypt the user's password)
* dotenv 
* express
* jsonwebtoken (used to secure connections with a token)
* multer (used for upload image/avatar)
* mysql/mysql2 (used for mysql database)
* sequelize (used to manage the database)
### Available Scripts
In the `back` directory, you can run:

`npm start`\
Runs the app server.

`npm run dev`\
Runs the app server in the development mode. (nodemon)