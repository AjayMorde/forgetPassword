const Users = require('../models/attendace');

async function createUserAttendance(req, res) {
    try {
        const { name, userType, userClass, attendanceStatus, date } = req.body;
        const newUser = await Users.create({
            name: name,
            userType: userType,
            userclass: userClass,
            attendanceStatus: attendanceStatus,
            date: date,
            UserId: req.user.id
        });
        res.status(200).json({
            success: true,
            message: 'User record created successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(404).json({
            success: false,
            message: 'Error creating user record'
        });
    }
}

module.exports = {
    createUserAttendance
};