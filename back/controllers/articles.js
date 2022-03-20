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
        console.log(articles);
        res.status(200).json({ articles: articles });
    })
    .catch((error) => {
        console.log("Error!");
        return res.status(500).json({error: error});
    });
};

// Ajout d'un article.
exports.articleAdd = (req,res) => {
    // Verification des champs du formulaire.
    /*if (!req.body.email || !req.body.password) 
        return res.status(400).json({ error: 'Empty input!' });*/
    console.log("Add article request.");
    console.log("-----------------------");
    const article = new Articles({
        authorId: 1,
        title: "Test du Titre.",
        article: "Veniam ad deserunt non culpa esse nisi amet dolor proident amet cupidatat laborum...",
        postDate: new Date()
    });
    article.save()
    .then(() => res.status(201).json({ articleId: article.id }))
    .catch(error => res.status(500).json({ error }));
}
