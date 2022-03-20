const db = require("../models");
const Comments = db.comments;

// Récupération des commentaires.
exports.commentsGet = (req,res) => {
    console.log("Comment get request");
    console.log("-----------------------");
    console.log('Checking datas in database...');
    Comments.findAll()
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
