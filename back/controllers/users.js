const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const Users = db.users;

// Récupération des infos d'un utilisateur.
exports.userGet = (req,res) => {
    let userId = req.query.id;
    console.log("New user get request where id is: "+userId);
    console.log("-----------------------");
    console.log('Checking datas in database...');
    Users.findOne({where:{id:userId}})
    .then((user) => {
        // Verifie si l'utilisateur existe dans la BDD.
        if(!user) {
            console.log('User not found where id '+userId);
            return res.status(404).json({ error: 'User not found!' });
        }
        
        console.log(`User '${user.name}' found!`);
        res.status(200).json({
            userId: user.id,
            name: user.name,
            jobId: user.jobId,
            avatar: user.avatar,
            isAdmin: user.isAdmin
        });
    })
    .catch((error) => {
        console.log("Error!");
        return res.status(500).json({error: error});
    });
};

// Connexion d'un utilisateur.
exports.userLogin = (req,res) => {
    // Verification des champs du formulaire.
    if (!req.body.email || !req.body.password) 
        return res.status(400).json({ error: 'Empty input!' });
    console.log("New login request.");
    console.log("Email    : " + req.body.email);
    console.log("Password : " + req.body.password);
    console.log("-----------------------");
    console.log('Checking datas in database...');
    Users.findOne({where:{email:req.body.email}})
    .then((user) => {
        // Verifie si l'email existe dans la BDD.
        if(!user) {
            console.log(`Email '${req.body.email}' not found!`);
            return res.status(404).json({ error: 'User not found!' });
        }
        console.log(`User '${user.name}' found!`);
        // Verifie le mot de passe.
        bCrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) return res.status(401).json({ error: 'Mot de passe incorrect!' });

            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
        //return res.status(200).json({data: user});
    })
    .catch((error) => {
        console.log("Error!");
        return res.status(500).json({error: error});
    });
};

// Inscription d'un utilisateur.
exports.userSign = (req,res) => {
    // Verification des champs du formulaire.
    if (!req.body.email || !req.body.password) 
        return res.status(400).json({ error: 'Empty input!' });
    console.log("New sign request.");
    console.log("Email    : " + req.body.email);
    console.log("Password : " + req.body.password);
    console.log("-----------------------");
    
    // Hashage du mot de passe
    bCrypt.hash(req.body.password, 10)
    .then( hash => {
        console.log('New registery.');
        const user = new Users({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ 
            userId: user.id,
            token: jwt.sign(
                { userId: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
        }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}
