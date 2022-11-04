import { Sequelize } from "sequelize";
import db from "../database/dbconfig.js";
 
const { DataTypes } = Sequelize;
 
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