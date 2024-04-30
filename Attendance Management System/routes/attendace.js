const express = require('express');
const router = express.Router();
const userController = require('../controllers/attendace');
const userautheticate = require('../middleware/auth');
router.post('/attendance', userautheticate.authenticate, userController.createUserAttendance);

module.exports = router;