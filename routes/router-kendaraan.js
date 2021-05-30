const router = require('express').Router()
const db = require('../models') 
const Kendaraan = db.Kendaraan
const Op = db.Sequelize.Op

router.get('/', (req,res) => {
    return Kendaraan.findAll()
        .then(kendaraan => {
            if (!kendaraan) {
                return res.status(404).send({
                    message: 'Kendaraan Not Found',
                });
            }
            return res.status(200).send(kendaraan);
        })
})

router.post('/create', (req,res) => {
    console.log({...req.body});    
    // const {} = req.body
    const kendaraan = {
      ...req.body
    };
  
    // Save Tutorial in the database
    Kendaraan.create(kendaraan)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
})

router.get('/:id', (req,res) => {
    const {id} = req.params
    return Kendaraan.findByPk(id)
        .then(kendaraan => {
            if (!kendaraan) {
                return res.status(404).send({
                  message: 'kendaraan Not Found',
                });
              }
              return res.status(200).send(kendaraan);
        })
})

router.get('/delete/:id' , (req,res) => {
    const {id} = req.params
    return Kendaraan.findByPk(id)
        .then(kendaraan => {
            if (!kendaraan) {
                return res.status(404).send({
                message: 'kendaraan Not Found',
                });
            }
            return kendaraan
                .destroy() 
                .then(() => {
                    res.status(204).json({
                        message:"success delete"
                    })
                })
                .catch((err) => res.status(400).send(err))
        })
        .catch((err) =>  res.status(400).send(err))
})


router.post('/update/:id' , (req,res) => {
    const {id} = req.params
    return Kendaraan.findByPk(id)
        .then(kendaraan => {
            if(!kendaraan){
                return res.status(400).json({message:"kendaraan not found"})
            }
            return kendaraan
                .update({...req.body})
                .then(() => {res.status(201).json({
                    message:"Success update data",
                    data : kendaraan
                })})
                .catch(err => {
                    res.status(400).json({
                        message:"error update kendaraan",
                        err : err
                    })
                })
        }).catch(err => {
            res.status(400).json({
                message:"error update kendaraan",
                err:err
            })
        })
})

router.get('/deleteall/important' , (req,res) => {
    return Kendaraan.destroy({
        where:{},
        truncate : false
    }).then(nums => {
        console.log(`Deleting ${nums} kendaraan`);
        res.status(201).json({message: `Success deleted ${nums} data`})
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
    })
})



module.exports = router