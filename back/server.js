require('dotenv').config();
const http = require('http');
const app = require('./app');
// Connexion avec la BDD SQL
const db = require("./models");

const MY_PORT = process.env.PORT || process.env.MY_PORT;

app.set('port', MY_PORT);
const server = http.createServer(app);

// Démarrage du serveur.
server.on('error', (err) => {
    console.log(`Server Error | ${err}`);
});

// Serveur en ligne.
server.listen(MY_PORT, () => {
    console.log(`Server running on port : ${MY_PORT}`);
    console.log('Checking database connection...');
    db.sequelize.authenticate()
    .then( () => {
        db.sequelize.sync({force: false});
        console.log('Database connection OK!');
        console.log('-----------------------');
    })
    .catch( (error) => {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        console.log('-----------------------');
        process.exit(1);
    });
});
