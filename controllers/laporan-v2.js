const router = require('express').Router()
const Laporan = require('../models/laporan')

router.get('/laporan', (req,res) => {
    res.json({
        msg: "Laporan"
    })
})


router.get('/laporan/:id', async (req,res) => {
    try {
        const result = await Laporan.findById(req.params.id)
        
        res.json({
            msg: "Laporan",
            result : result
        })
        
    } catch (error) {
        
    }
})




module.exports = router