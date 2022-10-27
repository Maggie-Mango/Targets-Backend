import { Sequelize } from "sequelize";
import db from "../database/config.js";
 
const { DataTypes } = Sequelize;
 
const caseAssignment = db.define('CaseAssignment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    updated_at: {
        type: DataTypes.DATE
    },
    updated_by: {
        type: DataTypes.STRING
    },
    table_data: {
        type: DataTypes.JSON
    }
}, {
  tableName: 'case_assignment',
  timestamps: false
},
);
 
export default caseAssignment;
