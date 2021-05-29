const monggose = require('mongoose')

const Laporan = new monggose.Schema({
    UserID : {type : String},
    KendaraanID : {type: String},
    Type : {type: String},
    Judul : {type: String},
    Lokasi : {type: String},
    Tanggal : {type: String},
    ImagePath : {type: String},
    Deskripsi : {type: String}
})

module.exports = monggose.model('Laporan', Laporan)