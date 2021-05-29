const mongoose = require('mongoose')

const Kendaraan = new mongoose.Schema({
    UserID : {type: String},
    Nopol : {type: String},
    Type : {type: String},
})

module.exports = mongoose.model('Kendaraan', Kendaraan)