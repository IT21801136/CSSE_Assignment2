const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addMedicalRecord, getMedicalRecordsForPatient } = require('../controllers/medicalRecordController');
const router = express.Router();

router.post('/add', protect, addMedicalRecord);
router.get('/patient', protect, getMedicalRecordsForPatient);

module.exports = router;
