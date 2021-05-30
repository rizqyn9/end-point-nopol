const {v4 : uuidv4} = require('uuid')

module.exports = (sequelize, Sequelize) => {
    const Kendaraan = sequelize.define("kendaraan", {
      kendaraanUUID : {
        type: Sequelize.UUID,
        // primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4()
      },
      userID : {
        type: Sequelize.STRING
      },
      nopol: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
    });
    return Kendaraan;
  };