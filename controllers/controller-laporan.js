const db = require('../models') 
const Laporan = db.Laporan
const Op = db.Sequelize.Op

exports.create =  (req,res) => {
    // console.log(req.body);
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a Tutorial
      const laporan = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
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