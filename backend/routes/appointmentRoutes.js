const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createAppointment, getAppointmentsForPatient, deleteAppointment } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/create', protect, createAppointment);
router.get('/patient', protect, getAppointmentsForPatient);
router.delete('/:id', protect, deleteAppointment);

module.exports = router;
