const db = require("../models");
const Jobs = db.jobs;

// Récupération des emplois.
exports.jobsGet = (req,res) => {
    Jobs.findAll().then((jobs) => {
        // Verifie si des emplois existent.
        if(!jobs)
            return res.status(204).json({ error: 'No Jobs Found!' });

        res.status(200).json({ jobs });
    }).catch((error) => {
        return res.status(500).json({error: error});
    });
};

// Ajout d'un emploi.
exports.jobAdd = (req,res) => {
    console.log(req.body);
    // Verification des champs du formulaire.
    if (!req.body.newJob) 
        return res.status(400).json({ error: 'Empty input!' });

    // Création du nouvel emploi.
    Jobs.create({ jobs: req.body.newJob }).then((job) => {
        res.status(201).json({ job: job});
    });
}

// Modification d'un emploi.
exports.jobEdit = (req,res) => {
    const jobId = req.params.id;
    const valueJob = req.body.job;
    if(!valueJob) return res.status(400).json({error: 'no value!'});
    Jobs.findOne({where: {id:jobId}}).then( job => {
        // Modification de l'emploi
        Jobs.update({jobs: valueJob}, {where: {id:job.id}})
        .then(() => res.status(200).json({message: 'Job updated!'}))
        .catch(() => res.status(304).json({message: 'Job not updated!'}));
    })
    .catch(() => console.error('Impossible de trouver cet emploi!'));
}

// Suppression d'un emploi.
exports.jobDel = (req,res) => {
    const jobId = req.params.id;
    Jobs.findOne({where: {id:jobId}}).then( job => {
            // Suppression de l'emploi
            Jobs.destroy({ where: {id:job.id} })
            .then(() => res.status(200).json({message: 'Job deleted!'}))
            .catch(() => res.status(304).json({message: 'Job not deleted!'}));
    })
    .catch(() => console.error('Impossible de trouver cet emploi!'));
}
