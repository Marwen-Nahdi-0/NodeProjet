const reservationModel = require('../Models/reservation')
const salle = require('../Models/salle')
const nodemailer = require('nodemailer'); 



// Create and Save a new reservation
exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
      
const transporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: "kacemfazeni@gmail.com", 
        pass: "drmp omam gvzq pnwb" 
    } 
}); 
  
   
transporter.sendMail({
    to: "nahdimarwen0@gmail.com",
    subject: 'Verify Account',
    html: `Click <a href ="" >here</a> to confirm your email ibtehal 3ay. `
  })

    

    
     
    const reservationCheck = await reservationModel.find({Date: req.body.date, salle : req.params.salleId});
    if(reservationCheck.length > 0){
        res.render('SelectDate' , { salleId: req.params.salleId ,msg:"There is already a reservation on " + req.body.date});
    }else{
        const reservation = new reservationModel({
            Date: req.body.date,
            client :req.params.clientId,
            salle : req.params.salleId
           // Date: Date.now().toString()
        });
    
    await reservation.save().then(data => {
        console.log(data)
        res.send({
            message:"reservation created successfully!!",
            reservation:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating reservation"
        });
    });}
};
// Retrieve all reservations from the database.
exports.findAll = async (req, res) => {
    try {
        const reservations = await reservationModel.find().populate('salle')
        res.render('ListReservation',{reservations:reservations});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Retrieve all reservations from the database by clientId.
exports.findAllbyUser = async (req, res) => {
    try {
        const reservations = await reservationModel.find(reservation => reservation.client === req.params.id);
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
         res.redirect("/reservation/");
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};