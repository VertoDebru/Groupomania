const fs = require('fs');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const { Op } = require("sequelize");
const Users = db.users;
const Jobs = db.jobs;

// Récupération des infos d'un utilisateur.
exports.userGet = (req,res) => {
    let authorId = parseInt(req.query.id);
    Users.findOne({
        where: {id:authorId, isDelete:false},
        include: {model: Jobs}
    })
    .then((user) => {
        // Verifie si l'utilisateur existe dans la BDD.
        if(!user)
            return res.status(404).json({ error: 'User not found!' });
        
        res.status(200).json({ user });
    })
    .catch((error) => {
        return res.status(500).json({error: error});
    });
};

// Récupération des infos d'un utilisateur selon son nom/prenom.
exports.userSearch = (req,res) => {
    let search = req.query.search;
    Users.findAll({
        where: {
            firstname: {
                [Op.like]: '%' + search + '%'
            }
        },
        include: {model: Jobs}
    }).then((users) => {
        if(!users.length) return res.status(204).json({ message: 'Empty!' });
        res.status(200).json({ users });
    })
    .catch((error) => {
        return res.status(500).json({error: error});
    });
};

// Connexion d'un utilisateur.
exports.userLogin = (req,res) => {
    // Verification des champs du formulaire.
    if (!req.body.email || !req.body.password) 
        return res.status(400).json({ error: 'Empty input!' });

    Users.findOne({ where: {email:req.body.email, isDelete:false }})
    .then((user) => {
        // Verifie si l'email existe dans la BDD.
        if(!user)
            return res.status(404).json({ error: 'User not found!' });

        // Verifie le mot de passe.
        bCrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) return res.status(401).json({ error: 'Mot de passe incorrect!' });

            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch((error) => {
        return res.status(500).json({error: error});
    });
};

// Inscription d'un utilisateur.
exports.userSign = (req,res) => {
    // Verification des champs du formulaire.
    if (!req.body.email || !req.body.password) 
        return res.status(400).json({ error: 'Empty input!' });
    
    // Hashage du mot de passe
    bCrypt.hash(req.body.password, 10)
    .then( hash => {
        console.log('New registery.');
        let objectJobs = { jobs: 'Membre'};
        let objectUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            jobId: 1,
            isAdmin: 0
        };
        Users.findAll().then((user) => {
            if(!user || user.length == 0) {
                // Création du job par défaut.
                Jobs.create({ ...objectJobs }).then((jobs) => {
                    console.log(jobs);
                });
                // Droits d'aministrations accordés.
                objectUser = {
                    ...objectUser,
                    isAdmin: 1
                };
            }
            // Création du nouveau membre.
            Users.create({ ...objectUser }).then((user) => {
                res.status(201).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                )})
            });
        })
    })
    .catch(error => res.status(500).json({ error }));
}

// Modification d'un utilisateur.
exports.userEdit = (req,res) => {
    let forDelete = false;
    if(req.params.delete == 1) forDelete = true;
    let userId = req.params.id;
    // Creation de l'objet
    let objectUser = {...req.body};
    Users.findOne({where: {id:userId, isDelete:false}})
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
        // Si l'utilisateur supprime son compte.
        if(forDelete) {
            if(user.avatar && user.avatar != 'none') {
                // On supprime le fichier de l'avatar.
                const filename = user.avatar.split('/avatars/')[1];
                fs.unlink(`avatars/${filename}`, () => {
                    console.log('--- Avatar deleted!');
                });
            }
            // Mise a jour de l'objet.
            objectUser = {
                ...objectUser,
                firstname: 'Compte',
                lastname: 'Inactif',
                avatar: 'none',
                isDelete: `${forDelete}`
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
