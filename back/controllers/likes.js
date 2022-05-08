const db = require("../models");
const { Op } = require("sequelize");
const Likes = db.likes;

// Ajoute/Supprime un like.
exports.like = (req,res) => {
    const userId = req.body.userId;
    const articleId = req.body.articleId;

    // Verification si l'utilisateur a deja like l'article.
    Likes.findAll({
        where:{
            [Op.and]: [
                { userId: userId },
                { articleId: articleId }
            ]
        }
    }).then( (likes) => {
        // Verifie si l'utilisateur n'a pas liker on ajout son like.
        if(!likes || likes.length == 0) {
            Likes.create({...req.body}).then(like => {
                return res.status(201).json(like);
            }).catch(err => {
                return res.status(500).json({error: err});
            })
        }
        // Si l'utilisateur à déjà liker on retire son like
        else {
            Likes.destroy({
                where:{
                    [Op.and]: [
                        { userId: userId },
                        { articleId: articleId }
                    ]
                }
            });
            return res.status(200).json('like destroyed!');
        }
    })
    .catch( err => res.status(500).json(err));
}
