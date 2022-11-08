import { QueryTypes } from require('sequelize');
import query from '../controllers/LeadsView/snowflake.js'

export const data = await sequelize.query(query, { type: QueryTypes.SELECT });
