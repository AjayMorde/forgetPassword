const Sequelize = require('sequelize');
const sequelize = require('../connection/database');

const attendace = sequelize.define('attendance', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userType: {
        type: Sequelize.ENUM('Student', 'Teacher'),
        allowNull: false
    },
    userclass: {
        type: Sequelize.STRING,
        allowNull: function() {
            // Allow null only for userType 'Teacher'
            return this.userType === 'Teacher';
        }
    },
    attendanceStatus: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = attendace;