const router = require('express').Router()
const db = require('../models') 
const Laporan = db.Laporan
const Op = db.Sequelize.Op

const ctrlLaporan = require("../controllers/controller-laporan")

router.get('/', (req,res) => {
    return Laporan.findAll()
    .then(laporan => {
        if (!laporan) {
            return res.status(404).send({
              message: 'Laporan Not Found',
            });
          }
          return res.status(200).send(laporan);
    })
})


router.post('/create' , ctrlLaporan.create)
router.get('/:id', (req,res) => {
    const {id} = req.params
    return Laporan.findByPk(id)
        .then(laporan => {
            if (!laporan) {
                return res.status(404).send({
                  message: 'Laporan Not Found',
                });
              }
              return res.status(200).send(laporan);
        })
})



router.post('/update/:id' , (req,res) => {
    const {id} = req.params
    return Laporan.findByPk(id)
        .then(laporan => {
            if(!laporan){
                return res.status(400).json({message:"laporan not found"})
            }
            return laporan
                .update({...req.body})
                .then(() => {res.status(201).json({
                    message:"Success update data",
                    data : laporan
                })})
                .catch(err => {
                    res.status(400).json({
                        message:"error update laporan",
                        err : err
                    })
                })
        }).catch(err => {
            res.status(400).json({
                message:"error update laporan",
                err:err
            })
        })
})


router.get('/delete/:id' , (req,res) => {
    const {id} = req.params
    return Laporan.findByPk(id)
        .then(laporan => {
            if (!laporan) {
                return res.status(404).send({
                message: 'Laporan Not Found',
                });
            }
            return laporan
                .destroy() 
                .then(() => {res.status(204).json({
                    message:"success delete",
                })})
                .catch((err) => res.status(400).send(err))
        })
        .catch((err) =>  res.status(400).send(err))
})

router.get('/deleteall/important' , (req,res) => {
    return Laporan.destroy({
        where:{},
        truncate : false
    }).then(nums => {
        console.log(`Deleting ${nums} laporan`);
        res.status(201).json({message: `Success deleted ${nums} data`})
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
    })
})


module.exports = router