const router = require('express').Router()

router.get('/', (req,res) => {
    res.json({
        msg : "success"
    })
})

router.post('/create' , require('../controllers/controller-laporan').create)

module.exports = router