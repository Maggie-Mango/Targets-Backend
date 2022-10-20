import { Sequelize } from "sequelize";
import db from "../database/config.js";
 
const { DataTypes } = Sequelize;
 
const tag = db.define('noncasework_tags', {
  // Define attributes
    tag: {
        type: DataTypes.STRING
    }
 },{
  // Freeze Table Name
  freezeTableName: true
});
 
export default tag;