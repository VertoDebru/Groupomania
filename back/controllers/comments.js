const db = require("../models");
const Comments = db.comments;

// Récupération des commentaires.
exports.commentsGet = (req,res) => {
    let articleId = req.query.article;
    console.log("Comment get request");
    console.log("-----------------------");
    console.log('Checking datas in database...');
    Comments.findAll({where:{articleId:articleId}})
    .then((comments) => {
        // Verifie si des commentaires existent dans la BDD.
        if(comments.length <= 0) {
            console.log('No Comments!');
            console.log("-----------------------");
            return res.status(204).json({ error: 'No Comments!' });
        }
        
        console.log(`Comments found!`);
        console.log("-----------------------");
        console.log(comments);
        res.status(200).json({ comments: comments });
    })
    .catch((error) => {
        console.log("Error!");
        return res.status(500).json({error: error});
    });
};

// Ajout d'un commentaire.
exports.commentAdd = (req,res) => {
    let articleId = req.query.article;
    // Verification des champs du formulaire.
    /*if (!req.body.email || !req.body.password) 
        return res.status(400).json({ error: 'Empty input!' });*/
    console.log("Add comment request.");
    console.log("-----------------------");
    const comment = new Comments({
        articleId: articleId,
        authorId: 1,
        comment: "Voici un commentaire...",
        postDate: new Date()
    });
    comment.save()
    .then(() => res.status(201).json({ commentId: comment.id }))
    .catch(error => res.status(500).json({ error }));
}