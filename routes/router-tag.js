const router = require('express').Router()
const db = require('../models') 
const Tag = db.Tag
const Op = db.Sequelize.Op


router.get('/', (req,res) => {
    return Tag.findAll()
        .then(tag => {
            if (!tag) {
                return res.status(404).send({
                    message: 'tag Not Found',
                });
            }
            if (tag.length < 1) {
                return res.status(404).send({
                    message: 'Tag empty',
                });
            }

            return res.status(200).send(tag);
        })
})


router.get('/:id', (req,res) => {
    const {id} = req.params
    return Tag.findByPk(id)
        .then(tag => {
            if (!tag) {
                return res.status(404).send({
                  message: 'tag Not Found',
                });
              }
              return res.status(200).send(tag);
        })
        .catch(err => {
            return res.status(400).json({
                message : `${id} not found`,
                err : err
            })
        })
})


router.post('/create', (req,res) => {
    console.log({...req.body});    
    // const {} = req.body
    const tag = {
      ...req.body
    };
  
    // Save Tutorial in the database
    Tag.create(tag)
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


router.post('/update/:id' , (req,res) => {
    const {id} = req.params
    return Tag.findByPk(id)
        .then(tag => {
            if(!tag){
                return res.status(400).json({message:"tag not found"})
            }
            return tag
                .update({...req.body})
                .then(() => {res.status(201).json({
                    message:"Success update data",
                    data : tag
                })})
                .catch(err => {
                    res.status(400).json({
                        message:"error update tag",
                        err : err
                    })
                })
        }).catch(err => {
            res.status(400).json({
                message:"error update tag",
                err:err
            })
        })
})


router.get('/delete/:id' , (req,res) => {
    const {id} = req.params
    return Tag.findByPk(id)
        .then(tag => {
            if (!tag) {
                return res.status(404).send({
                message: 'tag Not Found',
                });
            }
            return tag
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
    return Tag.destroy({
        where:{},
        truncate : false
    }).then(nums => {
        console.log(`Deleting ${nums} tag`);
        res.status(201).json({message: `Success deleted ${nums} data`})
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
    })
})



module.exports = router