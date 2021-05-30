const {v4 : uuidv4} = require('uuid')

module.exports = (sequelize, Sequelize) => {
    const Pujian = sequelize.define("pujian", {
      pujianUUID : {
        type: Sequelize.UUID,
        // primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4()
      },
      kendaraanID : {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
    });
    return Pujian;
  };