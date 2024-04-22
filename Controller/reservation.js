const reservationModel = require('../Models/reservation')
// Create and Save a new reservation
exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const reservation = new reservationModel({
        Date: req.body.Date,
        StartTime: req.body.StartTime,
        EndTime :req.body.EndTime,
        client :req.clientId,
        salle : req.salleId
       // Date: Date.now().toString()
    });
    
    await reservation.save().then(data => {
        res.send({
            message:"reservation created successfully!!",
            reservation:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating reservation"
        });
    });
};
// Retrieve all reservations from the database.
exports.findAll = async (req, res) => {
    try {
        const reservations = await reservationModel.find();
        res.status(200).json(reservations);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Retrieve all reservations from the database by clientId.
exports.findAllbyUser = async (req, res) => {
    try {
        const reservations = await reservationModel.find(reservation => reservation.client === req.clientId);
        res.status(200).json(reservations);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single reservation 
exports.findOne = async (req, res) => {
    try {
        const reservation = await reservationModel.findById(req.params.id);
        res.status(200).json(reservation);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};




// Update a reservation by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await reservationModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `reservation not found.`
            });
        }else{
            res.send({ message: "reservation updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a reservation with the specified id in the request
exports.destroy = async (req, res) => {
    await reservationModel.findByIdAndDelete(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `reservation not found.`
          });
        } else {
          res.send({
            message: "reservation deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};