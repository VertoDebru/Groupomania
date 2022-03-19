const db = require("../models");
const Articles = db.articles;

// Récupération des articles.
exports.articlesGet = (req,res) => {
    console.log("Article get request");
    console.log("-----------------------");
    console.log('Checking datas in database...');
    Articles.findAll()
    .then((articles) => {
        // Verifie si des articles existent dans la BDD.
        if(articles.length <= 0) {
            console.log('No Articles!');
            console.log("-----------------------");
            return res.status(204).json({ error: 'No Articles!' });
        }
        
        console.log(`Articles found!`);
        console.log("-----------------------");
        console.log(res.data);
        //res.status(200).json({ articlesId: res });
    })
    .catch((error) => {
        console.log("Error!");
        return res.status(500).json({error: error});
    });
};