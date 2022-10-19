
const config = require("../database/config.js");
const  { Sequelize, DataTypes } = require("sequelize");


const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;


/*
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });


 const Agent = sequelize.define("agent_names", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ldap: {
      type: DataTypes.STRING,
      allowNull: false
    }
 });

 sequelize.sync().then(() => {
    
    Agent.findAll({
        attributes: ['name']
      }).then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });

 }).catch((error) => {
    console.error('unable to create table : ', error);
 });
 */