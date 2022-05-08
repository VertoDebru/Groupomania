const db = require("../models");
const Users = db.users;
const Comments = db.comments;
const Jobs = db.jobs;

// Récupération des commentaires.
exports.commentsGet = (req,res) => {
    const articleId = req.query.article;
    Comments.findAll({
        where:{articleId:articleId},
        include: [{model: Users, include: {model: Jobs}}],
        order: [['id', 'DESC']]
    })
    .then((comments) => {
        // Verifie si des commentaires existent dans la BDD.
        if(comments.length <= 0) 
            return res.status(204).json({ error: 'No Comments!' });

        res.status(200).json({ comments: comments });
    })
    .catch((error) => {
        return res.status(500).json({error: error});
    });
};

// Ajout d'un commentaire.
exports.commentAdd = (req,res) => {
    const authorId = req.body.userId;
    const articleId = req.body.articleId;
    const myComment = req.body.comment;
    let myImage = "none";
    // Verification des champs du formulaire.
    if (!req.body.comment && !req.file)
        return res.status(400).json({ error: 'Empty input!' });

    if(req.file)
        myImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    
    Users.findOne({where:{id:authorId}})
    .then((author) => {
        Comments.create({
            comment: myComment,
            postDate: new Date(),
            image: myImage,
            authorId: author.id,
            articleId: articleId
        });
        return res.status(201).json({message: 'Article created!'});
    })
    .catch((error) => {
        return res.status(500).json({error: error});
    });
}

// Modification d'un commentaire.
exports.commentEdit = (req,res) => {
    // Récuperation de l'id de l'article à modifié.
    const commentId = req.params.id;
    let myComment = req.body.comment;
    let myImage = "none";
    if(req.file && req.file.filename)
        myImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    
    Comments.findOne({where:{id:commentId}})
    .then((comment) => {
        // Si il y a une image dans l'article
        if(myImage != 'none' && comment.image != 'none') {
            // Suppresion de l'image.
            const filename = comment.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
            });
        }
        // Vérification si l'auteur de l'article
        // est bien l'utilisateur ou si celui-ci est l'admin (isAdmin)
        comment.update({
            comment: myComment,
            image: myImage
        })
        .then( () => res.status(201).json({message: 'Comment updated!'}))
        .catch( (error) => res.status(500).json({message: error}));
    })
    .catch((error) => res.status(500).json({message: error}));
}

// Suppression d'un commentaire.
exports.commentDel = (req,res) => {
    // Récuperation de l'id du commentaire à supprimé.
    const commentId = req.params.id;

    Comments.findOne({where:{id:commentId}})
    .then((comment) => {
        // Si il y a une image dans le commentaire
        if(comment.image != 'none') {
            // Suppresion de l'image.
            const filename = comment.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
            });
        }
        Comments.destroy({where:{id:commentId}})
        .then(() => res.status(200).json({ message: 'Comment deleted!'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({message: error}));
}
