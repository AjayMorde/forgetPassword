const Attendance = require('../models/attendace');

async function getAllAttendance(req, res) {
    try {

        const allAttendance = await Attendance.findAll();
        console.log('================================>', Attendance)


        res.status(200).json({
            success: true,
            message: 'Attendance records retrieved successfully',
            attendance: allAttendance
        });
    } catch (error) {

        console.error('Error fetching attendance records:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching attendance records'
        });
    }
}

module.exports = {
    getAllAttendance
};