const SalleModel = require('../Models/salle')
// Create and Save a new Salle
exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const salle = new SalleModel({
        Capacite: req.body.Capacite,
        Equipements: req.body.Equipements,
       // Date: Date.now().toString()
    });
    
    await salle.save().then(data => {
        res.send({
            message:"salle created successfully!!",
            salle:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating salle"
        });
    });
};
// Retrieve all salles from the database.
exports.findAll = async (req, res) => {
    try {
        const salles = await SalleModel.find();
        res.status(200).json(salles);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single salle with an id
exports.findOne = async (req, res) => {
    try {
        const salle = await salleModel.findById(req.params.id);
        res.status(200).json(salle);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
// Update a salle by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await SalleModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `salle not found.`
            });
        }else{
            res.send({ message: "salle updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a salle with the specified id in the request
exports.destroy = async (req, res) => {
    await SalleModel.findByIdAndDelete(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `salle not found.`
          });
        } else {
          res.send({
            message: "salle deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};