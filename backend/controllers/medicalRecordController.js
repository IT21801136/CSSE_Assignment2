// controllers/medicalRecordController.js
const MedicalRecord = require('../models/MedicalRecord');
const User = require('../models/User');
const admin = require('firebase-admin');
const bucket = admin.storage().bucket();

// Add Medical Record (Staff/Admin)
exports.addMedicalRecord = async (req, res) => {
  try {
    const { userId, record } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }

    // Upload PDF to Firebase
    const file = req.file;
    const firebaseFile = bucket.file(file.originalname);
    await firebaseFile.save(file.buffer, {
      metadata: { contentType: file.mimetype },
    });

    // Get the public URL of the uploaded PDF
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${file.originalname}`;

    // Create a new medical record for the user
    const newRecord = await MedicalRecord.create({
      patient: user._id,
      record,
      pdfUrl: fileUrl,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Medical Records for Patient (User)
exports.getMedicalRecordsForPatient = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patient: req.user._id });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Medical Record (Staff/Admin)
exports.updateMedicalRecord = async (req, res) => {
  try {
    const { recordId, newRecord } = req.body;

    const updatedRecord = await MedicalRecord.findByIdAndUpdate(
      recordId,
      { record: newRecord },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Medical Record (Staff/Admin)
exports.deleteMedicalRecord = async (req, res) => {
  try {
    const { recordId } = req.body;

    const deletedRecord = await MedicalRecord.findByIdAndDelete(recordId);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
