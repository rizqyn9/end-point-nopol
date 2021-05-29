module.exports = (sequelize, Sequelize) => {
    const Laporan = sequelize.define("laporan", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return Laporan;
  };