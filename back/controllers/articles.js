const fs = require('fs');
const db = require("../models");
const Users = db.users;
const Jobs = db.jobs;
const Articles = db.articles;
const Comments = db.comments;
const Likes = db.likes;

// Récupération des articles.
exports.articlesGet = (req,res) => {
    Articles.findAll({
        include: [{model: Users, include: {model: Jobs}},  {model: Comments}, {model: Likes}],
        order: [['id', 'DESC']]
    })
    .then((articles) => {
        // Verifie si des articles existent dans la BDD.
        if(articles.length <= 0)
            return res.status(204).json({ error: 'No Articles!' });
        
        return res.status(200).json({ articles: articles });
    })
    .catch((error) => {
        return res.status(500).json({error: error});
    });
};

// Ajout d'un article.
exports.articleAdd = (req,res) => {
    let authorId = req.body.userId;
    let myArticle = req.body.article;
    let myImage = "none";
    // Verification des champs du formulaire.
    if (!req.body.article && !req.file)
        return res.status(400).json({ error: 'Empty input!' });

    if(req.file && req.file.filename)
        myImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    
    Users.findOne({where:{id:authorId}})
    .then((author) => {
        Articles.create({
            article: myArticle,
            image: myImage,
            postDate: new Date(),
            authorId: author.id
        });
        return res.status(201).json({message: 'Article created!'});
    })
    .catch((error) => {
        console.log("Error!");
        console.log(error);
        return res.status(500).json({error: error});
    });
}

// Modification d'un article.
exports.articleEdit = (req,res) => {
    // Récuperation de l'id de l'article à modifié.
    let articleId = req.params.id;
    let myArticle = req.body.message;
    let myImage = "none";
    
    Articles.findOne({where:{id:articleId}})
    .then((article) => {
        // Si une image est envoyé par l'utilisateur.
        if(req.file && req.file.filename) {
            myImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            // Si il y a une image dans l'article
            if(myImage != 'none' && article.image != 'none') {
                // Suppresion de l'image.
                const filename = article.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                });
            }
        }
        else myImage = article.image;
        // Vérification si l'auteur de l'article
        // est bien l'utilisateur ou si celui-ci est l'admin (isAdmin)
        article.update({
            article: myArticle,
            image: myImage
        })
        .then((result) => {
            console.log(result);
            res.status(201).json({message: 'Article updated!'});
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({message: error});
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({message: error});
    });
}

// Suppression d'un article.
exports.articleDel = (req,res) => {
    // Récuperation de l'id de l'article à supprimé.
    let articleId = req.params.id;
    isImage = false;
    if(req.params.image == 1) isImage = true;

    Articles.findOne({where:{id:articleId}})
    .then((article) => {
        // Si l'utilisateur veut effacer son image.
        if(isImage) {
            // Si il y a une image dans l'article
            if(article.image != 'none') {
                // Suppresion de l'image.
                const filename = article.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                });
            }
            // Update profile
            Articles.update({ image: 'none' }, { where: {id:articleId} })
            .then(() => {
                return res.status(200).json({message: 'Image deleted!'});
            })
            .catch(() => {
                return res.status(304);
            });
        }
        // Si il veut suprrimer l'article entier.
        else {
            // Si il y a une image dans l'article
            if(article.image != 'none') {
                // Suppresion de l'image.
                const filename = article.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                });
            }
            Articles.destroy({where:{id:articleId}})
            .then(() => res.status(200).json({ message: 'Article deleted!'}))
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({message: error});
    });
}
