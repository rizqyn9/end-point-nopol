const {v4 : uuidv4} = require('uuid')

module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define("tag", {
      tagUUID : {
        type: Sequelize.UUID,
        // primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4()
      },
      kendaraanID : {
        type: Sequelize.STRING
      },
      tagName: {
        type: Sequelize.STRING
      }
    });
    return Tag;
  };
  