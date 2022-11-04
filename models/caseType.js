import { Sequelize } from "sequelize";
import db from "../database/dbconfig.js";
 
const { DataTypes } = Sequelize;
 
const caseType = db.define('paf_casetypes', {
  case_type: {
    type: DataTypes.STRING
  }
},{
  // Freeze Table Name
  freezeTableName: true
});
 
export default caseType;