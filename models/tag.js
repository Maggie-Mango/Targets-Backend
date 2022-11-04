import { Sequelize } from "sequelize";
import db from "../database/dbconfig.js";
 
const { DataTypes } = Sequelize;
 
const Tag = db.define('noncasework_tags', {
  // Define attributes
    tag: {
        type: DataTypes.STRING
    }
 },{
  // Freeze Table Name
  freezeTableName: true
});
 
export default Tag;