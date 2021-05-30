const db = require('../models') 
const Laporan = db.Laporan
const Op = db.Sequelize.Op

exports.create =  (req,res) => {
    console.log({...req.body});    
    // const {} = req.body
    // Create a Tutorial
    const laporan = {
      ...req.body
    };
  
    // Save Tutorial in the database
    Laporan.create(laporan)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
}