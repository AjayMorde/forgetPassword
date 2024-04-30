const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/getattedance');


router.get('/alluser', attendanceController.getAllAttendance);

module.exports = router;