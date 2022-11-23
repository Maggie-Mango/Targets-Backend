import { Sequelize } from "sequelize";
import db from "../database/dbconfig.js";
 
const { DataTypes } = Sequelize;
 
const CaseTargets = db.define('case_assignments', {
    rowId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    agentname: {
        type: DataTypes.STRING
    },
    noncasework: {
        type: DataTypes.JSON
    },
    ooo: {
        type: DataTypes.BOOLEAN
    },
    TR_TOTAL: {
        type: DataTypes.INTEGER
    },
    SSP_TOTAL: {
        type: DataTypes.INTEGER
    },
    ACH: {
        type: DataTypes.INTEGER
    },
    BF: {
        type: DataTypes.INTEGER
    },
    FA: {
        type: DataTypes.INTEGER
    },
    CARDING: {
        type: DataTypes.INTEGER
    },
    RESPONSE: {
        type: DataTypes.INTEGER
    },
    AFTERPAY: {
        type: DataTypes.INTEGER
    },
    VERIFF: {
        type: DataTypes.INTEGER
    },
    UNCAT: {
        type: DataTypes.INTEGER
    },
    GMGB: {
        type: DataTypes.INTEGER
    },
    UNLINKED_REFUNDS: {
        type: DataTypes.INTEGER
    },
    LBU: {
        type: DataTypes.INTEGER
    },
    EF: {
       type: DataTypes.INTEGER
    },
    target_date: {
        type: DataTypes.DATE
    },
    submitted_by: {
        type: DataTypes.STRING
    },
    updated_at: {
        type: DataTypes.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
});
 
export default CaseTargets;
