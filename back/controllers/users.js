const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require("../models");
const Users = db.users;

// Récupération des infos d'un utilisateur.
exports.userGet = (req,res) => {
    let authorId = parseInt(req.query.id);
    console.log("New user get request where id is: "+authorId);
    console.log("-----------------------");
    console.log('Checking datas in database...');
    Users.findOne({where:{id:authorId}})
    .then((user) => {
        // Verifie si l'utilisateur existe dans la BDD.
        if(!user) {
            console.log('User not found where id '+authorId);
            return res.status(404).json({ error: 'User not found!' });
        }
        
        console.log(`User '${user.firstname} ${user.lastname}' found!`);
        res.status(200).json({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            jobId: user.jobId,
            avatar: user.avatar,
            isAdmin: user.isAdmin
        });
    })
    .catch((error) => {
        console.log("Error!");
        console.log(error);
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
        console.log(`User '${user.firstname} ${user.lastname}' found!`);
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
    console.log("First    : " + req.body.firstname);
    console.log("Last     : " + req.body.lastname);
    console.log("Email    : " + req.body.email);
    console.log("Password : " + req.body.password);
    console.log("-----------------------");
    
    // Hashage du mot de passe
    bCrypt.hash(req.body.password, 10)
    .then( hash => {
        console.log('New registery.');
        Users.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash
        }).then((user) => res.status(201).json({
            userId: user.id,
            token: jwt.sign(
                { userId: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )})
        );
    })
    .catch(error => res.status(500).json({ error }));
}

// Modification d'un utilisateur.
exports.userEdit = (req,res) => {
    let userId = req.body.userId;
    // Creation de l'objet
    let objectUser = {...req.body};
    Users.findOne({where: {id:userId}})
    .then( user => {
        // Si l'utilisateur veut modifier son avatar existant.
        if(req.file && user.avatar) {
            // On supprime le fichier de l'avatar.
            const filename = user.avatar.split('/avatars/')[1];
            fs.unlink(`avatars/${filename}`, () => {
                console.log('--- Avatar deleted!');
            });
            // Mise a jour de l'objet.
            objectUser = {
                ...objectUser,
                avatar: `${req.protocol}://${req.get('host')}/avatars/${req.file.filename}`
            };
        }
        // Si l'utilisateur modifie son mot de passe.
        if(objectUser.password) {
            // Hashage du mot de passe
            const newPass = bCrypt.hashSync(objectUser.password, 10);
            // Mise a jour de l'objet.
            objectUser = {
                ...objectUser,
                password: `${newPass}`
            };
        }
        // Update profile
        Users.update({ ...objectUser }, { where: {id:user.id} })
        .then(() => res.status(200).json({ message: 'Profil modifié !'}))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch(() => { console.error('Impossible de trouver cet utilisateur!'); });
}

// Suppression d'un utilisateur.
exports.userDel = (req,res) => {
    let isAvatar = false;
    if(req.params.avatar == 1) isAvatar = true;

    let userId = req.params.id;
    Users.findOne({where: {id:userId}})
    .then( user => {
        // Si l'utilisateur veut effacer son avatar.
        if(isAvatar && userId) {
            // On supprime le fichier de l'avatar.
            const filename = user.avatar.split('/avatars/')[1];
            fs.unlink(`avatars/${filename}`, () => {
                console.log('--- Avatar deleted!');
            });
            // Update profile
            Users.update({ avatar: 'none' }, { where: {id:userId} })
            .then(() => {
                return res.status(200).json({message: 'Avatar deleted!'});
            })
            .catch(() => {
                return res.status(304);
            });
        }
        // Si l'utilisateur veut effacer son compte.
        else {
            // Si l'utilisateur a un avatar
            if(user.avatar != 'none') {
                // On supprime le fichier de l'avatar.
                const filename = user.avatar.split('/avatars/')[1];
                fs.unlink(`avatars/${filename}`, () => {
                    console.log('--- Avatar deleted!');
                });
            }
            // On recherche les articles en lien avec l'utilisateur.
            // On supprime les images des articles
            // On supprime tous les articles et commentaires de cet utilisateur.
            // ^^ En supprimant l'utilisateur il efface aussi les articles liés.

            // Suppression du compte
            Users.destroy({ where: {id:userId} })
            .then(() => {
                return res.status(200).json({message: 'Account deleted!'});
            })
            .catch(() => {
                return res.status(304).json({message: 'Account not deleted!'});
            });
        }
    })
    .catch(() => { console.error('Impossible de trouver cet utilisateur!'); });
}
