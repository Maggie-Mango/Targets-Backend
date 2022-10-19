import { Sequelize } from "sequelize";


const db = new Sequelize('case_targets', 'root', 'Square2020!', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;