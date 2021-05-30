const router = require('express').Router()
const db = require('../models') 
const Pujian = db.Pujian
const Op = db.Sequelize.Op

router.get('/', (req,res) => {
    return Pujian.findAll()
        .then(pujian => {
            if (!pujian) {
                return res.status(404).send({
                    message: 'pujian Not Found',
                });
            }
            return res.status(200).send(pujian);
        })
})

router.post('/create', (req,res) => {
    console.log({...req.body});    
    // const {} = req.body
    const pujian = {
      ...req.body
    };
  
    // Save Tutorial in the database
    Pujian.create(pujian)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Pujian."
        });
      });
})

router.post('/update/:id' , (req,res) => {
    const {id} = req.params
    return Pujian.findByPk(id)
        .then(pujian => {
            if(!pujian){
                return res.status(400).json({message:"pujian not found"})
            }
            return pujian
                .update({...req.body})
                .then(() => {res.status(201).json({
                    message:"Success update data",
                    data : pujian
                })})
                .catch(err => {
                    res.status(400).json({
                        message:"error update pujian",
                        err : err
                    })
                })
        }).catch(err => {
            res.status(400).json({
                message:"error update pujian",
                err:err
            })
        })
})

router.get('/:id', (req,res) => {
    const {id} = req.params
    return Pujian.findByPk(id)
        .then(pujian => {
            if (!pujian) {
                return res.status(404).send({
                  message: 'pujian Not Found',
                });
              }
              return res.status(200).send(pujian);
        })
})

router.get('/delete/:id' , (req,res) => {
    const {id} = req.params
    return Pujian.findByPk(id)
        .then(pujian => {
            if (!pujian) {
                return res.status(404).send({
                message: 'pujian Not Found',
                });
            }
            return pujian
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

router.get('/deleteall/important' , (req,res) => {
    return Pujian.destroy({
        where:{},
        truncate : false
    }).then(nums => {
        console.log("Delete data PUJIAN");
        res.status(201).json({message: `Success deleted ${nums} data`})
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
    })
})







module.exports = router