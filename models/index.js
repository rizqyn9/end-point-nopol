const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Laporan = require("./model-laporan")(sequelize, Sequelize);
db.Kendaraan = require("./model-kendaraan")(sequelize, Sequelize);
db.Tag = require("./model-tag")(sequelize, Sequelize);
db.Pujian = require("./model-pujian")(sequelize, Sequelize);


// Realtions DB
db.Laporan.hasMany(db.Kendaraan)
db.Kendaraan.belongsTo(db.Laporan)



module.exports = db;