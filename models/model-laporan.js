const {v4 : uuidv4} = require('uuid')
const Kendaraan = require('./model-kendaraan')

module.exports = (sequelize, Sequelize) => {
    const Laporan = sequelize.define("laporan", {
      laporanUUID : {
        type: Sequelize.UUID,
        // primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4()
      },
      userID : {
        type: Sequelize.STRING
      },
      kendaraanID: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      judul: {
        type: Sequelize.STRING
      },
      lokasi: {
        type: Sequelize.STRING
      },
      tanggal: {
        type: Sequelize.STRING
      },
      imagePath: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.STRING
      },
    });
    // Laporan.hasMany(Kendaraan)
    // Kendaraan.belongsTo(Laporan)
    return Laporan;
  };