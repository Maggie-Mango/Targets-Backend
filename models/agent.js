import { Sequelize } from "sequelize";
// import connection 
import db from "../database/config.js";
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const agent = db.define('agent_names', {
  // Define attributes
  name: {
    type: DataTypes.STRING
  },
  ldap: {
    type: DataTypes.STRING
  }
},{
  // Freeze Table Name
  freezeTableName: true
});
 
export default agent;