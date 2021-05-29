const router = require('express').Router()
const Kendaraan = require('../models/kendaraan-v2')

router.get('/kendaraan', async(req,res,) => {
    const result = await  Kendaraan.find()
    res.json({
        msg: "Kendaraan",
        result : result
    })
})

// Create kendaraan
router.post('/kendaraan', async (req,res) => {
    console.log(req.body);
    const {
        UserID,
        Nopol,
        Type} = req.body 
    const newKendaraan = new Kendaraan({
        UserID,
        Nopol,
        Type
    })
    await newKendaraan.save((err, data) => {
        if(err) {
            console.log(err);
            res.json({
                msg : "error"
            })
        } else {
            res.json({
                UserID,
                Nopol,
                Type
            })
            console.log("Success");
        }
    })
})

// Get a Kendaraan
router.get('/kendaraan/:id', async(req,res,) => {
    const result = await  Kendaraan.findById(req.params.id)
    console.log(result);
    res.json({
        msg: "Kendaraan",
        result : result
    })
})

// Update a Kendaraan
router.post('/kendaraan/update/:id', async(req,res,) => {
    const updateKendaraan = await Kendaraan.findByIdAndUpdate(req.params.id, {
        ...req.body
    }).then(data => {
        if(!data) {
            console.log("Gagal Update");
            res.json({
                msg : "Error update"
            })
        } else {
            console.log("Success Update data");
            res.json({
                msg : "Success Update data",
                res : data
            })
        }
    })
})

// Delete a Kendaraan 
router.get('/kendaraan/delete/:id', async (req,res) => {
    try {
        await Kendaraan.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data){
                console.log("Gagal hapus");
                res.json({
                    msg : "Gagal Hapus"
                })
            } else {
                console.log("Deleted data");
                res.json({
                    msg:"Success Delete",
                    result : data
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg : "Gagal Hapus"
        })
    }
})


module.exports = router