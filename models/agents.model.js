
module.exports = (sequelize, Sequelize) => {
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
  
    return Agent;
  };