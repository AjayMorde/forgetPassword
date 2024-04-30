const Sequelize = require('sequelize');
const sequelize = new Sequelize('attendancemanagementsystem', 'root', '1234', {
    dialect: 'mysql',
    host: 'localhost'
})
module.exports = sequelize;